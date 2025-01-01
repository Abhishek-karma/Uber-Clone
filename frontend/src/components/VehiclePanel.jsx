import React from "react";

const VehiclePanel = (props) => {

  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 p-10 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="font-semibold text-2xl">Choose the vehicle</h3>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex mb-2 border-2 active:border-black rounded-xl p-3 w-full items-center justify-between"
      >
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
          alt=""
        />
        <div className="bg-slate-200 w-1/2">
          <h4 className="font-bold  text-base">
            UberG0{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="font-medium  text-base">2 min away</h5>
          <p className="font-medium text-sm text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold"> ₹192.6 </h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex mb-2 border-2 active:border-black rounded-xl p-3 w-full items-center justify-between"
      >
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="bg-slate-200 w-1/2">
          <h4 className="font-bold  text-base">
            Auto{" "}
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h5 className="font-medium  text-base">3 min away</h5>
          <p className="font-medium text-sm text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold"> ₹89.6 </h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex mb-2 border-2 active:border-black  rounded-xl p-3 w-full items-center justify-between"
      >
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="bg-slate-200 w-1/2">
          <h4 className="font-bold  text-base">
            Motor{" "}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h5 className="font-medium  text-base">4 min away</h5>
          <p className="font-medium text-sm text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold"> ₹52 </h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
