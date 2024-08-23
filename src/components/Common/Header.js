import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/icons/logo.svg';

function Header() { 
    console.log('Header is rendering');
    return (
       <header className='header'>
        <br />
        <Link to='/' >
        <img src={logo} alt="logo" className="logo" />
        </Link>
        <br />
       </header>
        
    );
}

export default Header;