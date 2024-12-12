import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UberLogo from "../img/uber-logo.png";


const UserSignup = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userData,setUserData] = useState('');

  const submitHandler = ((e)=>{
    e.preventDefault()

    setUserData({
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    })
     
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')

  })

  useEffect(() => {
    console.log(userData);
  }, [userData])
  
  
  return (
    <div className="p-6 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16  mb-3 " src={UberLogo} alt="uber-logo" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">Enter Your Name</h3>
          <div className="flex gap-4">
          <input
            required
            className="bg-[#eeeeee] w-1/2 mb-6 rounded px-4 py-2 border  text-lg placeholder:text-base"
            type="text"
            placeholder="First Name" 
            value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}
          />
          <input
            className="bg-[#eeeeee] w-1/2 mb-6 rounded px-4 py-2 border  text-lg placeholder:text-base"
            type="text"
            placeholder="Last Name" 
            value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value)
            }}
          />
          </div>
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <button className="bg-black text-white font-semibold rounded w-full px-4 py-3 mb-2">
            Register
          </button>
          <p className=" text-center mb-2">
            Already Registered? 
            <Link to="/login" className="text-blue-700 ">
                Click here to login
            </Link>
          </p>
        </form>
        
      </div>
      <div>
          <p className="text-[10px]">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
    </div>
  );
}

export default UserSignup