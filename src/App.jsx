// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>User Management Application</h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
