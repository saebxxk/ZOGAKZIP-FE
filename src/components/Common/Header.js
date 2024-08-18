import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() { 
    return (
        <header className="header">
            <div>
                <Link to="/" className="logo">MyApp</Link>
            </div>
            <nav>
                <ul className="navList">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/private-group-list">Private Groups</Link></li>
                    <li><Link to="/create-group">Create Group</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;