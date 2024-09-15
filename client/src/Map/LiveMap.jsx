import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Default Leaflet marker icon fix for proper display
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LiveMap = () => {
  const markerPosition = [20.5937, 78.9629]; // Center of India

  return (
    <div className="w-full h-full rounded-xl">
      <MapContainer
        center={markerPosition} // Center the map at the marker's position
        zoom={5} // Zoom level
        className="w-full h-full rounded-xl"
        zoomControl={false} // Disable zoom controls (plus/minus buttons)
      >
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />

        {/* Add Marker */}
        <Marker position={markerPosition}></Marker>
      </MapContainer>
    </div>
  );
};

export default LiveMap;
