import React, { useCallback, useEffect, useState } from 'react';

import Setting from './Setting/Setting';
import URL from '../../auth/Url';
import Loading from '../Loading/Loading'
import Add from './AddTodo/Add';
import Update from './Update/Update'
import './HomePage.css';
import settings from './settings.png';
import update from './update.png';
import Motivation from './Motivation/Motivation';

function HomePage() {

    const user = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    const url = `${URL}/${user}`;
    const [AddScreen, setAddScreen] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [TodoList, setTodoList] = useState([]);
    const [setting, setSetting] = useState(false);
    const [updateScreen, setUpdateScreen] = useState(TodoList.map(() => false));

    const AddHandler = () => {
        setAddScreen(!AddScreen);
    }

    const settingHandler = () => {
        setSetting(!setting);
    }
    const updateScreenHandler = (index) => {
        setUpdateScreen((prev) => {
            const newArray = [...prev];
            newArray[index] = !newArray[index];
            return newArray;
        });
    };

    // todo get request
    const GetTodoList = useCallback(() => {
        setIsLoading(true);
        fetch(url).then(res => res.json().then((data) => {
            setTodoList(data.Task)
        }))
        setIsLoading(false);
    }, [url])

    useEffect(() => {
        setUpdateScreen(TodoList.map(() => false))
    }, [TodoList])

    useEffect(() => {
        GetTodoList();
    }, [GetTodoList]);

    // todo add request
    const AddTodoHandler = async (newTodo, date) => {
        if (newTodo.trim() === '') {
            return setAddScreen(!AddScreen);
        }
        setAddScreen(!AddScreen);
        setIsLoading(true);

        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user,
                text: newTodo.trim(),
                Date: date
            })
        }).then(res => res.json().then(() => {
            GetTodoList();
        })).catch(err => console.log(err));

        setIsLoading(false);
    }

    // todo delete request
    const DeleteHandler = async (ele, ind) => {
        setIsLoading(true)
        await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user,
                element: ele,
                index: ind
            })
        }).then(res => res.json().then(() => {
            GetTodoList();
        })).catch(err => console.log(err))
        setIsLoading(false)
    }

    // update todo
    const UpdateHandler = async (done, note, id, DueDate) => {
        setIsLoading(true);
        await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                done: done,
                note: note.trim(),
                id: id,
                user: user,
                dueDate: DueDate
            })
        }).then(res => res.json().then(() => {
            GetTodoList();
        })).catch(err => console.log(err))
        setIsLoading(false);
    }

    return <React.Fragment>


        {setting ?
            <Setting settingClickHandler={settingHandler} />
            :
            <div className='dropdown-btn' onClick={settingHandler}>
                <img className='setting' alt='settings' src={settings} />
            </div>
        }

        <center><div className="heading">Tasks List of {username}</div></center>

        <Motivation />

        <div className='Center'>

            <div className='TodoContainer'>
                {(!IsLoading) ?
                    (TodoList.length !== 0) ?
                        TodoList.map((object, index) => {
                            return <div className='todo' key={index}>
                                {
                                    updateScreen[index] ?
                                        <Update
                                            Index={index}
                                            Data={object}
                                            updateTodo={UpdateHandler}
                                            updateClickHandler={() => updateScreenHandler(index)}
                                        />
                                        :
                                        <div className='isDoneBox'>
                                            <img src={update}
                                                onClick={() => updateScreenHandler(index)}
                                                className='isDone'
                                                alt='update' />
                                        </div>
                                }
                                <em className='todoText'
                                    style={{ textDecoration: object.isCompleted ? "line-through" : "none" }}
                                >{object.Todo}</em>
                                <button className='delete' onClick={() => DeleteHandler(object, index)}>X</button>
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