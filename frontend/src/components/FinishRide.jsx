import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }
  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 p-10 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="mt-5 font-semibold text-2xl">Finish this Ride</h3>
      <div className="flex items-center justify-between py-4 bg-gray-100 rounded-xl mt-3">
        <div className="flex items-center gap-3 px-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname}
          </h4>
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
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 border-b-2">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">561/11A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 ">
            <i className=" text-lg ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-xl font-semibold">{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Pay</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-4 ">
          <button
            onClick={endRide}
            className="justify-center w-full mt-2 flex bg-green-600 text-white text-2xl rounded-lg p-3  font-semibold"
          >
            COMPLETE RIDE
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
