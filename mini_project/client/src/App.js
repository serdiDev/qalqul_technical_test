
import './App.css';
import {Provider} from "react-redux";
import store from "./data/store";
import DocumentList from "./components/DocumentList";
import DocumentEditor from "./components/DocumentEditor";
import {UsernameProvider, useUsername} from "./provider/UsernameContext";
import {useEffect, useState} from "react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
      <UsernameProvider>
          <Provider store={store}>
            <Main />
          </Provider>
      </UsernameProvider>
  );
};

const Main = () => {
    const { username, setUsername } = useUsername();
    const [isPrompted, setIsPrompted] = useState(false);

    useEffect(() => {
        if (!isPrompted) {
            const user = prompt('Please enter your username:');
            if (user) {
                setUsername(user);
            }
            setIsPrompted(true);
        }
    }, [isPrompted, setUsername]);

    return (
        <>
            {username ? (
                    <div className="app-container">
                        <Navbar />
                        <div className="content">
                            <DocumentList />
                            <DocumentEditor />
                        </div>
                    </div>

            ) : (
                <p className="no-user">Please enter your username to start.</p>
            )}
        </>
    );
};

export default App;
