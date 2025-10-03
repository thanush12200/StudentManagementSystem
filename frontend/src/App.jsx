import { Routes, Route } from "react-router-dom";
import "./App.css";
import Table from "./components/Table";
import CreateStudent from "./components/CreateStudent";
function App() {
  return (
    <Routes>
      <Route
        path="/students"
        element={
          <div className="app-container">
            <Table />
          </div>
        }
      />
      <Route
       path="/create-student"
       element = {
        <div className="app-container">
        <CreateStudent />
          </div>
       }
       />
    </Routes>
  );
}
export default App;