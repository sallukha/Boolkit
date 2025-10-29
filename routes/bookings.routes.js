const express = require('express');
const router = express.Router();
const Booking = require("../model/Booking.js");
const Experience = require('../model/Experience.js');

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { experienceId, slotDate, slotTime, name, email, phone, promo } = req.body;

    if (!experienceId || !slotDate || !slotTime || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ error: 'Experience not found' });

    // find slot
    const slot = exp.slots.find(s => s.date === slotDate && s.time === slotTime);
    if (!slot) return res.status(400).json({ error: 'Slot not found' });

    // count existing bookings for same experience + slot
    const bookingCount = await Booking.countDocuments({
      experience: experienceId,
      slotDate: slotDate,
      slotTime: slotTime
    });

    if (bookingCount >= slot.capacity) {
      return res.status(409).json({ error: 'Slot sold out' });
    }

    // compute price - promo handling should be asked to promo route; here we accept price as slot.price for simplicity
    const price = slot.price;

    // store booking
    const newBooking = new Booking({
      experience: experienceId,
      slotDate,
      slotTime,
      name,
      email,
      phone,
      pricePaid: price,
      promoApplied: promo || null
    });

    await newBooking.save();

    res.json({ success: true, bookingId: newBooking._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
