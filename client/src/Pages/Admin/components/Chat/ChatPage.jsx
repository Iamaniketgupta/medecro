import React, { useEffect, useState } from "react";
import ChatMessageBox from "./ChatMessageBox";
import axiosInstance from "../../../../axiosConfig/axiosConfig";
import { useParams } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { useSocket } from "../../../../SockerWrapper"; // Import SocketContext hook
import { useSelector } from "react-redux";
import VideoCallModal from "../VideoCallModel";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userInfo, setuserInfo] = useState(null);
  const { patientId } = useParams();
  const socket = useSocket();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || 1; // Assume the logged-in user has an ID of 1

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchPersonDetails = async () => {
    try {
      const res = await axiosInstance(`/users/getuserbyid/${patientId}`);
      if (res.data) {
        console.log("res.data : ", res.data.data);
        setuserInfo(res?.data?.data);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance(`/messages/conversation/${patientId}`);

      if (res.data) {
        console.log("messges : ", res.data.data);
        setMessages(res?.data?.data);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // setMessages([
      //   ...messages,
      //   { id: messages.length + 1, senderId: userId, text: newMessage.trim() },
      // ]);
      socket.emit("message", {
        senderId: userId,
        recipientId: patientId,
        message: newMessage,
        name: userInfo?.name,
      });
      const msg = { id: 3, senderId: userId, content: newMessage };
      setMessages((prev) => [...prev, msg]);

      setNewMessage("");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        console.log("message : ", message);
        const msg = { id: 3, senderId: patientId, content: message.message };
        console.log("msg : ", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  

    useEffect(() => {
      fetchPersonDetails()
    }, [patientId])

  //   useEffect(() => {
  //     fetchMessages()
  //   }, [patientId])

  //   if(!userInfo){
  //     return <>
  //     loading</>
  //   }

  return (
    <div className="flex flex-col h-full w-full p-4 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-gray-300 rounded-lg">
      {/* Header with user info */}
      <div className="flex justify-between p-4 bg-gray-300  rounded-lg mb-4">
        <div className="flex justify-between items-start ">
          <img
            src={
              userInfo?.avatar ||
              "https://imgs.search.brave.com/RIvg_lwsUTnDwOR5KUF4d7tX8f6_L58Irn8BlWZlMmQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3Lzc1LzcxLzEy/LzM2MF9GXzc3NTcx/MTI1M19LR25nT2hk/VE50TEcxaWp6TDNk/bEJiTDlBMkY0dkZP/bS5qcGc"
            }
            alt={`${userInfo?.name}'s profile`}
            className="w-8 h-8 rounded-full mr-4"
          />
          <div className="">
            <h2 className="text-lg font-semibold text-black">
              {userInfo?.name || "Usernmame"}
            </h2>
          </div>
        </div>
        <div className="text-xl cursor-pointer flex items-center justify-center p-2 px-4 rounded-2xl mr-4 border-gray-300" style={{border:"1px solid black "}} onClick={openModal} >
          <FaVideo />
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-grow overflow-auto mb-2">
        <ChatMessageBox messages={messages} userId={userId} />
      </div>

      {/* Input field */}
      <div className="bg-white  p-4 flex items-center rounded-lg sticky bottom-0 z-10">
        <input
          type="text"
          className="flex-grow border border-gray-100 rounded-lg p-2 mr-2 bg-gray-200 bg-opacity-50 placeholder-gray-400 text-black"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {isModalOpen && <VideoCallModal onClose={closeModal}  /> }

      
    </div>
  );
};

export default ChatPage;
