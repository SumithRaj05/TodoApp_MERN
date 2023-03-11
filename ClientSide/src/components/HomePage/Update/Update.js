import React, { useState } from "react";

import './Update.css';
function Update(props) {
    const noteData = props.Data;

    
    const [note, setNote] = useState(noteData.Note);
    const [done, setDone] = useState(noteData.isCompleted);
    
    const noteHandler = (e) => {
        setNote(e.target.value);
    }
    
    const doneHandler = (e) => {
        setDone(e.target.value);
    }
    
    const SaveHandler = () => {
        props.updateTodo(done, note, noteData._id);
        props.updateClickHandler();
    }

    return <div className="BgContainer">
        <div className="UpdateBox">
            <label className="update-label">* Is completed:</label>
            <br />
            <select
                className="isdone-dropdown"
                name="completed"
                value={done}
                onChange={doneHandler}>
                <option value={'true'}>True</option>
                <option value={'false'}>False</option>
            </select>
            <br />
            <label className="update-label">* Note:</label>
            <br />
            <textarea className="Text"
                rows="4"
                cols="15"
                maxLength='100'
                value={note}
                onChange={noteHandler}
            />
            <br />
            <button onClick={props.updateClickHandler} className="CancelButton">Cancel</button>
            <button onClick={SaveHandler} className="AddButton">Save</button>
        </div>
    </div>
}

export default Update;