//module to handle websocket connections
const WebSocket = require('ws');

// Why websocket instead of REST?
// Have a full duplex connection for client and server
// Let server push data to client without client requesting it
// When ever connection happens we can broadcast the updated visitor count to all connected clients without client requesting it
// no need for polling by the server
let visitorCount = 0;

const setupWebSocket = (httpServer) => {
    const server = new WebSocket.Server({server: httpServer});

    server.on('connection', (ws) => {
        visitorCount++;
        console.log('Client connected. Total visitors:', visitorCount);

        //Broadcast the updated visitor count to all connected clients
        server.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({type: 'visitorCount', count: visitorCount}));
            }
        });

        //Handle client disconnection
        ws.on('close', () => {
            visitorCount--;
            console.log('Client disconnected. Total visitors:', visitorCount);

            //Broadcast the updated visitor count to all the connected clients
            server.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({type: 'visitorCount', count: visitorCount}));
                }
            })
        })
    })
};

module.exports = setupWebSocket;