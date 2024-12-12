import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
 
function App() {
  return (
    <div>
      <Routes>
        <Route  path="/" element={<Home />}/>
        <Route path="/signup" element={<UserSignup />}/>
        <Route path="/login" element={<UserLogin />}/>
        <Route path="/captain-signup" element={<CaptainSignup />}/>
        <Route path="/captain-login" element={<CaptainLogin />}/>       
      </Routes>
    </div>
  )
}

export default App