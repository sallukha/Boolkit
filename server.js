 require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const experiencesRoute = require('./routes/experiences.routes.js');
const bookingsRoute = require('./routes/bookings.routes.js');
const promoRoute = require('./routes/promo.routes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/experiences', experiencesRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/promo', promoRoute);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/bookit';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
