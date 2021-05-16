import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const DisplayLocation = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  const onMakerClick = (mapProps, marker, event) => {
    if (!showingInfoWindow) {
      setSelectedPlace(mapProps);
      setActiveMarker(marker);
      setShowingInfoWindow(true);
    } else {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const onClose = (mapProps) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  return (
    <Map
      google={props.google}
      zoom={15}
      style={mapStyles}
      initialCenter={{
        lat: props.lat,
        lng: props.lng,
      }}
    >
      <Marker onClick={onMakerClick} name={props.location} />
      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h6>{selectedPlace.name}</h6>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(DisplayLocation);
