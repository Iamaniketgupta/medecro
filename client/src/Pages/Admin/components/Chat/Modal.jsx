import React from 'react';

const Modal = ({ isOpen, patients, onClose, onSelect }) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed z-50 inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black p-4 rounded-lg w-11/12 sm:w-3/4 max-w-lg overflow-y-auto max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Select a Patient : </h3>
          <button onClick={onClose} className="text-red-500">✖</button>
        </div>
        {patients?.map(patient => (
          <div key={patient.id} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg my-2 h-12">
            <div className="flex items-center">
              <img src={patient.profilePicture} alt={`${patient.name}'s profile`} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">{patient.username}</h4>
              </div>
            </div>
            <button onClick={() => onSelect(patient._id)} className="bg-blue-600 px-2 py-1 rounded-lg hover:bg-blue-700">Select</button>
          </div>
        ))}
        {patients.length === 0 && isOpen && (
        <div className="mt-4">No patients available to start a new chat.</div>
      )}
      </div>
    </div>
  );
};

export default Modal;
