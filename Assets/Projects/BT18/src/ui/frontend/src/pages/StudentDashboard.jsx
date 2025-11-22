import React, { useEffect, useState } from "react";
import API from "../api/axios";
import CertificateCard from "../components/CertificateCard";
import "../styles/student.css";

const StudentDashboard = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    try {
      const res = await API.get("/student/certificates");
      setCerts(res.data);
    } catch (err) {
      console.error("Error fetching certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="student-dashboard">
      <h2>My Certificates</h2>
      {loading ? (
        <p>Loading...</p>
      ) : certs.length > 0 ? (
        certs.map((cert) => (
          <CertificateCard key={cert._id} cert={cert} refresh={fetchCertificates} />
        ))
      ) : (
        <p>No certificates found.</p>
      )}
    </div>
  );
};

export default StudentDashboard;