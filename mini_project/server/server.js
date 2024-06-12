const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

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

let documents = [
    { id: 1, title: 'Document 1', content: '' },
    { id: 2, title: 'Document 2', content: '' },
];

app.get('/api/documents', (req, res) => {
    res.json(documents);
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinDocument', (docId) => {
        socket.join(docId);
    });

    socket.on('updateDocument', ({ docId, content }) => {
        const document = documents.find(doc => doc.id === docId);
        if (document) {
            document.content = content;
            io.to(docId).emit('documentUpdated', content);
        }
    });

    // Add a new document
    socket.on('addDocument', ({ title }) => {
        const newDocument = {
            id: documents.length + 1,
            title: title,
            content: ''
        };
        documents.push(newDocument);
        io.emit('documentAdded', newDocument);
    });

    // Update the title of a document
    socket.on('updateDocumentTitle', ({ docId, newTitle }) => {
        const document = documents.find(doc => doc.id === docId);
        if (document) {
            document.title = newTitle;
            io.emit('documentTitleUpdated', { docId, newTitle });
        }
    });

    // Delete a document
    socket.on('deleteDocument', ({ docId }) => {
        documents = documents.filter(doc => doc.id !== docId);
        io.emit('documentDeleted', docId);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
