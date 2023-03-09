import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {

    return (
        <nav className='navbar'>
            <div className='navHead'>Task Manager</div>
            <Link to="/Login"><button className='LogIn'>LogIn</button></Link>
            <Link to="/Signup"><button className='SignUp'>SignUp</button></Link>

        </nav>
    )
}

export default Navbar;