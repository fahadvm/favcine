import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h1>F-Movie</h1>
            </div>
            <div className="nav-links">
                <Link to="/">Search</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
        </nav>
    );
};

export default Navbar;
