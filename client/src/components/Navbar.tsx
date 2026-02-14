import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to={ROUTES.HOME}>FAV CINE</Link>
            </div>
            <div className="nav-links">
                <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    Search
                </NavLink>
                <NavLink
                    to={ROUTES.FAVORITES}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    Favorites
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
