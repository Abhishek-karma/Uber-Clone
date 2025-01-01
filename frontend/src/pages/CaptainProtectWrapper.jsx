import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error fetching captain profile:', error);
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      } else {
        navigate('/captain-login'); // Redirect to login if no token
      }
    };

    fetchCaptainProfile();
  }, [token]); // Update effect only when token changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}
    </>
  );
};

export default CaptainProtectWrapper;