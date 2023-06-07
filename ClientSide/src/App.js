import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage'
import Signup from './components/SignupForm/Signup'
import Login from './components/LoginForm/Login'
import Index from './components/Index/Index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Index />} />
        <Route path='/:id' element={<HomePage />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;