import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../../auth/AuthContext';
import URL from '../../auth/Url';

import '../Form.css';

function Login(){
    const auth = useContext(AuthContext)
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const UserData = {
        Email: Email,
        Password: Password
    }

    const [Respond, setRespond] = useState('');
    
    const navigate = useNavigate();

    const LoginHandler = async (e) => {
        e.preventDefault();

        await fetch(`${URL}/Login`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(UserData)
        }).then(res => res.json().then((data) => {
            console.log(data);
            if(data && data.status === 201){
                auth.LogIn(data.id, data.UserName);
                navigate(`/${data.id}`);
            }else{
                setRespond(data.status);
            }
        })).catch(err => console.log(err) );

    }

    return <div className='Center'>
        <div className='FormBox'>
            {Respond && <p className='warning'>{ Respond }</p>}
            <form onSubmit={LoginHandler} >
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
        </div>
    </div>
}

export default Login;