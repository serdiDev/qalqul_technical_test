const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { handleSockets } = require('./service/socket');
const routes = require('./routes/document');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // React frontend
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

app.use('/api', routes);

io.on('connection', (socket) => {
    handleSockets(io, socket);
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
