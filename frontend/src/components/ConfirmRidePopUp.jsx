import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')

  const submitHandler = (e) =>{
    e.preventDefault()
  }
  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 p-10 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="mt-5 font-semibold text-2xl">Confirm Ride</h3>
      <div className="flex items-center justify-between py-4 bg-gray-100 rounded-xl mt-3">
        <div className="flex items-center gap-3 px-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">Rahul Smith</h4>
        </div>
        <h5 className="text-lg font-semibold px-5">2.2 KM</h5>
      </div>

      <div className="mt-3 flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-4 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">561/11A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Aurangabad hotel, Maharashtra
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 border-b-2">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">561/11A</h3>
              <p className="text-sm -mt-1 text-gray-600">Nagpur, Maharashtra</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 ">
            <i className=" text-lg ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-xl font-semibold">193.6</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Pay</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-4 ">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
            value={otp}
              onChange={()=>setOtp(e.event.value)}
              type="text"
              className=" bg-[#eee] px-6  font-mono text-lg py-3 rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />
            <Link
              to={"/captain-riding"}
              className="justify-center w-full mt-2 flex bg-green-600 text-white text-2xl rounded-lg p-3  font-semibold"
            >
              Accept
            </Link>
            <button
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
              }}
              className=" bg-red-500 mt-2 w-full text-white text-2xl rounded-lg p-3  font-semibold"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
