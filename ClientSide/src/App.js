import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';

import HomePage from './components/HomePage/HomePage'
import Signup from './components/SignupForm/Signup'
import Login from './components/LoginForm/Login'
import Index from './components/Index/Index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Navigate to='/Main'/>}/>

        <Route path='/:id'  element={ <HomePage/> } />
        
        <Route path='/Signup' element={ <Signup/> }/>
        <Route path='/Login' element={ <Login/> }/>
        <Route path='/Main' element={ <Index/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
