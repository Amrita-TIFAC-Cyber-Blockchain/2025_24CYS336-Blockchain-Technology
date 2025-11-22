import express from 'express';
import Certificate from '../models/Certificate.js';

const router = express.Router();

router.get('/student/:wallet', async (req, res) => {
  try {
    const wallet = req.params.wallet;
    const certs = await Certificate.find({ studentAddress: wallet }).sort({ issuedAt: -1 });
    res.json(certs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/token/:tokenId', async (req, res) => {
  try {
    const tokenId = parseInt(req.params.tokenId);
    const cert = await Certificate.findOne({ tokenId });
    if (!cert) return res.status(404).json({ error: 'Not found' });
    res.json(cert);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;