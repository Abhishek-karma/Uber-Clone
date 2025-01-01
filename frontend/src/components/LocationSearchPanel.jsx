import React from 'react'



const LocationSearchPanel = (props) => {
  
  
  const locations = [
    "Flat No. 101, Sector 5, Noida, Uttar Pradesh, 201301", 
    "House No. 23, MG Road, Bangalore, Karnataka, 560001",
    "B-12, Vikas Puri, New Delhi, Delhi, 110018",
    "Shop No. 4, Laxmi Nagar, Mumbai, Maharashtra, 400022"
  ];
  return (
    <div>
      {
        locations.map((element,idx)=>{
          return <div key={idx} onClick={()=>{
           
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex border-2 p-2 border-white active:border-black items-center rounded-xl  my-2 justify-start gap-3'>
          <h2 className='bg-[#eee] flex h-12 w-12 items-center justify-center rounded-full'><i className="ri-map-pin-2-fill text-[20px] "></i></h2>
          <h4 className='font-medium '>{element}</h4>
        </div>
        })
      }
      
      
    </div>
  )
}

export default LocationSearchPanel