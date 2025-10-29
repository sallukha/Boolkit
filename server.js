 require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const experiencesRoute = require('./routes/experiences.routes.js');
const bookingsRoute = require('./routes/bookings.routes.js');
const promoRoute = require('./routes/promo.routes.js');

const app = express();

// ✅ Allowed frontend URLs (local + Netlify live)
const allowedOrigins = [
  'http://localhost:5173',
  'https://astonishing-dragon-95e916.netlify.app' // ✅ your latest frontend link
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from origin ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(bodyParser.json());

// ✅ Routes
app.use('/api/experiences', experiencesRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/promo', promoRoute);

// ✅ MongoDB connection
const MONGO = process.env.MONGO_URI;
mongoose
  .connect(MONGO)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Export for Vercel (no app.listen here)
module.exports = app;
