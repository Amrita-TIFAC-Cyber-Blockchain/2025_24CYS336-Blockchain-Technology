import React, { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/dashboard.css";
import { ethers } from "ethers";
import contractABI from "../abi/CredentialNFT.json";

const ethRegex = /^0x[a-fA-F0-9]{40}$/;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIMES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function InstitutionDashboard() {
  const [activeTab, setActiveTab] = useState("issue");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    studentWallet: "",
    certName: "",
    candidateName: "",
    description: "",
    date: "",
    file: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [certificates, setCertificates] = useState([]);

  const setMsg = (type, text, timeout = 6000) => {
    setMessage({ type, text });
    if (timeout) setTimeout(() => setMessage(null), timeout);
  };

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await API.get("/institution/certificates");
      setCertificates(res.data);
    } catch (err) {
      console.error("Fetch certificates error:", err);
      setMsg("error", err.response?.data?.message || "Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    connectWalletOnLoad();
  }, []);

  const connectWalletOnLoad = async () => {
    if (!window.ethereum) {
      setMsg("error", "MetaMask not installed!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const connectedWallet = await signer.getAddress();
    const storedWallet = localStorage.getItem("wallet");

    if (!storedWallet) return;

    if (connectedWallet.toLowerCase() !== storedWallet.toLowerCase()) {
      setMsg(
        "error",
        `MetaMask wallet mismatch!  
        Expected: ${storedWallet}  
        Connected: ${connectedWallet}`
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      if (!file) return;
      if (!ALLOWED_MIMES.includes(file.type)) {
        setMsg("error", "Invalid file type. Use PNG/JPEG/PDF.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setMsg("error", "File too large. Max 10MB.");
        return;
      }
      setForm((p) => ({ ...p, file }));
      if (file.type.startsWith("image/")) setPreviewUrl(URL.createObjectURL(file));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  // 🟦 Issue certificate with proper tokenId extraction
  const handleIssue = async (e) => {
    e.preventDefault();

    if (!ethRegex.test(form.studentWallet)) return setMsg("error", "Invalid student wallet.");
    if (!form.certName || !form.candidateName || !form.description || !form.date)
      return setMsg("error", "Please fill all fields.");
    if (!form.file) return setMsg("error", "Please attach certificate file.");

    setLoading(true);
    try {
      // 1️⃣ Upload file to Pinata
      const fileData = new FormData();
      fileData.append("file", form.file);

      const fileRes = await API.post("/pinata/upload", fileData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const ipfsFileHash = fileRes.data.ipfsHash || fileRes.data.IpfsHash || fileRes.data.hash;
      const imageUri = `https://gateway.pinata.cloud/ipfs/${ipfsFileHash}`;

      // 2️⃣ Upload metadata JSON
      const metadata = {
        name: form.certName,
        description: form.description,
        image: imageUri,
        attributes: [
          { trait_type: "Candidate", value: form.candidateName },
          { trait_type: "IssuedOn", value: form.date }
        ]
      };

      const jsonRes = await API.post("/pinata/json", metadata);
      const ipfsJsonHash = jsonRes.data.ipfsHash || jsonRes.data.IpfsHash || jsonRes.data.hash;
      const tokenURI = `ipfs://${ipfsJsonHash}`;

      // 3️⃣ Blockchain issue
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      setMsg("info", "🧾 Sending transaction...");
      const tx = await contract.issueCertificate(
        form.studentWallet,
        tokenURI,
        `${form.certName} - ${form.candidateName}`
      );

      setMsg("info", "⏳ Waiting for confirmation...");
      const receipt = await tx.wait();

      // Correct event-based tokenId extraction
      const iface = new ethers.Interface(contractABI);
      let tokenId = null;

      for (const log of receipt.logs) {
        try {
          const parsed = iface.parseLog(log);
          if (parsed?.name === "CertificateIssued") {
            tokenId = parsed.args.tokenId.toString();
            break;
          }
        } catch (err) {
          // skip unrelated logs
        }
      }

      if (!tokenId) {
        throw new Error("Failed to extract tokenId from blockchain event");
      }

      // 4️⃣ Save in DB
      const res = await API.post("/institution/issue", {
        studentWallet: form.studentWallet,
        tokenURI,
        certName: form.certName,
        date: form.date,
        tokenId,
        txHash: tx.hash
      });

      setMsg("success", `Certificate issued successfully! Tx: ${tx.hash}`);

      // Reset form
      setForm({
        studentWallet: "",
        certName: "",
        candidateName: "",
        description: "",
        date: "",
        file: null
      });
      setPreviewUrl(null);
      fetchCertificates();
    } catch (err) {
      console.error("Issue error:", err);
      setMsg("error", err.reason || err.message || "Certificate issuance failed");
    } finally {
      setLoading(false);
    }
  };

const handleRevoke = async (e) => {
  e.preventDefault();

  const tokenId = e.target.tokenId?.value;
  const reason = e.target.reason?.value;

  if (!tokenId) return setMsg("error", "Token ID required.");
  if (!reason) return setMsg("error", "Provide a revocation reason.");

  setLoading(true);

  try {
    if (!window.ethereum) {
      return setMsg("error", "MetaMask not detected!");
    }

    // 1️⃣ Connect MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

    // 2️⃣ Send blockchain revoke transaction
    setMsg("info", "🔄 Sending revoke transaction...");
    const tx = await contract.revokeCertificate(Number(tokenId), reason);

    setMsg("info", "⏳ Waiting for confirmation...");
    await tx.wait();

    // 3️⃣ Notify backend (store DB record)
    const res = await API.post("/institution/revoke", {
      tokenId: Number(tokenId),
      reason
    });

    setMsg("success", ` Certificate revoked!\nTx: ${tx.hash}`);

    fetchCertificates();
  } catch (err) {
    console.error("Revoke error:", err);
    setMsg("error", err.reason || err.message || "Revoke failed");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="dashboard-container">
      <h2>🏛 Institution Dashboard</h2>

      {message && (
        <div className={`msg ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="tabs">
        <button onClick={() => setActiveTab("issue")} className={activeTab === "issue" ? "active" : ""}>📜 Issue Certificate</button>
        <button onClick={() => setActiveTab("view")} className={activeTab === "view" ? "active" : ""}>📁 My Certificates</button>
        <button onClick={() => setActiveTab("revoke")} className={activeTab === "revoke" ? "active" : ""}>❌ Revoke Certificate</button>
      </div>

      {loading && <p>Loading...</p>}

      {activeTab === "issue" && (
        <form className="form-section" onSubmit={handleIssue}>
          <input type="text" name="studentWallet" placeholder="Student Wallet (0x…)" value={form.studentWallet} onChange={handleChange} required />
          <input type="text" name="certName" placeholder="Certificate Name" value={form.certName} onChange={handleChange} required />
          <input type="text" name="candidateName" placeholder="Candidate Name" value={form.candidateName} onChange={handleChange} required />
          <textarea name="description" placeholder="Short description" value={form.description} onChange={handleChange} required />
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="file" name="file" accept="image/*,application/pdf" onChange={handleChange} required />
          {previewUrl && <img src={previewUrl} alt="preview" style={{ maxWidth: "250px", marginTop: 8 }} />}
          <button type="submit" disabled={loading}>Issue Certificate</button>
        </form>
      )}

      {activeTab === "view" && (
        <div className="list-section">
          <h3>📁 Certificates Issued</h3>
          {certificates.length === 0 ? (
            <p>No certificates yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Token ID</th>
                  <th>Student</th>
                  <th>Certificate</th>
                  <th>Date</th>
                  <th>IPFS</th>
                  <th>Revoked</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert._id}>
                    <td>{cert.tokenId}</td>
                    <td>{cert.studentWallet}</td>
                    <td>{cert.certName}</td>
                    <td>{cert.date}</td>
                    <td>
                      {cert.tokenURI ? (
                        <a href={cert.tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")} target="_blank" rel="noreferrer">View JSON</a>
                      ) : "—"}
                    </td>
                    <td>{cert.revoked ? `Yes (${cert.revokeReason})` : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "revoke" && (
        <form className="form-section" onSubmit={handleRevoke}>
          <input type="number" name="tokenId" placeholder="Token ID" required />
          <input type="text" name="reason" placeholder="Reason for revocation" required />
          <button type="submit" disabled={loading}>Revoke</button>
        </form>
      )}
    </div>
  );
}
