const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  experience: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotDate: { type: String, required: true }, // date string same as slot.date
  slotTime: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  pricePaid: { type: Number, required: true },
  promoApplied: String,
  createdAt: { type: Date, default: Date.now }
});

// To help prevent duplicate exact bookings: unique index on experience + date + time + email (optional)
// But we also check capacity before saving.
BookingSchema.index({ experience: 1, slotDate: 1, slotTime: 1, email: 1 }, { unique: false });

module.exports = mongoose.model('Booking', BookingSchema);
