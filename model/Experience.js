const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date: { type: String, required: true }, // ISO date string (YYYY-MM-DD) or user display
  time: { type: String, required: true }, // e.g. "09:00 - 11:00"
  capacity: { type: Number, default: 5 }, // total seats
  price: { type: Number, required: true },
});

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: String,
  description: String,
  image: String,
  location: String,
  slots: [SlotSchema]
});

module.exports = mongoose.model('Experience', ExperienceSchema);
