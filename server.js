const WebSocket = require('ws');
const express = require('express');
const mongoose = require('mongoose');
const Skill = require('./models/Skill');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
   // Log database and collection names
   const db = mongoose.connection.db;
   const collections = await db.listCollections().toArray();
   console.log('Database:', db.databaseName);
   console.log('Collections:', collections.map(col => col.name));
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Route to get all skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    console.log('GET /api/skills', skills);
    res.json(skills);
  } catch (err) {
    console.error('Error fetching skills:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start the HTTP server
const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const server = new WebSocket.Server({ server: httpServer });
let visitorCount = 0;

server.on('connection', (ws) => {
  visitorCount++;
  console.log('Client connected. Total visitors:', visitorCount);

  // Broadcast the updated visitor count to all connected clients
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'visitorCount', count: visitorCount }));
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    visitorCount--;
    console.log('Client disconnected. Total visitors:', visitorCount);

    // Broadcast the updated visitor count to all connected clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'visitorCount', count: visitorCount }));
      }
    });
  });
});