import mongoose from 'mongoose';

const InstitutionApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  details: String,
  walletAddress: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('InstitutionApplication', InstitutionApplicationSchema);
