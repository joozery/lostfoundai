const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const findOrCreateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Check if admin@lostfound.com exists
        let admin = await User.findOne({ email: 'admin@lostfound.com' });

        if (admin) {
            console.log('Admin user found:');
            console.log('Email: admin@lostfound.com');
            console.log('Role:', admin.role);

            // Re-hash password to 'admin1234' just in case
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash('admin1234', salt);
            admin.role = 'admin';
            await admin.save();
            console.log('Password has been reset to: admin1234');
        } else {
            console.log('Admin user not found, creating...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin1234', salt);

            await User.create({
                firstname: 'System',
                lastname: 'Admin',
                email: 'admin@lostfound.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Admin created:');
            console.log('Email: admin@lostfound.com');
            console.log('Password: admin1234');
        }

        mongoose.connection.close();
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

findOrCreateAdmin();
