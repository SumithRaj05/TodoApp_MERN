import React, { useState } from "react";

import './Add.css';

function Add(props) {
    const [Todo, setTodo] = useState('');
    const [date, setDate] = useState('');

    const TodoHandler = (e) => {
        setTodo(e.target.value);
    }

    const DateHandler = (e) => {
        setDate(e.target.value);
    }
    console.log(date)

    const Added = () => {
        props.AddNewTodo(Todo, date);
    }

    return (
        <div className='BgContainer'>
            <div className='AddBox'>
                <form onSubmit={Added}>
                    <h2>Add Task</h2>
                    <textarea className="Text"
                        rows="4"
                        cols="15"
                        maxLength='100'
                        value={Todo}
                        onChange={TodoHandler}
                        required />
                    <br />
                    <h2>Due Date</h2>
                    <input type='date' onChange={DateHandler} required />
                    <br />
                    <button className='CancelButton' onClick={props.Cancel}>Cancel</button>
                    <button className='AddButton' type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}

export default Add;