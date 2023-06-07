import React, { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import URL from '../../auth/Url';

import '../Form.css';
import Loading from '../Loading/Loading';

function Signup(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    
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
        setIsLoading(true)
        await fetch(`${URL}/Signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res =>{
            res.json().then((data) => {
                if(data && data.status === 200){
                    localStorage.setItem('username',data.UserName);
                    localStorage.setItem('id',data.id);
                    navigate(`/${data.UserName}`)
                }else{
                    setRespond(data.status)
                }

            })
        }).catch(err => console.log(err));
        setIsLoading(false)
    }
    
    return <div className='Center'>
        <div className='FormBox'>
        {!IsLoading?
            <form onSubmit={SignupHandler}>
                {Respond && <p className='warning'>{ Respond }</p>}
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
                <Link to='/Login'>Already have account?</Link>
            </form>
            :
            <Loading/>
        }
        </div>
    </div>
}

export default Signup;