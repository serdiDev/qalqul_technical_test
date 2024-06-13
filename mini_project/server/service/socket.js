

let { documents, onlineUsers } = require('../data/store');

const handleSockets = (io, socket) => {
    console.log('New client connected');

    socket.on('joinDocument', (docId, username) => {
        socket.join(docId);
        if (!onlineUsers[docId]) {
            onlineUsers[docId] = [];
        }
        onlineUsers[docId].push({ socketId: socket.id, username });
        io.to(docId).emit('onlineUsers', onlineUsers[docId].map(user => user.username));
    });

    socket.on('leaveDocument', (docId) => {
        socket.leave(docId);
        if (onlineUsers[docId]) {
            onlineUsers[docId] = onlineUsers[docId].filter(user => user.socketId !== socket.id);
            io.to(docId).emit('onlineUsers', onlineUsers[docId].map(user => user.username));
        }
    });

    socket.on('updateDocument', ({ docId, content }) => {
        const document = documents.find(doc => doc.id === docId);
        if (document) {
            document.content = content;
            io.to(docId).emit('documentUpdated', content);
        }
    });

    socket.on('addDocument', ({ title }) => {
        const newDocument = {
            id: documents.length + 1,
            title: title,
            content: ''
        };
        documents.push(newDocument);
        io.emit('documentAdded', newDocument);
    });

    socket.on('updateDocumentTitle', ({ docId, newTitle }) => {
        const document = documents.find(doc => doc.id === docId);
        if (document) {
            document.title = newTitle;
            io.emit('documentTitleUpdated', { docId, newTitle });
        }
    });

    socket.on('deleteDocument', (docId) => {
        documents = documents.filter(doc => doc.id !== docId);
        delete onlineUsers[docId];
        io.emit('documentDeleted', docId);
    });

    socket.on('disconnect', () => {
        for (let docId in onlineUsers) {
            onlineUsers[docId] = onlineUsers[docId].filter(user => user.socketId !== socket.id);
            io.to(docId).emit('onlineUsers', onlineUsers[docId].map(user => user.username));
        }
        console.log('Client disconnected');
    });
};

module.exports = { handleSockets };
