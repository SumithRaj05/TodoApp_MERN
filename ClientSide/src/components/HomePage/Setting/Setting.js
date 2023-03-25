import React from "react";

import './Setting.css';
import { useNavigate } from 'react-router-dom';

function Setting(props) {

    // Logout Handler
    const navigate = useNavigate();
    const LogoutHandler = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        navigate('/');
    }

    return <div className="BgContainer">
        <div className="settingBox">
            <button className="setting-cancel" onClick={props.settingClickHandler}>x</button>
            <center><h2 className="setting-title">Settings</h2></center>
            <button className="setting-btn" onClick={LogoutHandler}>LogOut</button>
        </div>
    </div>
}

export default Setting;