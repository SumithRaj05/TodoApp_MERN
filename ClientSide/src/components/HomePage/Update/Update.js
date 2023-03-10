import React from "react";

function Update(props){

    const DoneHandler = () => {
        //update code

        props.updateClickHandler();
    }

    return <div className="BgContainer">
        <div className="UpdateHandler">
            <textarea></textarea>
            <button onClick={props.updateClickHandler}>Cancel</button>
            <button onClick={DoneHandler}>Done</button>
        </div>
    </div>
}

export default Update;