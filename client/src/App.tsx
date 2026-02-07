import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './pages/Home.js';
import Favorites from './pages/Favorites.js';
import './index.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
