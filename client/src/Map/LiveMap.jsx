import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
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
  const defaultPosition = [20.5937, 78.9629]; 

  return (
    <div className="w-full h-full rounded-xl">
      <MapContainer
        center={markerPositio1 || defaultPosition}
        zoom={10} 
        className="w-full h-full rounded-xl"
        zoomControl={false} 
      >
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        
        {/* Add Marker */}
        <Marker position={markerPositio1 || defaultPosition} />

        {/* FlyToHandler to enable flyTo on position change */}
        <FlyToHandler position={markerPositio1 || defaultPosition} />
      </MapContainer>
    </div>
  );
};

export default LiveMap;
