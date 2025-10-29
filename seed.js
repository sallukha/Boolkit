require('dotenv').config();
const mongoose = require('mongoose');
const Experience = require('./model/Experience.js'); // ✅ ensure folder is "models"
const Promo = require('./model/Promo.js');

const MONGO = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log('✅ Connected to MongoDB for seeding');

    await Experience.deleteMany({});
    await Promo.deleteMany({});

    const experiences = [
      {
        title: 'Sunrise Kayaking on River X',
        shortDescription: 'A peaceful morning paddle with wildlife sightings.',
        description: 'Start early, enjoy guided kayaking on calm waters. Includes snacks.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        location: 'Riverbank',
        slots: [
          { date: '2025-11-01', time: '06:00 - 08:00', capacity: 6, price: 1200 },
          { date: '2025-11-02', time: '06:00 - 08:00', capacity: 6, price: 1200 }
        ]
      },
      {
        title: 'Hilltop Camping & Stargazing',
        shortDescription: 'Camp overnight & watch the stars.',
        description: 'Includes tents, sleeping mats, and dinner.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        location: 'Hills',
        slots: [
          { date: '2025-12-10', time: '18:00 - 06:00', capacity: 10, price: 3500 }
        ]
      },
      {
        title: 'Desert Safari Adventure',
        shortDescription: 'Thrilling ride through golden sand dunes.',
        description: 'Experience jeep safari, camel rides, and desert sunset with local dinner.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3',
        location: 'Thar Desert',
        slots: [
          { date: '2025-11-20', time: '16:00 - 20:00', capacity: 8, price: 2500 }
        ]
      },
      {
        title: 'Forest Trekking Expedition',
        shortDescription: 'A guided trek through lush green trails.',
        description: 'Enjoy a full-day trek with professional guides, breakfast, and lunch.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        location: 'Rainforest Valley',
        slots: [
          { date: '2025-11-15', time: '08:00 - 17:00', capacity: 12, price: 1800 }
        ]
      },
      {
        title: 'Scuba Diving Experience',
        shortDescription: 'Explore the underwater world full of marine life.',
        description: 'Certified instructors, safety gear, and video recording included.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3',
        location: 'Goa Beach',
        slots: [
          { date: '2025-11-25', time: '09:00 - 12:00', capacity: 5, price: 4500 }
        ]
      },
      {
        title: 'Mountain Biking Challenge',
        shortDescription: 'Ride through steep trails and scenic valleys.',
        description: 'Includes mountain bikes, safety helmets, and guide support.',
        image: 'https://images.unsplash.com/photo-1520975918318-3d21a84bca68',
        location: 'Manali Hills',
        slots: [
          { date: '2025-11-22', time: '07:00 - 12:00', capacity: 10, price: 2200 }
        ]
      },
      {
        title: 'Hot Air Balloon Ride',
        shortDescription: 'Get a bird’s-eye view of the landscape at sunrise.',
        description: 'Includes breakfast, safety briefing, and certificate of flight.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        location: 'Jaipur',
        slots: [
          { date: '2025-11-28', time: '05:30 - 07:00', capacity: 6, price: 5000 }
        ]
      },
      {
        title: 'Beach Yoga & Meditation Retreat',
        shortDescription: 'Relax your mind with early morning yoga by the sea.',
        description: 'Professional yoga instructor, healthy breakfast, and sea breeze.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=60',
        location: 'Varkala Beach',
        slots: [
          { date: '2025-12-02', time: '06:30 - 09:00', capacity: 15, price: 800 }
        ]
      },
      {
        title: 'Snow Skiing Lessons',
        shortDescription: 'Learn to ski with experts on fresh snow slopes.',
        description: 'Includes skis, boots, poles, lift ticket, and instructor guidance.',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090',
        location: 'Gulmarg',
        slots: [
          { date: '2025-12-15', time: '09:00 - 15:00', capacity: 8, price: 6000 }
        ]
      },
      {
        title: 'Jungle Safari & Wildlife Photography',
        shortDescription: 'Capture wild animals in their natural habitat.',
        description: 'Guided open-jeep safari with photography expert and lunch.',
        image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
        location: 'Jim Corbett National Park',
        slots: [
          { date: '2025-11-30', time: '06:00 - 11:00', capacity: 8, price: 3000 }
        ]
      }
    ];

    await Experience.insertMany(experiences);

    const promos = [
      { code: 'SAVE10', type: 'PERCENT', value: 10, active: true, minAmount: 0 },
      { code: 'FLAT100', type: 'FLAT', value: 100, active: true, minAmount: 500 }
    ];

    await Promo.insertMany(promos);

    console.log('🌱 Seeding done successfully ✅');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();
