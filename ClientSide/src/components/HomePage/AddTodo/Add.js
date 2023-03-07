import React, { useState } from "react";

import './Add.css';

function Add(props){
    const [Todo, setTodo] = useState('');

    const TodoHandler = (e) => {
        setTodo(e.target.value);
    }

    const Added = () => {
        props.AddNewTodo(Todo);
    }

    return(
        <div className='BgContainer'>
            <div className='AddBox'>
                <h1>Add Task</h1>
                <textarea className="Text" 
                            rows="4" 
                            cols="15" 
                            maxLength='100'
                            value = {Todo}
                            onChange={TodoHandler} 
                            required />
                <br/>
                <button className='CancelButton' onClick={props.Cancel}>Cancel</button>
                <button className='AddButton' onClick={Added}>Add</button>
            </div>
        </div>
    )
}

export default Add;