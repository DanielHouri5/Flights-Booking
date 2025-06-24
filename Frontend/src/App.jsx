import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import OrderSearchResultsPage from './pages/OrderSearchResultsPage.jsx';
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

function SearchDropdown({ isOpen, onClose }) {
  const [showModal, setShowModal] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [formData, setFormData] = useState({ id: ''});
  const navigate = useNavigate();

  const openModal = (type) => {
    setSearchType(type);
    setShowModal(true);
    onClose();  // סוגר את הדרופדאון כשפותחים מודאל
  };

  const resetForm = () => {
    setFormData({ id: ''});
    setShowModal(false);
  };

  const handleSearch = () => {
    if (!formData.id.trim()) {
      alert('Please enter an ID');
      return;
    }
    setShowModal(false);
    if (searchType === 'id') {
      navigate(`/orders/read-orders/${formData.id}`);
    }
  };

  return (
    <div className="dropdown-wrapper">
      {/* אפשר להוסיף כפתור לשליטה פנימית אם תרצה */}
      {/* <button className="dropdown-button" onClick={isOpen ? onClose : () => {}}>Search Order ▼</button> */}

      {isOpen && (
        <div className="dropdown-popup">
          <button onClick={() => openModal('id')}>Search by User ID</button>
          <button onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{searchType === 'id' ? 'Search by User ID' : ''}</h3>
              <button className="close-button" onClick={resetForm}>✖</button>
            </div>

            {searchType === 'id' && (
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const openDropdown = () => setDropdownOpen(true);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>SkyFlights</h1>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            {/* כפתור שמפתח את דרופדאון החיפוש */}
            <button onClick={openDropdown} className="nav-link link-button">My Orders</button>

            {/* דרופדאון חיפוש */}
            <SearchDropdown
              isOpen={dropdownOpen}
              onClose={closeDropdown}
            />
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-order" element={<CreateOrderPage />} />
            <Route path="/orders/read-orders/:userId" element={<OrderSearchResultsPage />} />
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
      </div>
    </Router>
  );
}

export default App;
