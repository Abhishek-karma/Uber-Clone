// Home.jsx
import React from 'react';
import {Link} from 'react-router-dom'
import UberLogo from "../img/uber-logo.png"

function Start() {
  return (
    <div className='bg-cover bg-center bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/c5310f182519763.652f3606b64b0.jpg)] h-screen pt-8pl-9 flex justify-between flex-col w-full'>
      <img className="w-16 ml-5 mt-6 " src={UberLogo} alt="uber-logo" />
      <div className='bg-white py-4 px-4 pb-6'>
      <h2 className='text-3xl font-bold'>Get started with Uber</h2>
      <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
      </div>
    </div>
  );
}

export default Start;