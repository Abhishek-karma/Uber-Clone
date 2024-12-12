import React, { useState } from "react";
import { Link } from "react-router-dom";
import UberLogo from "../img/uber-logo.png";

const UserLogin = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userData,setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      email:email,
      password:password
    })
    console.log(userData);
    
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
            New here?{" "}
            <Link to="/signup" className="text-blue-700 ">
              Create new Account
            </Link>
          </p>
        </form>
        <div>
          <Link  to='/captain-login' className=" flex items-center justify-center bg-[#f1aa38]  text-white font-semibold rounded w-full px-4 py-3 ">
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
