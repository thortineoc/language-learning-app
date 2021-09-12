import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./shared/MainRouter";
import Navbar from "./shared/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <MainRouter />
      </Router>
    </div>
  );
}

export default App;
