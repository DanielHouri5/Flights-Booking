import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import './App.css';

function SearchDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [formData, setFormData] = useState({ id: '', email: '', flightNumber: '' });
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const openModal = (type) => {
    setSearchType(type);
    setShowModal(true);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    setShowModal(false);
    if (searchType === 'id') {
      navigate(`/search-id?Id=${formData.id}&email=${formData.email}`);
    } else {
      navigate(`/search-flight-number?flight=${formData.flightNumber}`);
    }
  };

  const resetForm = () => {
    setFormData({ id: '', email: '', flightNumber: '' });
    setShowModal(false);
  };


  return (
    <div className="dropdown-wrapper">
      <button className="dropdown-button" onClick={toggleDropdown}>Search Order ▼</button>
      <Link to="/" className="home-button">Home</Link>

      {showDropdown && (
        <div className="dropdown-popup">
          <button onClick={() => openModal('id')}>Search by ID and Email</button>
          <button onClick={() => openModal('flight')}>Search by Flight Number</button>
        </div>
      )}

      {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h3>{searchType === 'id' ? 'Search by ID and Email' : 'Search by Flight Number'}</h3>
        <button className="close-button" onClick={resetForm}>✖</button>
      </div>

      {searchType === 'id' ? (
        <>
          <input
            type="text"
            placeholder="ID Number"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </>
      ) : (
        <input
          type="text"
          placeholder="Flight Number"
          value={formData.flightNumber}
          onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
        />
      )}

      <div className="modal-buttons">
        <button className="clear-button" onClick={resetForm}>Clear</button>
        <button className="submit-button" onClick={handleSearch}>Submit</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>SkyFlights</h1>
          <nav className="nav-links">
            <SearchDropdown />
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-id" element={<div>Search result by ID and Email</div>} />
            <Route path="/search-flight-number" element={<div>Search result by Flight Number</div>} />
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
