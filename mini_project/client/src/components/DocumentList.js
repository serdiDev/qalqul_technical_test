import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocuments, setCurrentDocument, addDocument, deleteDocument } from '../data/actions/documentAction';
import io from "socket.io-client";
import {api} from "../config/api";

const socket = io(api);

const DocumentList = () => {
    const dispatch = useDispatch();
    const { documents, loading, error } = useSelector(state => state.documentState);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    useEffect(() => {
        socket.on('documentAdded' || 'documentDeleted' , (newContent) => {
            dispatch(fetchDocuments())
        });

        socket.on('documentDeleted' , (newContent) => {
            dispatch(fetchDocuments())
        });

        return () => {
            socket.off('documentAdded');
            socket.off('documentDeleted');
        };
    }, []);

    const handleAddDocument = () => {
        if (newTitle.trim()) {
            socket.emit('addDocument', { title: newTitle });
            dispatch(addDocument(newTitle));
            setNewTitle('');
        }
    };

    const handleDeleteDocument = (id) => {
        socket.emit('deleteDocument', { docId: id });
        dispatch(deleteDocument(id))
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Document List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <ul>
                {documents.map(doc => (
                    <li key={doc.id}>
                        <span onClick={() => dispatch(setCurrentDocument(doc))}>{doc.title}</span>
                        <button onClick={() => handleDeleteDocument(doc.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New Document Title"
                />
                <button onClick={handleAddDocument}>Add Document</button>
            </div>
        </div>
    );
};

export default DocumentList;
