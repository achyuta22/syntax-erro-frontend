// App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./Components/player";
import SocketComponent from "./Components/SocketComponent";
import Login from "./Components/loginsignup";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define routes for your components */}
        <Routes>
          {/* Route for the Player component */}
          <Route path="/" element={<Player />} />
          
          {/* Route for the SocketComponent */}
          <Route path="/socket" element={<SocketComponent />} />
          
          {/* Route for the Login component */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
