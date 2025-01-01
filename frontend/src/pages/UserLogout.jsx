import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Logout error:", error);
          // Handle error, e.g., display an error message to the user
        });
    } else {
      navigate("/login"); // Redirect directly if no token is found
    }
  }, []);

  return <div>Logging out...</div>;
};

export default UserLogout;