import React from "react";

const RidePopUp = (props) => {
  const { ride } = props;
  console.log(ride);
  

  if (!ride) {
    return <div>Loading...</div>; // Fallback UI when ride data is not yet available
  }
  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 p-10 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="mt-5 font-semibold text-2xl">New Ride Available</h3>
      <div className="flex items-center justify-between py-4 bg-gray-100 rounded-xl mt-3">
        <div className="flex items-center gap-3 px-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
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
                {props?.ride?.destination}
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
        <div className="flex items-center w-full mt-4 flex-col ">
          <button
            onClick={() => {
              props.setConfirmRidePopUpPanel(true);
              props.confirmRide()
            }}
            className="bg-black text-white font-semibold rounded w-full px-4 py-3 mb-2"
          >
            Accept
          </button>
          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className=" bg-[#6437f8] text-white font-semibold rounded w-full px-4 py-3 mb-2"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
