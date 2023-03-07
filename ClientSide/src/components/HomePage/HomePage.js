import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import URL from '../../auth/Url';

import Add from './AddTodo/Add';
import './HomePage.css';

function HomePage() {
    const auth = useContext(AuthContext);
    const url = `${URL}/${auth.user}`;

    const [AddScreen, setAddScreen] = useState(false);

    const [TodoList, setTodoList] = useState([]);

    const AddHandler = () => {
        setAddScreen(!AddScreen);
    }

    const GetTodoList = () => {
        fetch(url).then(res => res.json().then((data) => {
            setTodoList(data.Task);
        }))
    }

    useEffect(GetTodoList);

    const AddTodoHandler = async (e) => {
        if (e.trim() === '') {
            return setAddScreen(!AddScreen);
        }

        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: auth.user,
                text: e.trim()
            })
        }).then(res => res.json().then(() => {
            GetTodoList();
        })).catch(err => console.log(err));

        setAddScreen(!AddScreen);
    }

    const DeleteHandler = async (ele) => {
        await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: auth.user,
                element: ele
            })
        }).then(res => res.json().then(() => {
            GetTodoList();
        })).catch(err => console.log(err))

    }

    return <React.Fragment>
        <center><p className='heading'>Tasks List of {auth.username}</p></center>
        <div className='Center'>

            <div className='TodoContainer'>
                {(TodoList.length !== 0) ?
                    TodoList.map((ele, index) => {
                        return <p className='todo' key={index}>
                            <input type='checkbox'
                                className='isDone'
                            />
                            <em className='todoText' style={{}}>{ele}</em>
                            <button className='delete' onClick={() => DeleteHandler(ele)}>X</button>
                        </p>
                    })
                    :
                    <p className='todo'> There are no Task, u are so useless :( </p>
                }

                {
                    AddScreen ?
                        <Add Cancel={AddHandler} AddNewTodo={AddTodoHandler} />
                        :
                        <button className='AddTodo' onClick={AddHandler}>+</button>
                }


            </div>
        </div>
    </React.Fragment>
}

export default HomePage;