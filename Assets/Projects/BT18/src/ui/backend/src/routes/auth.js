import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route POST /api/auth/signup
 * @desc Register new user (Admin / Institution / Student)
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, wallet } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // ✅ Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Default approval logic
    const approved = role === "Institution" ? false : true;

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      wallet,
      approved,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return JWT
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    if (user.role === "Institution" && !user.approved)
      return res.status(403).json({ message: "Institution not yet approved" });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, wallet: user.wallet },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        wallet: user.wallet
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
