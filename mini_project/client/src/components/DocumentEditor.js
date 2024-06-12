import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {fetchDocuments, updateDocumentContent, updateDocumentTitle} from '../data/actions/documentAction';
import {api} from "../config/api";

const socket = io(api);

const DocumentEditor = () => {
    const dispatch = useDispatch();
    const { currentDocument, error } = useSelector(state => state.documentState);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (currentDocument) {
            setContent(currentDocument.content);
            setTitle(currentDocument.title);
            socket.emit('joinDocument', currentDocument.id);
        }
    }, [currentDocument]);

    useEffect(() => {
        socket.on('documentUpdated', (newContent) => {
            setContent(newContent);
        });

        socket.on('documentTitleUpdated', ({docId, newTitle}) => {
            setTitle(newTitle);
            dispatch(fetchDocuments())
        });

        return () => {
            socket.off('documentUpdated');
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
        return <p>Please select a document to edit</p>;
    }

    return (
        <div>
            <h2>Editing: {currentDocument.title}</h2>
            <div>
                <input type="text" value={title} onChange={handleTitleChange} />
                <button onClick={handleTitleUpdate}>Update Title</button>
            </div>
            <textarea value={content} onChange={handleContentChange} rows="10" cols="50" />
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default DocumentEditor;
