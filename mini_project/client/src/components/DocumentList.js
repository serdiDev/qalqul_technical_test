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
        <div className="document-list">
            <h2 style={{ textAlign: 'center' }}>Documents</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <div className="input-container">
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New Document Title"
                />
                <button onClick={handleAddDocument}>Add Document</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {documents.map(doc => (
                    <tr key={doc.id}>
                        <td><span onClick={() => dispatch(setCurrentDocument(doc))}>{doc.title}</span></td>
                        <td style={{textAlign: "right"}}>
                            <button style={{backgroundColor: "#b70404"}} onClick={() => handleDeleteDocument(doc.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentList;
