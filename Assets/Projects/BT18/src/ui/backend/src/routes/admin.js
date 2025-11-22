import express from "express";
import User from "../models/User.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import bcrypt from "bcryptjs";

const router = express.Router();

/**
 * @route   GET /api/admin/pending
 * @desc    Get all institutions awaiting approval
 * @access  Admin only
 */
router.get("/pending", verifyToken, isAdmin, async (req, res) => {
  try {
    const pending = await User.find({ role: "Institution", approved: false });
    res.status(200).json(pending);
  } catch (err) {
    console.error("Error fetching pending institutions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/admin/approve/:id
 * @desc    Approve institution registration (no on-chain call here)
 * @access  Admin only
 */
router.put("/approve/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const institution = await User.findById(req.params.id);
    if (!institution)
      return res.status(404).json({ message: "Institution not found" });

    if (institution.role !== "Institution")
      return res.status(400).json({ message: "User is not an institution" });

    institution.approved = true;
    await institution.save();

    res.json({ message: "Institution approved successfully" });
  } catch (err) {
    console.error("Error approving institution:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   DELETE /api/admin/institution/:id
 * @desc    Remove institution (DB only — blockchain revocation can be added later)
 * @access  Admin only
 */
router.delete("/institution/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const institution = await User.findById(req.params.id);
    if (!institution)
      return res.status(404).json({ message: "Institution not found" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Institution removed successfully" });
  } catch (err) {
    console.error("Error deleting institution:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/admin/institutions
 * @desc    Get all institutions (approved + pending)
 * @access  Admin only
 */
router.get("/institutions", verifyToken, isAdmin, async (req, res) => {
  try {
    const institutions = await User.find({ role: "Institution" }).select("-password");
    res.status(200).json(institutions);
  } catch (err) {
    console.error("Error fetching institutions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   POST /api/admin/institution/add
 * @desc    Add a new institution (after successful on-chain tx from frontend)
 * @access  Admin only
 */
router.post("/institution/add", verifyToken, isAdmin, async (req, res) => {
  try {
    const { instName, instAddress, wallet } = req.body;

    if (!instName || !instAddress || !wallet) {
      return res.status(400).json({
        message: "Institution name, email, and wallet are required",
      });
    }

    // Validate Ethereum wallet format
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(wallet)) {
      return res.status(400).json({
        message: "Invalid Ethereum wallet address (expected 0x...40 hex chars)",
      });
    }

    // Check duplicates
    const existing = await User.findOne({
      $or: [{ email: instAddress }, { wallet }],
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Institution with this email or wallet already exists" });
    }

    // Create password (default or generated)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Default@123", salt);

    const newInstitution = new User({
      name: instName,
      email: instAddress,
      wallet,
      password: hashedPassword,
      role: "Institution",
      approved: true, // Already approved since added manually
    });

    await newInstitution.save();

    res.status(201).json({
      message: "Institution added successfully (synced with blockchain)",
      institution: {
        id: newInstitution._id,
        name: newInstitution.name,
        email: newInstitution.email,
        wallet: newInstitution.wallet,
      },
    });
  } catch (err) {
    console.error("Error adding institution:", err);

    // Handle Mongoose validation or duplicate key errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join("; ") });
    }

    if (err.code === 11000) {
      const dupField = Object.keys(err.keyValue || {})[0];
      return res.status(400).json({ message: `Duplicate value for field ${dupField}` });
    }

    res.status(500).json({ message: "Server error while adding institution" });
  }
});

export default router;
