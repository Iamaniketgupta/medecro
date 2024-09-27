import React, { useEffect, useRef, useState } from 'react';

import PeerService from '../../../peer';

import { useSocket } from "../../../SockerWrapper";

const VideoCallModal = ({ onClose }) => {
  const localVideoRef = useRef(null);
  const [remoteVideoRefs, setRemoteVideoRefs] = useState({});
  const [peers, setPeers] = useState({});
  const socket = useSocket();
  

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
      // Join the open video call session
      socket.emit('join-call');
    });

    // Handle when a user joins
    socket.on('user-joined', async (userId) => {
      console.log('User joined:', userId);

      // Create a new peer for the new participant
      const peer = PeerService.createPeer(userId, true);
      setPeers(prev => ({ ...prev, [userId]: peer }));

      // Get offer and send it to the new user
      const offer = await PeerService.getOffer();
      socket.emit('offer', { offer, targetId: userId });
      console.log('Sent offer to:', userId);
    });

    // Handle received offer
    socket.on('offer', async (offer) => {
      console.log('Received offer:', offer);
      const peer = PeerService.createPeer(offer.from, false);
      setPeers(prev => ({ ...prev, [offer.from]: peer }));

      // Set the remote description and get answer
      await peer.setRemoteDescription(offer.offer);
      const answer = await peer.createAnswer();
      socket.emit('answer', { answer, targetId: offer.from });
    });

    // Handle received answer
    socket.on('answer', (answer) => {
      console.log('Received answer:', answer);
      const peer = peers[answer.from];
      if (peer) {
        peer.setRemoteDescription(answer.answer);
      }
    });

    // Handle received ICE candidate
    socket.on('ice-candidate', (candidate) => {
      console.log('Received ICE candidate:', candidate);
      const peer = peers[candidate.from];
      if (peer) {
        peer.addIceCandidate(new RTCIceCandidate(candidate.candidate));
      }
    });

    // Handle when a user leaves
    socket.on('user-left', (userId) => {
      console.log('User left:', userId);
      if (peers[userId]) {
        peers[userId].close();
        setPeers(prev => {
          const newPeers = { ...prev };
          delete newPeers[userId];
          return newPeers;
        });
      }
    });

    

  }, [socket, peers]);

  useEffect(() => {
    if (!socket) return;

    // Get local media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        // Display local video stream
        localVideoRef.current.srcObject = stream;

        // Add the local stream to all peer connections
        stream.getTracks().forEach(track => {
          Object.values(peers).forEach(peer => {
            peer.addTrack(track, stream);
          });
        });
      });
  }, [socket, peers]);

  
  console.log("remodereference L " , remoteVideoRefs)

  PeerService.createPeer = (targetId, isInitiator) => {
    const peer = new RTCPeerConnection();
    
    // Handle ice candidate
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate, targetId });
        console.log('Sent ICE Candidate:', event.candidate);
      }
    };


    // Handle track event
    peer.ontrack = (event) => {
      console.log('Received track from', targetId);
      setRemoteVideoRefs(prevRefs => {
        if (!prevRefs[targetId]) {
          prevRefs[targetId] = React.createRef();
        }
        if (prevRefs[targetId].current) {
          prevRefs[targetId].current.srcObject = event.streams[0];
        }
        return prevRefs;
      });
    };

    // Add local tracks to peer connection
    localVideoRef.current.srcObject.getTracks().forEach(track => {
      peer.addTrack(track, localVideoRef.current.srcObject);
    });

    // Create offer if isInitiator
    if (isInitiator) {
      peer.createOffer()
        .then(offer => peer.setLocalDescription(offer))
        .then(() => {
          socket.emit('offer', { offer: peer.localDescription, targetId });
        });
    }

    return peer;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xl">
    <button onClick={onClose} className="text-red-500 hover:text-gray-700 text-2xl font-bold absolute top-4 right-4">
      X
    </button>
    <div className="flex flex-wrap justify-center gap-4">
      <video ref={localVideoRef} autoPlay playsInline muted className="w-72 rounded-lg">
        <track kind="captions" srcLang="en" label="English captions" />
      </video>
      {Object.keys(remoteVideoRefs).map(peerId => (
        <video key={peerId} ref={remoteVideoRefs[peerId]} autoPlay playsInline className="w-72 rounded-lg">
          <track kind="captions" srcLang="en" label="English captions" />
        </video>
      ))}
    </div>
  </div>
</div>

  );
};

export default VideoCallModal;
