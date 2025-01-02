import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UberLogo from "../img/uber-captain.png";
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CaptainHome = () => {
    const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
    const ridePopUpPanelRef = useRef(null);
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
    const confirmRidePopUpPanelRef = useRef(null);

    useGSAP(() => {
        if (ridePopUpPanel) {
            gsap.to(ridePopUpPanelRef.current, {
                transform: "translateY(0%)",
                duration: 0.5, // Animation duration
                ease: "power3.out", // Optional easing
            });
        } else {
            gsap.to(ridePopUpPanelRef.current, {
                transform: "translateY(100%)",
                duration: 0.5,
                ease: "power3.in",
            });
        }
    }, [ridePopUpPanel]);

    useGSAP(() => {
        if (confirmRidePopUpPanel) {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: "translateY(0%)",
                duration: 0.5,
                ease: "power3.out",
            });
        } else {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: "translateY(100%)",
                duration: 0.5,
                ease: "power3.in",
            });
        }
    }, [confirmRidePopUpPanel]);

    return (
        <div className="h-screen">
            <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
                <img className="w-16 mb-7" src={UberLogo} alt="uber-logo" />
                <Link to='/captain-login' className="w-10 -mt-8 h-10 bg-white flex items-center justify-center rounded-full">
                    <i className="ri-logout-box-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                <img
                    className="object-cover h-full w-full"
                    src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
                    alt="map"
                />
            </div>
            <div className="h-2/5">
                <div>
                    <CaptainDetails />
                </div>
                <div ref={ridePopUpPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white">
                    <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
                </div>
                <div ref={confirmRidePopUpPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white">
                    <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
                </div>
            </div>
        </div>
    );
}

export default CaptainHome;
