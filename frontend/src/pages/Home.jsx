import React, { useRef, useState } from "react";
import UberLogo from "../img/uber-logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  
  
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriverRef] = useState(false)

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translate(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translate(100%)",
      });
    }
  }, [vehiclePanel]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmPanelRef.current, {
        transform: "translate(0%)",
      });
    } else {
      gsap.to(confirmPanelRef.current, {
        transform: "translate(100%)",
      });
    }
  }, [confirmRidePanel]);


  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translate(0%)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translate(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translate(0%)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translate(100%)",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative">
      <img
        className="w-12 sm:w-16 absolute left-5 top-5"
        src={UberLogo}
        alt="uber-logo"
      />

      <div className="h-screen w-screen">
        <img
          className="object-cover h-full w-full"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt="map"
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-4 sm:p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute top-3 opacity-0 right-6 text-lg sm:text-xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-xl sm:text-2xl mt-3 font-semibold">
            Find a trip
          </h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-12 sm:h-16 w-1 top-[45%] left-6 sm:left-8 bg-gray-900 rounded-full" />
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] text-sm sm:text-lg rounded-lg w-full px-8 sm:px-12 py-2 sm:py-3 mt-4 sm:mt-5"
              type="text"
              placeholder="Where to?"
            />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] text-sm sm:text-lg rounded-lg w-full px-8 sm:px-12 py-2 sm:py-3 mt-3"
              type="text"
              placeholder="Where from?"
            />
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white"
      >
        <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0  px-3 py-6 pt-12 bg-white">
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
