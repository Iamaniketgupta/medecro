import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VideoCallComponent = () => {
  const { roomID } = useParams();
  const user = useSelector((state) => state.auth.user) || {
    _id: "66f2698e10a8bec1c7acaca4",
    mobileNo: "12121212",
    email: "surajgsn07@gmail.com",
    fullName: "suraj",
    username:"suraj",
    age: 9,
    doctors: [],
    password: "$2b$10$DDL8xLDwg55j5wb6J2vRNOG0C1MRTbdGWEDgXU.eOrR1gZrCA6XaO",
    createdAt: "2024-09-24T07:26:06.011Z",
    updatedAt: "2024-09-24T07:26:06.011Z",
    __v: 0
};

const type = useSelector((state) => state.auth?.type);
console.log({type})

  const videoCallContainer = useRef(null); // Create a ref for the video call container
  const navigate = useNavigate()

  useEffect(() => {
    const myMeeting = async () => {
      // Check if user and roomID are available
      if (!user || !roomID) {
        console.error("User or roomID is missing.");
        return;
      }

      const appID = 1455837037;
      const serverSecret = "d0c816a85a98b775f53cd72a5ba0accb";
      const username = (user?.fullName || user?.name) + user._id.toString().slice(-5);

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, user?._id, username);

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Join the room automatically with no need for extra UI clicks
      zp.joinRoom({
        container: videoCallContainer.current, // Use the ref for the container
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        
        turnOnMicrophoneWhenJoining: true, // Automatically turn on microphone
        turnOnCameraWhenJoining: true,     // Automatically turn on camera
        showPreJoinView: false,    
        onLeaveRoom: () => {
          if(type == 'doctor'){
            navigate("/clinic/dashboard")

          }else{
            navigate("/patient/dashboard")
          }

        }        // Skip the pre-join view
      });
    };

    // Call the function when the component mounts
    myMeeting();
  }, [roomID, user]); // Dependencies: roomID and user

  return (
    <div>
      <div ref={videoCallContainer} style={{ width: '100%', height: '100vh' }} /> {/* Assign the ref to the div element */}
    </div>
  );
};

export default VideoCallComponent;
