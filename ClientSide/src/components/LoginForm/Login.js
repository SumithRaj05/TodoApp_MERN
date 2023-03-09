import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import URL from '../../auth/Url';

import '../Form.css';
import Loading from '../Loading/Loading';

function Login(){
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [IsLoading, setIsLoading] = useState(false);

    const UserData = {
        Email: Email,
        Password: Password
    }

    const [Respond, setRespond] = useState('');
    
    const navigate = useNavigate();

    const LoginHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await fetch(`${URL}/Login`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(UserData)
        }).then(res => res.json().then((data) => {
            console.log(data);
            if(data && data.status === 201){
                localStorage.setItem('token',data.Token);
                localStorage.setItem('username',data.UserName);
                localStorage.setItem('id',data.id);
                
                navigate(`/${data.UserName}`);
            }else{
                setRespond(data.status);
            }
        })).catch(err => setRespond("Internal Server Error") );
        setIsLoading(false);
    }

    return <div className='Center'>
        <div className='FormBox'>
        {!IsLoading?
            <form onSubmit={LoginHandler} >
            {Respond && <p className='warning'>{ Respond }</p>}
                <label>Email</label>
                <input type='email' 
                        placeholder='Enter email' 
                        maxLength='50' 
                        onChange={ (e) => setEmail(e.target.value) }
                        required/>
                <br/>
                <label>Password</label>
                <input type='password' 
                        placeholder='Enter Password' 
                        maxLength='50'
                        onChange={ (e) => setPassword(e.target.value) }
                        required/>
                <br/>
                <button type='submit' className='Submit'>Login</button>
                <Link to='/Signup'>Dont have account?</Link>
            </form>
            :
            <Loading/>
        }
        </div>
    </div>
}

export default Login;