import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import UberLogo from "../img/uber-captain.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0%)",
        duration: 0.5, // Animation duration
        ease: "power3.out", // Optional easing for smoother transitions
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img className="w-16 mb-7" src={UberLogo} alt="uber-logo" />
        <Link
          to="/captain-login"
          className="w-10 -mt-8 h-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="object-cover h-full w-full"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt="map"
        />
      </div>
      <div
        className="h-1/5 bg-yellow-200 p-6 flex items-center relative justify-between"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5 className="p-1 text-center w-[93%] absolute top-0">
          <i className="text-3xl text-black p-10 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-medium">4 KM Away</h4>
        <button className="bg-slate-600 text-white text-2xl rounded-lg p-3 font-semibold">
          Confirm Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
