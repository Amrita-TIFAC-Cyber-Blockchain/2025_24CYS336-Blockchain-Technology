import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "../styles/verify.css";

const VerifyCertificate = () => {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await API.get(`/verify/${token}`);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Verification failed");
      }
    };
    fetchCertificate();
  }, [token]);

  if (error) return <div className="verify-container"><h2>{error}</h2></div>;
  if (!data) return <div className="verify-container"><h2>Verifying certificate...</h2></div>;

  const { certificate } = data;

  return (
    <div className="verify-container">
      <h2>Certificate Verification Result</h2>
      {certificate.revoked ? (
        <p className="revoked">❌ Certificate Revoked</p>
      ) : (
        <p className="valid">✅ Certificate Verified</p>
      )}
      <div className="cert-details">
        <p><strong>Certificate ID:</strong> {certificate.certId}</p>
        <p><strong>Issued To:</strong> {certificate.issuedTo}</p>
        <p><strong>Institution:</strong> {certificate.institutionName}</p>
        <p><strong>Student Wallet:</strong> {certificate.studentWallet}</p>
        <p><strong>IPFS URI:</strong> <a href={certificate.ipfsURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")} target="_blank" rel="noopener noreferrer">{certificate.ipfsURI}</a></p>
        <p><strong>Issued On:</strong> {new Date(certificate.issueDate).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default VerifyCertificate;
