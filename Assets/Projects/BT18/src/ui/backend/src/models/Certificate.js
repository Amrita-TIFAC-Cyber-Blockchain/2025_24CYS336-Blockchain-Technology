import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    tokenId: { type: Number, required: true, unique: true },
    studentWallet: { type: String, required: true },
    certName: { type: String, required: true },
    tokenURI: { type: String, required: true },
    date: { type: String },
    issuer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shared: { type: Boolean, default: false },
    sharedToken: { type: String, default: null },
    revoked: { type: Boolean, default: false },
    revokeReason: { type: String, default: "" },
    txHash: {type: String, required: true},
    onChain: {type: Boolean, default: false}
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
