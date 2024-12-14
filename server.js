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
});

// Route to get all skills
app.get('/api/skills', async (req, res) => {
  const skills = await Skill.find();
  console.log('GET /api/skills', skills);
  res.json(skills);
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