const WebSocket = require('ws');
const express = require('express');
const Skill = require('./models/Skill');
const cors = require('cors');
const connectDb = require('./database/db');
const setupWebSocket = require('./websocket/websocket');
const skillRoutes = require('./routes/skills');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Connect to MongoDB
connectDb();

// Routes
app.use('/api/skills', skillRoutes);

// Start the HTTP server
const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Setup WebSocket using the same http server created using express
setupWebSocket(httpServer);
