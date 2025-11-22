import React from "react";
import API from "../api/axios";

const CertificateCard = ({ cert, refresh }) => {
  const handleShare = async () => {
    try {
      const res = await API.post(`/student/share/${cert._id}`);
      alert(`Shareable Link Created!\n${res.data.verifyURL}`);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error generating share link");
    }
  };

  const handleUnshare = async () => {
    try {
      await API.put(`/student/unshare/${cert._id}`);
      alert("Share link disabled");
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error disabling link");
    }
  };

  return (
    <div className="certificate-card">
      <h3>{cert.certName}</h3>
      <p>{cert.description}</p>
      <p><strong>Issuer:</strong> {cert.issuer}</p>
      <p><strong>Date:</strong> {new Date(cert.date).toLocaleDateString()}</p>

      {cert.shared ? (
        <>
          <p>
            <strong>Shared Link:</strong>{" "}
            <a
                href={`${import.meta.env.VITE_APP_BASE_URL}/verify/${cert.sharedToken}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${import.meta.env.VITE_APP_BASE_URL}/verify/${cert.sharedToken}`}
              </a>
          </p>
          <button onClick={handleUnshare}>Disable Link</button>
        </>
      ) : (
        <button onClick={handleShare}>Generate Share Link</button>
      )}
    </div>
  );
};

export default CertificateCard;
