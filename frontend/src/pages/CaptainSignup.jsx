import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UberLogo from "../img/uber-captain.png";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState("");

  const [color, setVehicleColor] = useState("");
  const [plate, setVehiclePlate] = useState("");
  const [capacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle:{
        color:color,
        plate:plate,
        capacity:capacity,
        vehicleType:vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)

    if(response.status===201){
      const data = response.data;
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor('')
    setVehicleCapacity('')
    setVehiclePlate('')
    setVehicleType('')
  };

  // useEffect(() => {
    
  // }, [captainData]);

  return (
    <div className="p-6 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16  mb-3 " src={UberLogo} alt="uber-logo" />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg w-full font-medium mb-2">Enter Your Name</h3>
          <div className="flex gap-4">
            <input
              required
              className="bg-[#eeeeee] w-1/2 mb-6 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="bg-[#eeeeee] w-1/2 mb-6 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <h3 className="text-lg font-medium mb-2">Enter Vehicle Details</h3>
          <div className="flex gap-4">
            <input
              required
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e)=>{
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="Plate"
              value={plate}
              onChange={(e)=>{
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className="flex gap-4">
            <input
              required
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e)=>{
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2  mb-7 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="select"
              value={vehicleType}
              onChange={(e)=>{
                setVehicleType(e.target.value)
              }}>
              <option>Vehicle-Type</option>
              <option value="car">Car </option>
              <option value="auto">Auto </option>
              <option value="motorcycle">Motorcycle </option>
            </select>
          </div>
          <button className="bg-black text-white font-semibold rounded w-full px-4 py-3 mb-2">
            Create Captain Account
          </button>
          <p className=" text-center mb-2">
            Already have a account?
            <Link to="/captain-login" className="text-blue-700 ">
              login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px]">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
export default CaptainSignup;
