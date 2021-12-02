import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
  StandaloneSearchBox,
  MarkerClusterer
} from "@react-google-maps/api";
import Loading from "./Loading";
import InfoBoxButton from "./InfoBox";
// import { propTypes } from "react-bootstrap/esm/Image";
// https://react-google-maps-api-docs.netlify.app/#

const googleLibraries = ['places']

export default function Map() {
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [center, setNewCenter] = useState({lat: 34.0522, lng: -118.2437})
  const googleMapAPILibraries = ['places']
  // const token = sessionStorage.getItem("token")
  // const googleMapsApiKey= "AIzaSyB6L9_qNTTsWQcr7L9gH-bItjixBdqdY5U"
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB6L9_qNTTsWQcr7L9gH-bItjixBdqdY5U",
    libraries: [googleLibraries]
  });



  const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => {
    searchBox.getPlaces()[0].geometry.location;
    setNewCenter(searchBox.getPlaces()[0].geometry.location)
  }
  const onSBLoad = ref => {
    setSearchBox(ref);
  };


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
      center={center}
      mapContainerStyle={{ width: "600px", height: "400px" }}
      zoom={14}
    >
    <StandaloneSearchBox
      onPlacesChanged={onPlacesChanged}
      onLoad={onSBLoad}
    >
      <input
        type="text"
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

    {mapData.map((dataPoint)=>(
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
      key={markerInfo.id}
      >
      <div style={divStyle}>
        <h5>{markerInfo.station_name}</h5>
        <strong>{markerInfo.street_address}, </strong>
        <strong>{markerInfo.city}, {markerInfo.state} {markerInfo.zip}</strong>
        {/* <p>Cost: {markerInfo.ev_pricing}</p> */}
        <p>Hours: {markerInfo.access_days_time}</p>
        {/* <p>Connector Type: {markerInfo.ev_connector_types}</p> */}
        <p># of Level 1 Chargers: {markerInfo.ev_level1_evse_num}</p>
        <p># of Level 2 Chargers: {markerInfo.ev_level2_evse_num}</p>
        <p># of Level 3 Chargers: {markerInfo.eev_dc_fast_num}</p>
        {/* <button value={{lat: markerInfo.latitude, lng: markerInfo.longitude}}  */}
        <InfoBoxButton 
          event={markerInfo} 
          lat={markerInfo.latitude} 
          lng={markerInfo.longitude} 
          name={markerInfo.station_name} 
          addr={markerInfo.street_address} 
          city={markerInfo.city} 
          state={markerInfo.state} 
          zip={markerInfo.zip}
          level1={markerInfo.ev_level1_evse_num}
          level2={markerInfo.ev_level2_evse_num}
          level3={markerInfo.ev_dc_fast_num}/>
        
      </div>
    </InfoWindow> )}
    </GoogleMap>

  );
}


