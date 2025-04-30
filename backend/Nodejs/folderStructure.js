// my-node-app/
// ├── src/
// │   ├── config/
// │   │   ├── db.js
// │   │   └── server.js
// │   ├── controllers/
// │   │   ├── authController.js
// │   │   └── userController.js
// │   ├── middlewares/
// │   │   ├── authMiddleware.js
// │   │   └── errorHandler.js
// │   ├── models/
// │   │   ├── userModel.js
// │   │   └── postModel.js
// │   ├── routes/
// │   │   ├── authRoutes.js
// │   │   └── userRoutes.js
// │   ├── services/
// │   │   ├── authService.js
// │   │   └── userService.js
// │   ├── utils/
// │   │   ├── logger.js
// │   │   └── validator.js
// │   ├── app.js
// │   └── server.js
// ├── test/
// │   ├── auth.test.js
// │   └── user.test.js
// ├── .env
// ├── .gitignore
// ├── package.json
// ├── package-lock.json
// └── README.md













// src/app.js

const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;






// src/server.js


const app = require('./app');
const { PORT } = require('./config/server');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




// src/config/db.js


const mongoose = require('mongoose');
const { MONGO_URI } = require('./server');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;



// userModel.js



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash the password before saving the user model
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare the entered password with the hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;



// authRoutes.js


const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register a new user
router.post('/register', register);

// Login an existing user
router.post('/login', login);

module.exports = router;
