import React, { useCallback, useEffect, useState } from 'react';

import URL from '../../auth/Url';
import { IsLoggedoutHandler } from '../../auth/AuthContext';
import Loading from '../Loading/Loading'
import Add from './AddTodo/Add';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const user = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    const url = `${URL}/${user}`;
    const [AddScreen, setAddScreen] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [TodoList, setTodoList] = useState([]);

    const AddHandler = () => {
        setAddScreen(!AddScreen);
    }

    const navigate = useNavigate();
    const LogoutHandler = () => {
        IsLoggedoutHandler();
        navigate('/');
    }

    // todo get request
    const GetTodoList = useCallback(() => {
        fetch(url).then(res => res.json().then((data) => {
            setTodoList(data.Task)
            console.log("updated todos")
        }))
    }, [url])

    useEffect(() => {
        GetTodoList();
    }, [GetTodoList]);

    // todo add request
    const AddTodoHandler = async (e) => {
        if (e.trim() === '') {
            return setAddScreen(!AddScreen);
        }
        setAddScreen(!AddScreen);
        setIsLoading(true);

        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user,
                text: e.trim()
            })
        }).then(res => res.json().then(() => {
            GetTodoList();
        })).catch(err => console.log(err));

        setIsLoading(false);
    }

    // todo delete request
    const DeleteHandler = async (ele) => {
        setIsLoading(true)
        await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user,
                element: ele
            })
        }).then(res => res.json().then(() => {
            GetTodoList();
        })).catch(err => console.log(err))
        setIsLoading(false)
    }

    return <React.Fragment>
        <nav className="navbar">
            <div className="heading">Tasks List of {username}</div>
            <button className="LogIn" onClick={ LogoutHandler }>Logout</button>
        </nav>


        <div className='Center'>

            <div className='TodoContainer'>
                {(!IsLoading) ?
                    (TodoList.length !== 0) ?
                        TodoList.map((ele, index) => {
                            return <div className='todo' key={index}>
                                <input type='checkbox'
                                    className='isDone'
                                />
                                <em className='todoText' style={{}}>{ele}</em>
                                <button className='delete' onClick={() => DeleteHandler(ele)}>X</button>
                            </div>
                        })
                        :
                        <p className='todo'> There are no Task, u are so useless :( </p>
                    :
                    <Loading />
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