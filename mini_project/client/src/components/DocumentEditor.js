import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { updateDocumentContent } from '../data/actions/documentAction';
import {api} from "../config/api";

const socket = io(api);

const DocumentEditor = () => {
    const dispatch = useDispatch();
    const { currentDocument, error } = useSelector(state => state.documentState);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (currentDocument) {
            setContent(currentDocument.content);
            socket.emit('joinDocument', currentDocument.id);
        }
    }, [currentDocument]);

    useEffect(() => {
        socket.on('documentUpdated', (newContent) => {
            setContent(newContent);
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

    if (!currentDocument) {
        return <p>Please select a document to edit</p>;
    }

    return (
        <div>
            <h2>Editing: {currentDocument.title}</h2>
            <textarea value={content} onChange={handleContentChange} rows="10" cols="50" />
            {error && <p>{error.message}</p>} {/* Convert error object to string */}
        </div>
    );
};

export default DocumentEditor;
