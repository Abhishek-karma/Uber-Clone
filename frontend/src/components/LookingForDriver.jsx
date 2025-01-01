import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
    <h5
      className="p-3 text-center w-[93%] absolute top-0"
      onClick={() => {
        props.setVehicleFound(false);
      }}
    >
      <i className="text-3xl text-gray-400 p-10 ri-arrow-down-wide-line"></i>
    </h5>
    <h3 className="mt-5 font-semibold text-2xl">Looking For Driver</h3>

    <div className="mt-5 flex gap-2 justify-between items-center flex-col">
      <img className="h-28"
        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
        alt=""
      />

      <div className="w-full mt-5 ">
          <div className="flex items-center gap-4 p-2 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-xl font-semibold">561/11A</h3>
                <p className="text-sm -mt-1 text-gray-600">Aurangabad hotel, Maharashtra</p>
              </div>
          </div>
          <div  className="flex items-center gap-4 p-2 border-b-2">
                <i className=" text-lg ri-map-pin-user-fill"></i>
                <div>
                  <h3 className="text-xl font-semibold">561/11A</h3>
                  <p className="text-sm -mt-1 text-gray-600">Nagpur, Maharashtra</p>
                </div>
          </div>
          <div  className="flex items-center gap-4 p-2 ">
                <i className=" text-lg ri-money-rupee-circle-line"></i>
                <div>
                  <h3 className="text-xl font-semibold">193.6</h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash Pay</p>
                </div>
          </div>
      </div>
     
    </div>
    </div>
  )
}

export default LookingForDriver