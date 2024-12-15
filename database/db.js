//module to connect to the database
require('dotenv').config(); // set env variables from .env file for local development
const mongoose = require('mongoose'); // Why? interact with db using JS instead of mongo queries , and make schema for more predictable data
// auto connection pooling

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // special case handling
            useUnifiedTopology: true, // auto connection pooling, auto reconnecting
        });
        console.log('Connected to MongoDB');
    } catch ( err ) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}

module.exports = connectDB;