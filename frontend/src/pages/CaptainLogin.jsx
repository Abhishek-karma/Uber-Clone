import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UberLogo from "../img/uber-captain.png";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {

  const navigate = useNavigate()

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {captain ,setCaptain} = useContext(CaptainDataContext);
  
  const submitHandler = async(e) => {
    e.preventDefault()
 
    const captain ={
      email:email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)
    if(response.status===200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }
    setEmail('')
    setPassword('') 
  }
  
 
  
  return (
    <div className="p-6 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16  mb-7 " src={UberLogo} alt="uber-logo" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e)=>{
             setEmail(e.target.value) 
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
            
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            type="password"
            placeholder="Password"
           value={password}
           onChange={(e)=>{
            setPassword(e.target.value)
           }}
          />
          <button className="bg-black text-white font-semibold rounded w-full px-4 py-3 mb-2">
            Login
          </button>
          <p className=" text-center mb-2">
           Join a fleet?{" "}
            <Link to="/captain-signup" className="text-blue-700 ">
              Register as a Captain
            </Link>
          </p>
        </form>
        <div>
          <Link  to='/signup' className=" flex items-center justify-center bg-[#6437f8]  text-white font-semibold rounded w-full px-4 py-3 ">
            Sign up as User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CaptainLogin