import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import store from "./data/store";
import DocumentList from "./components/DocumentList";
import DocumentEditor from "./components/DocumentEditor";

const App = () => {
  return (
      <Provider store={store}>
        <div className="app-container">
          <h1>Real-Time Collaborative Document Editing</h1>
          <div className="content">
            <DocumentList />
            <DocumentEditor />
          </div>
        </div>
      </Provider>
  );
};

export default App;
