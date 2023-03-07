import React, { useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../auth/AuthContext';
import URL from '../../auth/Url';

import '../Form.css';

function Signup(){
    const auth = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const inputNameHandler = (event) => {
        setName(event.target.value);
    }
    const inputEmailHandler = (event) => {
        setEmail(event.target.value);
    }
    const inputPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const [Respond, setRespond] = useState('');

    const userData = {
        UserName: name,
        Email: email,
        Password: password
    }

    const navigate = useNavigate();

    const SignupHandler = async (e) => {
        e.preventDefault();

        await fetch(`${URL}/Signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res =>{
            res.json().then((data) => {
                console.log(data)
                if(data && data.status === 200){
                    auth.LogIn(data.id, data.UserName);
                    navigate(`/${data.id}`)
                }else{
                    setRespond(data.status)
                }

            })
        }).catch(err => console.log(err));

    }
    
    return <div className='Center'>
        <div className='FormBox'>
            {Respond && <p className='warning'>{ Respond }</p>}
            <form onSubmit={SignupHandler}>
                <label>Name</label>
                <input type='text'
                        onChange={inputNameHandler} 
                        placeholder='Enter username' 
                        maxLength='50' 
                        required/>
                <br/>
                <label>Email</label>
                <input type='email' 
                        onChange={inputEmailHandler}
                        placeholder='Enter email' 
                        maxLength='50' 
                        required/>
                <br/>
                <label>Password</label>
                <input type='password'
                        onChange={inputPasswordHandler} 
                        placeholder='Enter Password' 
                        maxLength='50' 
                        required/>
                <br/>
                <button type='submit' className='Submit'>Signup</button>
                <a href='/Login'>Already have account?</a>
            </form>
        </div>
    </div>
}

export default Signup;