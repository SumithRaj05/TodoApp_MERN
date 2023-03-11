import React, { useEffect, useState } from "react";

import './Update.css';
function Update(props) {
    const noteData = props.Data;

    const [note, setNote] = useState(noteData.Note);
    const [done, setDone] = useState(noteData.isCompleted);
    const [DueDate, setDueDate] = useState(noteData.DueDate);
    const [remainingDay, setRemainingDay] = useState('');

    useEffect(() => {
        // calculate remaining days
        // given in formatt yyyy-mm-dd
        let today = new Date();
        let year = today.getFullYear()
        let month = today.getMonth() + 1
        let day = today.getDate()

        let given = new Date(DueDate);
        let givenYear = given.getFullYear();
        let givenMonth = given.getMonth() + 1;
        let givenDay = given.getDate();

        let Ryear = givenYear - year;
        let Rmonth = givenMonth - month;
        let Rday = givenDay - day;

        if (Ryear === 0 && Rmonth === 0) {
            setRemainingDay(`${Rday} Day remaining.`)
        } else if (Ryear === 0) {
            setRemainingDay(`${Rmonth} Month & ${Rday} Day remaining.`)
        } else {
            setRemainingDay(`${Ryear} Year, ${Rmonth} Month & ${Rday} Day remaining.`)
        }

    }, [DueDate])
    console.log(remainingDay)

    const noteHandler = (e) => {
        setNote(e.target.value);
    }

    const doneHandler = (e) => {
        setDone(e.target.value);
    }

    const duedateHandler = (e) => {
        setDueDate(e.target.value);
    }

    const SaveHandler = () => {
        props.updateTodo(done, note, noteData._id, DueDate);
        props.updateClickHandler();
    }

    return <div className="BgContainer">
        <div className="UpdateBox">
            <p className="update-remaining">* {remainingDay} *</p>
            <form onSubmit={SaveHandler}>
                <label className="update-label">Is completed:</label>
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
                <label className="update-label">Due Date:</label>
                <br />
                <input type='date' value={DueDate} onChange={duedateHandler} required />
                <br />
                <label className="update-label">Note:</label>
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
                <button type='submit' className="AddButton">Save</button>
            </form>
        </div>
    </div>
}

export default Update;