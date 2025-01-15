import React from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })

  return (
    <div className="h-screen">
        <Link to='/home' className="fixed right-2 top-2 w-10 h-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-xl font-medium ri-home-2-line"></i>
        </Link>
        <div className="h-1/2">
            <img
            className="object-cover h-full w-full"
            src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
            alt="map"
            />
        </div>
        <div className="h-1/2 p-4">
            <div className="flex items-center justify-between">
            <img
                className="h-28"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
                alt=""
            />

            <div className="text-right">
                <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname}</h2>
                <h4 className="text-xl font-semibold -mt-1 -mb-1 ">{ride?.captain.vehicle.plate}</h4>
                <p className="text-sm text-gray-600">Maruti Suzuki</p>
            </div>
            </div>
            <div className="mt-5 flex gap-2 justify-between items-center flex-col">
            <div className="w-full mt-5 ">
                
                <div className="flex items-center gap-4 p-2 border-b-2">
                <i className=" text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className="text-xl font-semibold">561/11A</h3>
                    <p className="text-sm -mt-1 text-gray-600">
                   {ride?.destination}
                    </p>
                </div>
                </div>
                <div className="flex items-center gap-4 p-2 ">
                <i className=" text-lg ri-money-rupee-circle-line"></i>
                <div>
                    <h3 className="text-xl font-semibold ">{ride?.fare}</h3>
                    <p className="text-sm -mt-1 text-gray-600">Cash Pay</p>
                </div>
                </div>
            </div>
            </div>
            <button className="flex mt-6 w-full flex-col items-center bg-slate-600 text-white text-2xl rounded-lg p-2  font-semibold">Make a payment</button>
        </div>
    </div>
  );
};

export default Riding;
