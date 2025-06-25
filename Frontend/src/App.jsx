import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import UserOrdersPage from './pages/UserOrdersPage.jsx';
import CreateOrderPage from './pages/CreateOrderPage.jsx';
import './App.css';

function TermsPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Terms and Conditions</h2>
      <p>Here are the terms and conditions...</p>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Privacy Policy</h2>
      <p>Here is the privacy policy...</p>
    </div>
  );
}

function SearchModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ id: '' });
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({ id: '' });
    onClose();
  };

  const handleSearch = () => {
    if (!formData.id.trim()) {
      alert('Please enter an ID');
      return;
    }
    onClose();
    navigate(`/orders/read-orders/${formData.id}`);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Search by User ID</h3>
          <button className="close-button" onClick={resetForm}>✖</button>
        </div>

        <input
          type="text"
          placeholder="ID Number"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />

        <div className="modal-buttons">
          <button className="clear-button" onClick={resetForm}>Clear</button>
          <button className="submit-button" onClick={handleSearch}>Submit</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>SkyFlights</h1>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="#" onClick={openSearchModal} className="nav-link">My Orders</Link>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-order" element={<CreateOrderPage />} />
            <Route path="/orders/read-orders/:userId" element={<UserOrdersPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 SkyFlights. All rights reserved.</p>
          <div>
            <Link to="/terms">Terms</Link> | <Link to="/privacy">Privacy</Link>
          </div>
        </footer>

        <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
      </div>
    </Router>
  );
}

export default App;
