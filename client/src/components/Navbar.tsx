import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">FAV CINE</Link>
            </div>
            <div className="nav-links">
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    Search
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    Favorites
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
