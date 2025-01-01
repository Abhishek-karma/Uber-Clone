import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);
          } else {
            localStorage.removeItem('token');
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          localStorage.removeItem('token');
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}
    </>
  );
};

export default UserProtectWrapper;