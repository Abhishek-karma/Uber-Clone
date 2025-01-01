import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("token");
            navigate("/captain-login");
          }
        })
        .catch((error) => {
          console.error("Logout error:", error);
          // Handle error, e.g., display an error message to the user
          localStorage.removeItem("token"); // Remove token even if logout fails
          navigate("/captain-login");
        });
    } else {
      navigate("/captain-login"); // Redirect directly if no token is found
    }
  }, []);

  return <div>Logging out...</div>;
};

export default CaptainLogout;