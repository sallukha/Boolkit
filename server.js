 require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const experiencesRoute = require('./routes/experiences.routes.js');
const bookingsRoute = require('./routes/bookings.routes.js');
const promoRoute = require('./routes/promo.routes.js');

const app = express();

// ✅ Allowed frontend URLs (local + live)
const allowedOrigins = [
  'http://localhost:5173', // local frontend (vite)
  'https://stunning-clafoutis-0e7c7b.netlify.app' // live frontend (Netlify)
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the origin ${origin}`;
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

// ✅ MongoDB connection + server start
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;


mongoose
  .connect(MONGO)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
