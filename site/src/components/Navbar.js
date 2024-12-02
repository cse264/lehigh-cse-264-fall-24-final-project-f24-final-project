import React from 'react';
import './Navbar.css'; // Corresponding styles

function Navbar() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="nav-wrapper">
            <div className="container">
                <div className="nav">
                    <a href="#" className="logo">Pop<span className="main-color">Corn</span>Path</a>
                    <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Genre</a></li>
                        <li><a href="#">Movies</a></li>
                        <li><a href="#">Series</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className="hamburger"></div>
                        <div className="hamburger"></div>
                        <div className="hamburger"></div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Navbar;
