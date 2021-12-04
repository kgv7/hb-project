import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
  MarkerClusterer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Loading from "./Loading";
import InfoBoxButton from "./InfoBox";
// import { propTypes } from "react-bootstrap/esm/Image";
// https://react-google-maps-api-docs.netlify.app/#

const googleLibraries = ['places']

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function createKey(location) {
  console.log(location)
  return location.lat + location.lng
}

const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
]


export default function Map(props) {
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
        console.log(typeof data)
        console.log(data)
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
  console.log(markerInfo)



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

    {/* <MarkerClusterer options={options}>
      {(clusterer) => 
        mapData.map((dataPoint) => (
          <Marker
            key={createKey(dataPoint)}
            // key={dataPoint.id}
            position={{ lat: dataPoint.latitude, lng: dataPoint.longitude }}
            onClick={() => {getInfo(dataPoint)}}
            clusterer= {clusterer}
          />
        ))
      }; */}
    
    <MarkerClusterer options={options}>
          {(clusterer) =>
            mapData.map((location) => (
              <Marker 
                position={{ lat: location.latitude, lng: location.longitude }} 
                clusterer={clusterer} 
                onClick={() => {getInfo(location)}} />
            ))
          }
          
  </MarkerClusterer>

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
        <p>Hours: {markerInfo.access_days_time}</p>
        <p># of Level 1 Chargers: {markerInfo.ev_level1_evse_num}</p>
        <p># of Level 2 Chargers: {markerInfo.ev_level2_evse_num}</p>
        <p># of Level 3 Chargers: {markerInfo.eev_dc_fast_num}</p>
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



// dragend event - get center of map, get all the zip codes of the circle 


