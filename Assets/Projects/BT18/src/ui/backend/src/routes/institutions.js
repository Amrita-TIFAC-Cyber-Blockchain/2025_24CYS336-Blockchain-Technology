import express from 'express';
import InstitutionApplication from '../models/InstitutionApplication.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/apply', async (req, res) => {
  try {
    const { name, email, details, walletAddress } = req.body;
    const app = await InstitutionApplication.create({ name, email, details, walletAddress });
    res.json(app);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/pending', async (_, res) => {
  try {
    const pending = await InstitutionApplication.find({ status: 'pending' });
    res.json(pending);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/approve/:id', async (req, res) => {
  try {
    const app = await InstitutionApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Not found' });
    app.status = 'approved';
    await app.save();

    await User.create({
      email: app.email,
      name: app.name,
      role: 'institution',
      walletAddress: app.walletAddress,
      approved: true
    });

    res.json({ ok: true, app });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;