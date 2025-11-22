import mongoose from 'mongoose';

const ShareLinkSchema = new mongoose.Schema({
  certificateRef: { type: mongoose.Types.ObjectId, ref: 'Certificate', required: true },
  tokenId: Number,
  contractAddress: String,
  allowedFields: [String],
  publicId: { type: String, unique: true },
  active: { type: Boolean, default: true },
  expiresAt: Date
}, { timestamps: true });

export default mongoose.model('ShareLink', ShareLinkSchema);
