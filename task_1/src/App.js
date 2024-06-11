import './App.css';
import UserDetails from "./components/userDetails";

const App = () => {
  return (
      <div className="app-container">
          <h1>User Information</h1>
          <UserDetails userId={1} />
      </div>
  );
};

export default App;
