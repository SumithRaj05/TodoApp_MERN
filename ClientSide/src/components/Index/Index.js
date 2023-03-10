import React from "react";

import Navbar from "./Navbar/Navbar";
import './Index.css';

function Index() {
    return <React.Fragment>
        <Navbar />
        <div className="Center">
            <div className="IndexContainer">
                <div className="typewriter">
                   <h1 className="text"> Create your own todo list!!</h1>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Index;