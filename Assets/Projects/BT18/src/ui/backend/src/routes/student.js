import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "../middleware/auth.js";
import Certificate from "../models/Certificate.js";

const router = express.Router();

/**
 * @route GET /api/student/certificates
 * @desc Fetch all certificates owned by the logged-in student
 */
router.get("/certificates", verifyToken, async (req, res) => {
  try {
    const certs = await Certificate.find({ studentWallet: req.user.wallet  });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching certificates" });
  }
});

/**
 * @route POST /api/student/share/:id
 * @desc Generate a shareable verification link for a certificate
 */
router.post("/share/:id", verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ message: "Invalid certificate ID format" });
      }
    const certId = new mongoose.Types.ObjectId(req.params.id);
    const cert = await Certificate.findOne({
      _id: certId,
      studentWallet: req.user.wallet,
    });
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    cert.shared = true;
    cert.sharedToken = Math.random().toString(36).substring(2, 10);
    await cert.save();

    const verifyURL = `${process.env.SERVER_BASE_URL}/verify/${cert.sharedToken}`;
    res.json({ message: "Shareable link created", verifyURL });
  } catch (err) {
    res.status(500).json({ message: "Error sharing certificate" });
  }
});

/**
 * @route PUT /api/student/unshare/:id
 * @desc Disable a previously shared link
 */
router.put("/unshare/:id", verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ message: "Invalid certificate ID format" });
      }
    const certId = new mongoose.Types.ObjectId(req.params.id);
    const cert = await Certificate.findOne({
      _id: certId,
      studentWallet: req.user.wallet,
    });
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    cert.shared = false;
    cert.sharedToken = null;
    await cert.save();

    res.json({ message: "Shareable link revoked" });
  } catch (err) {
    res.status(500).json({ message: "Error revoking link" });
  }
});

export default router;
