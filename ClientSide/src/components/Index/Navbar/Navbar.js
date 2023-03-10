import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {

    return (
        <nav className='navbar'>
            <center><div className='navHead'>Task Manager</div></center>
            <div className='navButtons'>
                <Link to="/Signup"><button className='SignUp'>SignUp</button></Link>
                <Link to="/Login"><button className='LogIn'>LogIn</button></Link>
            </div>
        </nav>
    )
}

export default Navbar;