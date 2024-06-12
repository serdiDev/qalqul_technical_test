import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocuments, setCurrentDocument } from '../data/actions/documentAction';

const DocumentList = () => {
    const dispatch = useDispatch();
    const { documents, loading, error } = useSelector(state => state.documentState);

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    return (
        <div>
            <h2>Document List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>} {/* Convert error object to string */}
            <ul>
                {documents.map(doc => (
                    <li key={doc.id} onClick={() => dispatch(setCurrentDocument(doc))}>
                        {doc.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;
