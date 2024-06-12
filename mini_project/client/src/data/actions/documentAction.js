import { FETCH_DOCUMENTS_REQUEST, FETCH_DOCUMENTS_SUCCESS, FETCH_DOCUMENTS_FAILURE, ADD_DOCUMENT, UPDATE_DOCUMENT_TITLE, DELETE_DOCUMENT, SET_CURRENT_DOCUMENT, UPDATE_DOCUMENT_CONTENT } from './types/documentTypes';
import {api} from "../../config/api";

export const fetchDocuments = () => async (dispatch) => {
    dispatch({ type: FETCH_DOCUMENTS_REQUEST });
    try {
        const response = await fetch(`${api}/api/documents`);
        const documents = await response.json();
        dispatch({ type: FETCH_DOCUMENTS_SUCCESS, payload: documents });
    } catch (error) {
        dispatch({ type: FETCH_DOCUMENTS_FAILURE, error: error.toString() });
    }
};

export const addDocument = (title) => ({
    type: ADD_DOCUMENT,
    payload: { title }
});

export const updateDocumentTitle = (docId, title) => ({
    type: UPDATE_DOCUMENT_TITLE,
    payload: { docId, title }
});

export const deleteDocument = (docId) => ({
    type: DELETE_DOCUMENT,
    payload: { docId }
});

export const setCurrentDocument = (document) => ({
    type: SET_CURRENT_DOCUMENT,
    payload: document
});

export const updateDocumentContent = (docId, content) => ({
    type: UPDATE_DOCUMENT_CONTENT,
    payload: { docId, content }
});