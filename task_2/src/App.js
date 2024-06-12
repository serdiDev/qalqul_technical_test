import logo from './logo.svg';
import './App.css';
import TaskList from "./components/TaskList";

function App() {
  return (
      <div className="app-container">
          <h1>Task Management</h1>
          <TaskList />
      </div>
  );
}

export default App;
