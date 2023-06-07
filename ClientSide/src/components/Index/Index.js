import React from "react";

import Navbar from "./Navbar/Navbar";
import './Index.css';

function Index() {

    return <React.Fragment>
        <Navbar />
        <div className="HeaderSet">
            <div className="ImageContainer"></div>
            <h1 className="HomeHeader">
                Welcome to SR Task Manager!
            </h1>
        </div>

        <div className="HomeContent">
            Stay organized, boost productivity, and
            manage your tasks with ease using our
            user-friendly Task Manager. With our intuitive
            interface and powerful features, you can take
            control of your daily responsibilities and
            accomplish your goals efficiently.
            <br /><br />
            Start managing your tasks efficiently and unlock
            your full potential with our User-based Task Manager.
            Sign up now and experience the convenience and
            productivity it brings to your life!
            <br /><br />
            Remember, with our Task Manager, your tasks
            are just a few clicks away from completion.
            Let's turn your to-do list into a "done" list!
        </div>
    </React.Fragment>
}

export default Index;