const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
  code: { type: String, required: true, uppercase: true, unique: true },
  type: { type: String, enum: ['PERCENT', 'FLAT'], default: 'PERCENT' },
  value: { type: Number, required: true }, // if percent 10 => 10%
  active: { type: Boolean, default: true },
  minAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Promo', PromoSchema);
