// import { useContext } from 'react';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';

// import {AuthContext} from './auth/AuthContext';
import HomePage from './components/HomePage/HomePage'
import Signup from './components/SignupForm/Signup'
import Login from './components/LoginForm/Login'
import Index from './components/Index/Index'

function App() {
  const IsLoggedIn = localStorage.getItem('isLoggedIn');
  console.log(IsLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/Main'/>}/>
        
        <Route path='/:id'  element={ IsLoggedIn!==true? <HomePage/> : <Navigate to='/Main'/> }/>
        
        <Route path='/Signup' element={ <Signup/> }/>
        <Route path='/Login' element={ <Login/> }/>
        <Route path='/Main' element={ <Index/> }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
