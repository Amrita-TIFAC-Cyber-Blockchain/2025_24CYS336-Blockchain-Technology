import express from "express";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";
import Certificate from "../models/Certificate.js";

const router = express.Router();

/**
 * @route POST /api/institution/issue
 * @desc Issue new certificate (off-chain record, later triggers mint)
 * @access Institution only
 */
router.post("/issue", verifyToken, async (req, res) => {
  try {
    const { studentWallet, tokenURI, certName, date, tokenId, txHash} = req.body;
    const issuer = await User.findById(req.user.id);

    // Save in MongoDB
    const cert = new Certificate({
      tokenId,
      studentWallet,
      certName,
      tokenURI,
      date,
      issuer: issuer._id,
      txHash: txHash,
      onChain: true,
    });

    await cert.save();

    return res.status(201).json({
      message: "Certificate issued successfully on-chain",
      cert,
      txHash: txHash,
    });
  } catch (err) {
    console.error(" Error issuing certificate:", err);
    return res.status(500).json({
      message: "Failed to issue certificate on-chain",
      error: err.message,
    });
  }
});

/**
 * @route GET /api/institution/certificates
 * @desc Get all certificates issued by this institution
 * @access Institution only
 */
router.get("/certificates", verifyToken, async (req, res) => {
  try {
    const institution = await User.findById(req.user.id);
    if (!institution || institution.role !== "Institution")
      return res.status(403).json({ message: "Access denied" });

    const certs = await Certificate.find({ issuer: institution._id });
    res.json(certs);
  } catch (err) {
    console.error("Error fetching certificates:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route POST /api/institution/revoke
 * @desc Revoke a certificate
 * @access Institution only
 */
router.post("/revoke", verifyToken, async (req, res) => {
  try {
    const { tokenId, reason } = req.body;

    if (!tokenId || !reason)
      return res.status(400).json({ message: "Token ID and reason required" });

    const institution = await User.findById(req.user.id);
    if (!institution || institution.role !== "Institution")
      return res.status(403).json({ message: "Access denied" });

    // Ensure certificate exists
    const cert = await Certificate.findOne({tokenId,issuer: institution._id});
    if (!cert)
      return res.status(404).json({ message: "Certificate not found" });

    if (cert.revoked)
      return res.status(400).json({ message: "Certificate already revoked" });

    if (cert.issuer.toString() !== institution._id.toString())
      return res.status(403).json({ message: "You cannot revoke this certificate" });

    // ATOMIC UPDATE — ensures no duplicate document creation
    await Certificate.updateOne(
      { tokenId, issuer: institution._id},
      {
        $set: {
          revoked: true,
          revokeReason: reason,
          updatedAt: new Date()
        }
      }
    );

    return res.json({ message: "Certificate revoked successfully" });

  } catch (err) {
    console.error("Revoke error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});





export default router;
