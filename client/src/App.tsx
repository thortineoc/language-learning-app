import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./Routers/MainRouter";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <MainRouter />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
