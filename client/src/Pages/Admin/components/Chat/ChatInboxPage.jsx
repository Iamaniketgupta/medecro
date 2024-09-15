import React, { useEffect, useState } from 'react';
// import ChatInbox from './ChatInbox';
import Modal from './Modal';
import axiosInstance from '../../../../axiosConfig/axiosConfig';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatInboxPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [patients, setpatients] = useState([{
    _id: 1,
  }]);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate()

  const fetchChats = async () => {
    try {
      const res = await axiosInstance.get("/messages/users-with-last-message");
      if (res.data) {
        console.log("last : ",res.data)
        setChats(res.data?.data)
      }
    } catch (error) {
      console.log("Error fetching chats:", error);
    }
  };

  const fetchpatients = async () => {
    try {
      const res = await axiosInstance.get(`/doctor/patients`);
      if (res.data) {
        console.log("res.data : ",res.data);
        setpatients(res.data)
      }
    } catch (error) {
      console.log("Error fetching patients:", error);
    }
  };

  const handleSelectConnection = (id) => {
    // Perform your action here, e.g., start a new chat with the selected connection
    console.log('Selected patient ID:', id);
    navigate(`/clinic/chat/${id}`);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      fetchChats();
      fetchpatients();
    }
  }, [user]);

  return (
    <div className="p-4 w-full text-black">
      {chats.length > 0 ? (
        <ChatInbox chats={chats} />
        
        
      ) : (
        <div>No chat history available.</div>
      )}
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 mt-4">
        New Chat
      </button>
      <Modal
        isOpen={isModalOpen}
        patients={patients}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectConnection}
      />
      
    </div>
  );
};

export default ChatInboxPage;
