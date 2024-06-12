import { combineReducers } from 'redux';
import {
    FETCH_DOCUMENTS_REQUEST,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_DOCUMENTS_FAILURE,
    SET_CURRENT_DOCUMENT,
    UPDATE_DOCUMENT_CONTENT, ADD_DOCUMENT, UPDATE_DOCUMENT_TITLE, DELETE_DOCUMENT
} from '../actions/types/documentTypes';

const initialState = {
    documents: [],
    loading: false,
    error: null,
    currentDocument: null
};

const documentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DOCUMENTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_DOCUMENTS_SUCCESS:
            return { ...state, loading: false, documents: action.payload };
        case FETCH_DOCUMENTS_FAILURE:
            return { ...state, loading: false, error: action.error };
        case SET_CURRENT_DOCUMENT:
            return { ...state, currentDocument: action.payload };
        case UPDATE_DOCUMENT_CONTENT:
            return {
                ...state,
                documents: state.documents.map(doc =>
                    doc.id === action.payload.docId ? { ...doc, content: action.payload.content } : doc
                )
            };
        case ADD_DOCUMENT:
            return {
                ...state,
                documents: [...state.documents, action.payload]
            };
        case UPDATE_DOCUMENT_TITLE:
            return {
                ...state,
                documents: state.documents.map(doc =>
                    doc.id === action.payload.docId ? { ...doc, title: action.payload.title } : doc
                )
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                documents: state.documents.filter(doc => doc.id !== action.payload.docId)
            };
        default:
            return state;
    }
};

export default combineReducers({
    documentState: documentReducer
});
