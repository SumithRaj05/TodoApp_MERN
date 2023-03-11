import React, { useEffect, useState } from "react";

import './Motivation.css'

function Motivation() {

    const [Lines, setLines] = useState('...')

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setLines(data[parseInt(1500 * Math.random())].text)
            }).catch(err => console.log(err));
    }, [])

    return <center>
        <div className="motivation-box">
            <p className="motivation-text">" {Lines} "</p>
        </div>
    </center>
}

export default Motivation;