import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, LayersControl, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getDistance } from 'geolib';
import { IoMdLocate } from "react-icons/io";
import iconImg from '../assets/icon.png';

// Remove the default marker icon
delete L.Icon.Default.prototype._getIconUrl;

// Define custom marker icons
const userIcon = new L.Icon({
  iconUrl: iconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const clinicIcon = new L.Icon({
  iconUrl: 'https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const FlyToHandler = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), {
        animate: true,
        duration: 1.5,
      });
    }
  }, [position, map]);

  return null;
};

const LiveMap = ({ markerPositio1 }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [path, setPath] = useState([]);
  const [clinicDistance, setClinicDistance] = useState(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [loadingClinicDistance, setLoadingClinicDistance] = useState(true); // Loading state for clinic distance

  const defaultPosition = [20.5937, 78.9629]; // Default position for the map

  // Function to calculate distance to the clinic
  const calculateDistanceToClinic = (latitude, longitude) => {
    if (markerPositio1) {
      const distanceToClinic = getDistance(
        { latitude, longitude },
        { latitude: markerPositio1[0], longitude: markerPositio1[1] }
      );
      setClinicDistance(distanceToClinic);
      setLoadingClinicDistance(false); // Set loading to false once distance is calculated
    }
  };

  // Fetch user's live location
  const fetchLiveLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = [latitude, longitude];

        // Update the user's position and store in path
        setUserPosition(newPosition);
        setPath((prevPath) => {
          const updatedPath = [...prevPath, newPosition];
          return updatedPath;
        });

        setLocationGranted(true); // Set location granted

        // Calculate distance to the clinic
        calculateDistanceToClinic(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationGranted(false); // Reset location granted on error
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    fetchLiveLocation(); // Fetch initial location
    const intervalId = setInterval(fetchLiveLocation, 10000); // Update location every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Calculate distance to the clinic on initial load if userPosition is null
  useEffect(() => {
    if (userPosition) {
      calculateDistanceToClinic(userPosition[0], userPosition[1]);
    }
  }, [userPosition, markerPositio1]); // Update distance when userPosition or markerPositio1 changes

  return (
    <div className="mt-10 w-full h-full rounded-xl rounded-b-none relative md:px-5">
      <MapContainer
        center={markerPositio1 || userPosition || defaultPosition}
        zoom={10}
        className="w-full h-full rounded-t-xl"
        zoomControl={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map View">
            <TileLayer
              url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Add Marker for the static position passed in props */}
        {markerPositio1 && (
          <Marker position={markerPositio1} icon={clinicIcon}>
            <Tooltip direction="top" offset={[0, -30]} opacity={1} permanent>
              Clinic
            </Tooltip>
          </Marker>
        )}

        {/* Add Marker for the user's current position */}
        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Tooltip direction="top" offset={[0, -30]} opacity={1} permanent>
              You
            </Tooltip>
          </Marker>
        )}

        {/* Draw the user's path as a polyline */}
        {path.length > 1 && <Polyline positions={path} color="blue" />}

        {/* Draw line from user to clinic if both positions are available */}
        {userPosition && markerPositio1 && (
          <Polyline positions={[userPosition, markerPositio1]} color="blue" />
        )}

        {/* FlyToHandler to enable flyTo on user position change */}
        <FlyToHandler position={userPosition || defaultPosition} />
      </MapContainer>

      {/* Display distance to the clinic in a box */}
      {locationGranted && (
        <div className="bg-white p-4 rounded-xl rounded-t-none shadow-lg border border-gray-300">
          <p className="font-bold">Distance to Clinic</p>
          {loadingClinicDistance ? (
            <p>Calculating distance to Clinic...</p> // Loading message
          ) : (
            clinicDistance !== null && (
              <p>
                {clinicDistance < 1000
                  ? `${clinicDistance} meters`
                  : `${(clinicDistance / 1000).toFixed(2)} kilometers`}
              </p>
            )
          )}
        </div>
      )}

      <button
        onClick={fetchLiveLocation}
        className="absolute top-24 md:left-7 left-3 z-[500] bg-blue-500 text-white p-2 rounded shadow-lg"
      >
        <IoMdLocate size={25} />
      </button>
    </div>
  );
};

export default LiveMap; 