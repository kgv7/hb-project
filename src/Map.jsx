import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import Loading from "./Loading";
// https://react-google-maps-api-docs.netlify.app/#


export default function Map(props) {
  const [mapData, setMapData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.0522, lng: -118.2437});
  const [loading, setLoading] = useState(false);
  const [searchAddress, setSearchAddress] = useState(""); 
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB6L9_qNTTsWQcr7L9gH-bItjixBdqdY5U",
  });

  // 
  const onPlacesChanged = () => {console.log(searchAddress)};

  useEffect(() => {
    setLoading(true);
    fetch("/api/charging-locations")
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);
        setLoading(false);
      });
  }, []);


  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  }

  const [markerInfo, getInfo] = React.useState(null);

  if (loadError) {
    return <h3>There was an error loading the map</h3>;
  }

  if (loading || !isLoaded) {
    return <Loading />;
  }
  

  return (

    <GoogleMap
      center={mapCenter}
      // state values - rerender - initial state
      mapContainerStyle={{ width: "600px", height: "400px" }}
      zoom={12}
    >
    <StandaloneSearchBox
      onPlacesChanged={
        onPlacesChanged
      }
      // onLoad={onLoad}
    >
      <input
        type="text"
        value={searchAddress}
        onChange={(event)=>setSearchAddress(event.target.value)}
        placeholder="Type address here"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px"
        }}
      />
    </StandaloneSearchBox>

      {mapData.map((dataPoint) => (
        <Marker
          key={dataPoint.id}
          position={{ lat: dataPoint.latitude, lng: dataPoint.longitude }}
          onClick={() => {getInfo(dataPoint)}}
        />
       
    ))};
    {markerInfo && (
   <InfoWindow
      onCloseClick={() => {
         getInfo(null);
      }}
      position={{
         lat: markerInfo.latitude,
         lng: markerInfo.longitude
      }}
   >
      <div style={divStyle}>
        <strong>{markerInfo.street_address}, </strong>
        <strong>{markerInfo.city}, {markerInfo.state} {markerInfo.zip}</strong>
        Hours: {markerInfo.access_days_time}
        {/* <p>Connector Type: {markerInfo.ev_connector_types}</p> */}
        <p># of Level 1 Ports: {markerInfo.ev_level1_evse_num}</p>
        <p># of Level 2 Ports: {markerInfo.ev_level2_evse_num}</p>
        <p># of Level 3 Ports: {markerInfo.eev_dc_fast_num}</p>
        <button>Find Local Restaurants</button>
      </div>
   </InfoWindow>
)}
    </GoogleMap>
  );
}
