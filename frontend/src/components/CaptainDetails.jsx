import React from "react";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex  items-center justify-between p-4 mt-6 ">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">Ramesh sharma</h4>
        </div>
        <div>
          <h4 className="text-xl font-medium">₹289</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 rounded-xl bg-gray-100 mt-6 items-start justify-center gap-5">
        <div className="text-center">
          <i className="text-3xl font-thin  ri-time-line"></i>
          <h5 className="text-lg font-medium">10.3</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl font-thin  ri-speed-up-fill"></i>
          <h5 className="text-lg font-medium">25.5 KM</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl font-thin  ri-sticky-note-line"></i>
          <h5 className="text-lg font-medium">10.3</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
