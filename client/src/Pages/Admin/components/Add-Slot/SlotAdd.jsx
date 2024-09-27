import React, { useState } from 'react';
import AddSlot from './AddSlot';
import AddVirtualSlot from './AddVirtualSlot';
const SlotAdd = () => {
  const [isOnsiteSlot, setsisOnsiteSlot] = useState(false); // 'email' or 'username'

  return (
    <div className="max-w-full mx-auto p-4">
        
        
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setsisOnsiteSlot(true)}
          className={`px-4 py-2 rounded-full ${
            isOnsiteSlot ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
          } focus:outline-none hover:bg-green-600 hover:text-white`}
        >
          On-site Slots 
        </button>
        <button
          onClick={() => setsisOnsiteSlot(false)}
          className={`px-4 py-2 rounded-full ${
            !isOnsiteSlot ?  'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
          } focus:outline-none hover:bg-green-600  hover:text-white`}
        >
          1:1 VC Slots
        </button>
      </div>


        {isOnsiteSlot ? (
          <AddSlot />
        ) : (
          <AddVirtualSlot />
        )}



    </div>
  );
};

export default SlotAdd;
