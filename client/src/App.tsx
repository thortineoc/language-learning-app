import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./shared/MainRouter";

function App() {
  return (
    <div className="App">
      <Router>
        <MainRouter />
      </Router>
    </div>
  );
}

export default App;
