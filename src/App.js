import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <h1>Client Panel</h1>
        </div>
      </div>
    </Router>
  );
}

export default App;
