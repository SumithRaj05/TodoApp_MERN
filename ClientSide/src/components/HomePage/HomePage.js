import React, { useCallback, useEffect, useState } from 'react';

import Setting from './Setting/Setting';
import URL from '../../auth/Url';
import Loading from '../Loading/Loading'
import Add from './AddTodo/Add';
import Update from './Update/Update'
import './HomePage.css';
import settings from './settings.png';
import update from './update.png';

function HomePage() {

    const user = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    const url = `${URL}/${user}`;
    const [AddScreen, setAddScreen] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [TodoList, setTodoList] = useState([]);
    const [setting, setSetting] = useState(false);
    const [updateScreen, setUpdateScreen] = useState(false);

    const AddHandler = () => {
        setAddScreen(!AddScreen);
    }

    const settingHandler = () => {
        setSetting(!setting);
    }

    const updateScreenHandler = () => {
        setUpdateScreen(!updateScreen);
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
        
        {setting ?
            <Setting settingClickHandler={settingHandler} />
            :
            <div className='dropdown-btn' onClick={settingHandler}>
                <img className='setting' alt='settings' src={settings} />
            </div>
        }

        <center><div className="heading">Tasks List of {username}</div></center>
        
        <div className='Center'>

            <div className='TodoContainer'>
                {(!IsLoading) ?
                    (TodoList.length !== 0) ?
                        TodoList.map((ele, index) => {
                            return <div className='todo' key={index}>
                                {
                                    updateScreen?
                                        <Update updateClickHandler={updateScreenHandler}/>
                                    :
                                        <div className='isDoneBox'>
                                        <img src={update} 
                                            className='isDone' 
                                            alt='update'/>
                                        </div>
                                }
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