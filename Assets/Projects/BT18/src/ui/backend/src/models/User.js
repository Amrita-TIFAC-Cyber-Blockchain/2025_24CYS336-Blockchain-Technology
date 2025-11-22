import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Institution", "Student"], required: true },
    wallet: { type: String,
  required: function () {
    return this.role !== "Admin"; // Admins don't need wallet addresses
  },
  match: /^0x[a-fA-F0-9]{40}$/, // Ethereum address format validation
  unique: true },
    approved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
