import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/icons/logo.svg';

function Header() { 
    const location = useLocation();
    const showCreateGroupButton = location.pathname === '/' || location.pathname === '/private-group-list';

    return (
       <header className='header'>
            <div className='header-content'>
                <Link to='/'>
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                {showCreateGroupButton && (
                    <Link to="/create-group" className="create-group-button-link">
                        <button className="create-group-button">
                            그룹 만들기
                        </button>
                    </Link>
                )}
            </div>
       </header>
    );
}

export default Header;
