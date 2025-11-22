import express from 'express';
import { customAlphabet } from 'nanoid';
import ShareLink from '../models/ShareLink.js';
import Certificate from '../models/Certificate.js';

const router = express.Router();
const nano = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);

router.post('/create', async (req, res) => {
  try {
    const { tokenId, allowedFields = [], expiresAt } = req.body;
    const cert = await Certificate.findOne({ tokenId });
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });

    const publicId = nano();
    const link = await ShareLink.create({
      certificateRef: cert._id,
      tokenId,
      contractAddress: cert.contractAddress,
      allowedFields,
      publicId,
      active: true,
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });

    res.json({
      url: `${process.env.SERVER_BASE_URL}/verify?public=${publicId}`,
      link
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:publicId', async (req, res) => {
  try {
    const link = await ShareLink.findOne({ publicId: req.params.publicId }).populate('certificateRef');
    if (!link || !link.active) return res.status(404).json({ error: 'Inactive or missing link' });
    if (link.expiresAt && new Date() > link.expiresAt)
      return res.status(410).json({ error: 'Link expired' });

    const cert = link.certificateRef;
    const out = {
      tokenId: cert.tokenId,
      contractAddress: cert.contractAddress,
      issuerAddress: cert.issuerAddress,
      studentAddress: cert.studentAddress,
      revoked: cert.revoked
    };

    link.allowedFields.forEach(f => {
      if (f in cert) out[f] = cert[f];
    });

    res.json(out);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;