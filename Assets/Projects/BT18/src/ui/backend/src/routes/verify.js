import express from "express";
import Certificate from "../models/Certificate.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route GET /api/verify/:token
 * @desc Verify a certificate using its shareable link token
 * @access Public
 */
router.get("/:token", async (req, res) => {
  try {
    const cert = await Certificate.findOne({ sharedToken: req.params.token });

    if (!cert) {
      return res.status(404).json({ message: "Certificate not found or link invalid" });
    }

    if (!cert.shared) {
      return res.status(400).json({ message: "This certificate link has been disabled" });
    }

    // Get institution info
    const institution = await User.findOne({ _id : cert.issuer });

    const student = await User.findOne({ wallet: cert.studentWallet})

    res.json({
      verified: true,
      certificate: {
        certId: cert._id,
        ipfsURI: cert.tokenURI,
        tokenId: cert.tokenId,
        issuedTo: student.name,
        studentWallet: cert.studentWallet,
        institutionName: institution ? institution.name : "Unknown Institution",
        issueDate: cert.createdAt,
        revoked: cert.revoked,
      },
    });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
