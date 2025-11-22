import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/admin.css";
import { ethers } from "ethers";
import contractABI from "../abi/CredentialNFT.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const AdminDashboard = () => {
  const [institutions, setInstitutions] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    instName: "",
    instAddress: "",
    wallet: "",
  });
  const [activeSection, setActiveSection] = useState("pending");
  const [message, setMessage] = useState("");

  // Fetch all institutions
  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/institutions");
      const approved = res.data.filter((inst) => inst.approved);
      const pendingInst = res.data.filter((inst) => !inst.approved);
      setInstitutions(approved);
      setPending(pendingInst);
    } catch (err) {
      console.error("Failed to fetch institutions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Approve institution
  const handleApprove = async (id) => {
    try {
      await API.put(`/admin/approve/${id}`);
      alert("Institution approved successfully!");
      fetchInstitutions();
    } catch (err) {
      console.error("Error approving institution:", err);
    }
  };

  // 🟥 Remove Institution — Blockchain + DB
  const handleDelete = async (id, wallet) => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      setMessage("🔄 Connecting to MetaMask...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      if (!Array.isArray(contractABI)) throw new Error("Invalid ABI format");

      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      setMessage("🧾 Sending remove transaction to blockchain...");
      const tx = await contract.removeInstitution(wallet);
      await tx.wait();

      setMessage("✅ On-chain removal successful. Updating database...");
      await API.delete(`/admin/institution/${id}`);

      alert(`Institution removed successfully!\nTx Hash: ${tx.hash}`);
      setMessage("");
      fetchInstitutions();
    } catch (err) {
      console.error("Error removing institution:", err);
      alert(err.reason || err.message || "Error removing institution");
      setMessage("");
    }
  };

  // Add Institution (Blockchain + DB)
  const handleAddInstitution = async (e) => {
    e.preventDefault();

    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethRegex.test(form.wallet)) {
      alert("⚠️ Wallet must be a valid Ethereum address (0x + 40 hex chars).");
      return;
    }

    try {
      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      setMessage("🔄 Connecting to MetaMask...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      if (!Array.isArray(contractABI)) throw new Error("Invalid ABI format");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      setMessage("🧾 Sending addInstitution transaction...");
      const tx = await contract.addInstitution(form.wallet, form.instName);
      await tx.wait();

      setMessage("✅ On-chain success! Syncing with database...");
      const res = await API.post("/admin/institution/add", form);

      alert(`Institution added successfully!\nTx Hash: ${tx.hash}\n${res.data.message}`);
      setForm({ instName: "", instAddress: "", wallet: "" });
      setMessage("");
      fetchInstitutions();
    } catch (err) {
      console.error("Error adding institution:", err);
      alert(err.reason || err.message || "Error adding institution");
      setMessage("");
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={activeSection === "pending" ? "active" : ""}
          onClick={() => setActiveSection("pending")}
        >
          Pending Institutions
        </button>
        <button
          className={activeSection === "approved" ? "active" : ""}
          onClick={() => setActiveSection("approved")}
        >
          Registered Institutions
        </button>
        <button
          className={activeSection === "add" ? "active" : ""}
          onClick={() => setActiveSection("add")}
        >
          Add Institution
        </button>
      </div>

      {loading && <p>Loading institutions...</p>}
      {message && <p className="status-msg">{message}</p>}

      {/* 🟡 Pending */}
      {activeSection === "pending" && (
        <section>
          <h2>Pending Institutions</h2>
          {pending.length === 0 ? (
            <p>No pending approvals</p>
          ) : (
            pending.map((inst) => (
              <div key={inst._id} className="inst-card pending">
                <p><strong>Name:</strong> {inst.name}</p>
                <p><strong>Email:</strong> {inst.email}</p>
                <p><strong>Wallet:</strong> {inst.wallet}</p>
                <button onClick={() => handleApprove(inst._id)}>Approve</button>
                <button onClick={() => handleDelete(inst._id, inst.wallet)}>Reject</button>
              </div>
            ))
          )}
        </section>
      )}

      {/* 🟢 Approved */}
      {activeSection === "approved" && (
        <section>
          <h2>Registered Institutions</h2>
          {institutions.length === 0 ? (
            <p>No approved institutions</p>
          ) : (
            institutions.map((inst) => (
              <div key={inst._id} className="inst-card approved">
                <p><strong>Name:</strong> {inst.name}</p>
                <p><strong>Email:</strong> {inst.email}</p>
                <p><strong>Wallet:</strong> {inst.wallet}</p>
                <button onClick={() => handleDelete(inst._id, inst.wallet)}>Remove</button>
              </div>
            ))
          )}
        </section>
      )}

      {/* 🟦 Add Institution */}
      {activeSection === "add" && (
        <section className="add-section">
          <h2>Add Institution Manually</h2>
          <form onSubmit={handleAddInstitution}>
            <input
              type="text"
              name="instName"
              placeholder="Institution Name"
              value={form.instName}
              onChange={(e) => setForm({ ...form, instName: e.target.value })}
              required
            />
            <input
              type="email"
              name="instAddress"
              placeholder="Institution Email"
              value={form.instAddress}
              onChange={(e) => setForm({ ...form, instAddress: e.target.value })}
              required
            />
            <input
              type="text"
              name="wallet"
              placeholder="Wallet Address"
              value={form.wallet}
              onChange={(e) => setForm({ ...form, wallet: e.target.value })}
              required
            />
            <button type="submit">Add Institution</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
