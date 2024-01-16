import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ArtistsList from "./views/ArtistsList";
import CreateArtist from "./components/Artist/CreateArtist";

import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">MERN Stack CRUD</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Artists</Link>
              </li>
              <li className="navbar-item">
                <Link to="/add" className="nav-link">Create Artist</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <Routes>
          <Route path="/" element={<ArtistsList />} />
          <Route path="/add" element={<CreateArtist />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
