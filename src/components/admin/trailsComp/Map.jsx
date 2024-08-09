"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Button } from "@nextui-org/react";
import { MdCenterFocusStrong } from "react-icons/md";

function MapClickHandler({ setSelfPosition, startMarkerCallback, setStartMarker, endMarkerCallback, setEndMarker }) {
  const [clickCount, setClickCount] = useState(0);

  useMapEvents({
    click(e) {
      setClickCount((prevCount) => {
        const newCount = prevCount + 1;

        if (newCount === 1) {
          setStartMarker(e.latlng);
          startMarkerCallback(e.latlng);
        } else if (newCount === 2) {
          setEndMarker(e.latlng);
          endMarkerCallback(e.latlng);
        } else if (newCount === 3) {
          // Reset on the third click
          setStartMarker(null);
          setEndMarker(null);
          startMarkerCallback(null);
          endMarkerCallback(null);
          return 0; // reset the click count
        }

        return newCount;
      });
    },
    locationfound(e) {
      setSelfPosition(e.latlng);
      const map = e.target;
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}

export default function Map({startMarkerCallback, endMarkerCallback , startLocation, endLocation}) {
  const [selfPosition, setSelfPosition] = useState(null);
  const [startMarker, setStartMarker] = useState(startLocation);
  const [endMarker, setEndMarker] = useState(endLocation);
  const mapRef = useRef();

  const redIcon = new L.Icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const blueIcon = new L.Icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const greenIcon = new L.Icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });








  const handleLocate = () => {
    if (mapRef.current) {
      mapRef.current.locate();
    }
  };

  return (
    <div dir="rtl">
      <header className='text-center text-text lg:text-[15px] font-bold border-text p-2 border-b-[1px]'>מפה</header>
      <Button endContent={<MdCenterFocusStrong />} onClick={handleLocate} className="my-2">
        הראה מיקום עצמי
      </Button>
      <MapContainer
        center={startLocation ? startLocation : [32.7923, 34.9925]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "70%", zIndex: 0 }}
        ref={mapRef}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler 
          setSelfPosition={setSelfPosition}
          startMarkerCallback={startMarkerCallback}
          setStartMarker={setStartMarker}
          endMarkerCallback={endMarkerCallback}
          setEndMarker={setEndMarker}
        />

        {selfPosition && (
          <Marker position={selfPosition} icon={greenIcon}>
            <Popup className="text-md">אתה נמצא כאן</Popup>
          </Marker>
        )}
        {startMarker && (
          <Marker position={startMarker} icon={blueIcon}>
            <Popup className="text-md">נק התחלה</Popup>
          </Marker>
        )}
        {endMarker && (
          <Marker position={endMarker} icon={redIcon}>
            <Popup className="text-md">נק סיום</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
