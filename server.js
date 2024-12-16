const express = require('express');
const cors = require('cors');
const connectDb = require('./database/db');
const setupWebSocket = require('./websocket/websocket');
const skillRoutes = require('./routes/skills');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Middleware to handle sessions
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

// Middleware to initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDb();

// Routes
app.use('/api/skills', skillRoutes);
app.use('/api/auth', authRoutes);

// Start the HTTP server
const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Setup WebSocket using the same http server created using express
setupWebSocket(httpServer);

module.exports = app; // export app for testing
