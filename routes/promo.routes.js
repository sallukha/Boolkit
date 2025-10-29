const express = require('express');
const router = express.Router();
const Promo = require('../model/Promo.js');

// POST /api/promo/validate
router.post('/validate', async (req, res) => {
  try {
    const { code, amount } = req.body;
    if (!code) return res.status(400).json({ error: 'Promo code required' });

    const promo = await Promo.findOne({ code: code.toUpperCase(), active: true });
    if (!promo) return res.status(404).json({ valid: false, message: 'Invalid code' });

    if (amount < promo.minAmount) {
      return res.json({ valid: false, message: `Minimum amount ${promo.minAmount} required` });
    }

    let discount = 0;
    if (promo.type === 'PERCENT') {
      discount = (amount * promo.value) / 100;
    } else {
      discount = promo.value;
    }
    const final = Math.max(0, amount - discount);
    res.json({ valid: true, discount, final, promo: promo.code });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
