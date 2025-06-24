import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CreateOrderPage from './pages/CreateOrderPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>SkyFlights</h1>
          <nav className="nav-links">
            {/* מומלץ להשתמש ב־Link של react-router-dom */}
            <Link to="/">Home</Link>
            <Link to="/my-orders">My Orders</Link>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* הוסף פה את הנתיב ל-CreateOrderPage */}
            <Route path="/create-order" element={<CreateOrderPage />} />
            {/* אם תרצה להוסיף עוד דפים */}
            {/* <Route path="/flights" element={<FlightsPage />} /> */}
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 SkyFlights. All rights reserved.</p>
          <div>
            <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
