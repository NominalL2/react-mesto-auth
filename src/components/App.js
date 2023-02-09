import '../index.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute.js';
import { useState } from 'react';
import Login from './Login.js';
import Mesto from './Mesto.js';
import Register from './Register.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>


      <Routes>
        <Route path='/mesto' element={<ProtectedRouteElement element={Mesto} loggedIn={loggedIn} />} />
        <Route path='/sign-in' element={<Login/>} />
        <Route path='/sign-up' element={<Register/>} />
        <Route path="/" element={loggedIn ? <Navigate to="/mesto" replace /> : <Navigate to="/sign-up" replace />} />
      </Routes>
    </>
  );
}

export default App;
