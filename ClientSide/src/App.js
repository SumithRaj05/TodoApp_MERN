// import { useContext } from 'react';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';

// import {AuthContext} from './auth/AuthContext';
import HomePage from './components/HomePage/HomePage'
import Signup from './components/SignupForm/Signup'
import Login from './components/LoginForm/Login'

function App() {
  // const auth = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/Login'/>}/>
        
        <Route path='/:id'  element={ isLoggedIn? <HomePage/> : <Navigate to='/Login'/> }/>
        
        <Route path='/Signup' element={ <Signup/> }/>
        <Route path='/Login' element={ <Login/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
