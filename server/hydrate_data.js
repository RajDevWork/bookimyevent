const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user.model');
const Event = require('./src/models/event.model');
const Booking = require('./src/models/booking.model');

dotenv.config();

const users = [
    { username: 'Super Admin', email: 'admin@gmail.com', password: 'securePass123', role: 'admin' },
    { username: 'Rahul Verma', email: 'rahul@gmail.com', password: 'securePass123', role: 'user' },
    { username: 'Priya Sharma', email: 'priya@gmail.com', password: 'securePass123', role: 'user' },
    { username: 'Amit Singh', email: 'amit@gmail.com', password: 'securePass123', role: 'user' },
    { username: 'Neha Gupta', email: 'neha@gmail.com', password: 'securePass123', role: 'user' },
    { username: 'Karan Mehta', email: 'karan@gmail.com', password: 'securePass123', role: 'user' },
    { username: 'Sneha Reddy', email: 'sneha@gmail.com', password: 'securePass123', role: 'user' },
    { username: 'Vikram Joshi', email: 'vikram@gmail.com', password: 'securePass123', role: 'user' },
    { username: 'Ananya Iyer', email: 'ananya@gmail.com', password: 'securePass123', role: 'user' },
    { username: 'Rohit Patil', email: 'rohit@gmail.com', password: 'securePass123', role: 'user' }
];

const events = [
    {
        title: 'Full Stack JavaScript Bootcamp',
        description: 'An intensive bootcamp covering MERN stack, system design basics, and real-world project building.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: 'Bangalore Tech Park, India',
        category: 'Technology',
        totalSeats: 180,
        availableSeats: 180,
        ticketPrice: 999,
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
    },
    {
        title: 'Bollywood Music Night',
        description: 'Enjoy a vibrant night filled with Bollywood hits, live performances, and dance.',
        date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        location: 'NSCI Dome, Mumbai',
        category: 'Music',
        totalSeats: 400,
        availableSeats: 400,
        ticketPrice: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063'
    },
    {
        title: 'AI & Future Tech Conference',
        description: 'Explore advancements in AI, machine learning, and how they are shaping industries globally.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        location: 'Hyderabad International Convention Centre',
        category: 'Technology',
        totalSeats: 250,
        availableSeats: 250,
        ticketPrice: 2500,
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
    },
    {
        title: 'Startup Networking Meetup',
        description: 'Connect with founders, investors, and innovators in a casual networking environment.',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: 'WeWork, Gurgaon',
        category: 'Business',
        totalSeats: 120,
        availableSeats: 120,
        ticketPrice: 299,
        imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd'
    },
    {
        title: 'Photography Masterclass',
        description: 'Learn professional photography techniques including lighting, framing, and editing.',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        location: 'Delhi Creative Studio',
        category: 'Art',
        totalSeats: 80,
        availableSeats: 80,
        ticketPrice: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7'
    },
    {
        title: 'Yoga & Wellness Retreat',
        description: 'A relaxing retreat focused on mental health, yoga, meditation, and holistic wellness.',
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        location: 'Rishikesh Riverside Camp',
        category: 'Health',
        totalSeats: 60,
        availableSeats: 60,
        ticketPrice: 3500,
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
    }
];

/* ================= SEED FUNCTION ================= */
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventora');
        console.log('\n✅ MongoDB connected...');

        await User.deleteMany();
        await Event.deleteMany();
        await Booking.deleteMany();
        console.log('🗑️ Old data cleared.');

        /* ---------- USERS ---------- */
        const salt = await bcrypt.genSalt(10);

        const hashedUsers = users.map(u => ({
            ...u,
            username: u.email.split('@')[0], // ✅ auto username fix
            password: bcrypt.hashSync(u.password, salt),
            isVerified: true
        }));

        const createdUsers = await User.insertMany(hashedUsers);

        const adminUser = createdUsers.find(u => u.role === 'admin');
        const normalUsers = createdUsers.filter(u => u.role === 'user');

        console.log(`👤 Users created: ${createdUsers.length}`);

        /* ---------- EVENTS ---------- */
        const eventsWithAdmin = events.map(e => ({
            ...e,
            availableSeats: e.totalSeats, // ✅ correct field
            createdBy: adminUser._id
        }));

        const createdEvents = await Event.insertMany(eventsWithAdmin);
        console.log(`🎉 Events created: ${createdEvents.length}`);

        /* ---------- BOOKINGS ---------- */
        const bookingsData = [];

        for (const event of createdEvents) {
            const randomCount = Math.min(
                normalUsers.length,
                Math.floor(Math.random() * 4) + 3
            );

            const shuffledUsers = [...normalUsers].sort(() => 0.5 - Math.random());
            const selectedUsers = shuffledUsers.slice(0, randomCount);

            for (const user of selectedUsers) {
                const statuses = ['pending', 'confirmed', 'cancelled'];
                const status = statuses[Math.floor(Math.random() * statuses.length)];

                let paymentStatus = 'not_paid';

                if (status === 'confirmed' && event.ticketPrice > 0) {
                    paymentStatus = Math.random() > 0.1 ? 'paid' : 'not_paid';
                } else if (event.ticketPrice === 0) {
                    paymentStatus = 'paid';
                }

                bookingsData.push({
                    userId: user._id,
                    eventId: event._id,
                    status,
                    paymentStatus,
                    amount: event.ticketPrice,
                    numberOfTickets: 1

                });

                // ✅ safe seat deduction
                if (status === 'confirmed' && event.availableSeats > 0) {
                    event.availableSeats -= 1;
                }
            }
        }

        // ✅ batch save (performance optimized)
        await Promise.all(createdEvents.map(e => e.save()));

        await Booking.insertMany(bookingsData);
        console.log(`🎫 Bookings created: ${bookingsData.length}`);

        console.log('\n🚀 SEED COMPLETED SUCCESSFULLY');
        console.log('--------------------------------');
        console.log('Admin Email: admin@gmail.com');
        console.log('User Email:  rahul@gmail.com');
        console.log('Password: securePass123');
        console.log('--------------------------------\n');

        process.exit();
    } catch (error) {
        console.error('❌ Seed Error:', error);
        process.exit(1);
    }
};


seedDatabase();