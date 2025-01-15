const axios = require('axios');
// maps.service.js
const captainModel = require('../models/captain.model');

const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371] // Convert radius from km to radians
      }
    }
  });

  return captains;
};


const getAddressCoordinate  = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API; // Make sure the API key is correct
    const url = `https://maps.gomaps.pro/maps/api/geocode/json`; // Use Geocoding API

    const response = await axios.get(url, {
      params: {
        address: address,
        key: apiKey,
      },
    });

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error(`Error: ${response.data.status} - ${response.data.error_message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error(`Failed to get coordinates: ${error.message}`);
    throw error;
  }
};

const getDistanceTime = async  (origin, destination) => {
  if(!origin || !destination){
    throw new Error('Origin or Destination is not defined')
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`


  try {
    const response = await axios.get(url);
    if(response.data.status === 'OK'){
      if(response.data.rows[0].elements[0].status ==='ZERO_RESULTS'){
        throw new Error('No results found');
      }
      return response.data.rows[0].elements[0];
    }else{
      throw new Error('Failed to get distance and time')
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getAutoCompleteSuggestions = async (input)=>{
  if(!input){
    throw new Error('Input is not defined');
  }
  const apiKey =  process.env.GOOGLE_MAPS_API;
  const  url= `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`
  try {
   const response = await axios.get(url);
   if(response.data.status === 'OK'){
    return response.data.predictions;
   }
  } catch (error) {
    console.error(error);
    throw error;
  }
}






module.exports = {
  getAutoCompleteSuggestions,
  getCaptainsInTheRadius,
  getAddressCoordinate ,
  getDistanceTime,

};
