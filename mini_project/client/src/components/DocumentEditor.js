import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {fetchDocuments, updateDocumentContent, updateDocumentTitle} from '../data/actions/documentAction';
import {api} from "../config/api";
import {useUsername} from "../provider/UsernameContext";

const socket = io(api);

const DocumentEditor = () => {
    const dispatch = useDispatch();
    const { currentDocument, error } = useSelector(state => state.documentState);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { username } = useUsername();

    useEffect(() => {
        if (currentDocument && username) {
            setContent(currentDocument.content);
            setTitle(currentDocument.title);
            socket.emit('joinDocument', currentDocument.id, username);

            return () => {
                socket.emit('leaveDocument', currentDocument.id);
            };
        }
    }, [currentDocument, username]);

    useEffect(() => {
        socket.on('documentUpdated', (newContent) => {
            setContent(newContent);
        });

        socket.on('documentTitleUpdated', ({docId, newTitle}) => {
            setTitle(newTitle);
            dispatch(fetchDocuments())
        });

        socket.on('onlineUsers', (users) => {
            console.log('Online users received:', users);
            setOnlineUsers(users);
        });

        return () => {
            socket.off('documentUpdated');
            socket.off('onlineUsers');
        };
    }, []);

    const handleContentChange = (e) => {
        setContent(e.target.value);
        if (currentDocument) {
            socket.emit('updateDocument', { docId: currentDocument.id, content: e.target.value });
            dispatch(updateDocumentContent(currentDocument.id, e.target.value));
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTitleUpdate = () => {
        if (currentDocument && title.trim()) {
            socket.emit('updateDocumentTitle', { docId: currentDocument.id, newTitle: title });
            dispatch(updateDocumentTitle(currentDocument.id, title));
        }
    };

    if (!currentDocument) {
        return <p className="document-editor">Please select a document to edit</p>;
    }

    return (
        <div className="document-editor">
            <h2>Editing: {currentDocument.title}</h2>
            <div className="input-container">
                <input type="text" value={title} onChange={handleTitleChange} />
                <button onClick={handleTitleUpdate}>Update Title</button>
            </div>
            <textarea value={content} onChange={handleContentChange} rows="10" cols="50" />
            {error && <p>{error.message}</p>}
            <div>
                <h3>Users currently editing the document:</h3>
                <ul style={{ textAlign: 'left', color: "green", fontWeight: "bold" }}>
                    {onlineUsers.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DocumentEditor;
