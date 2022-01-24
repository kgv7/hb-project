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

const googleLibraries = ['places']

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function createKey(location) {
  console.log(location)
  return location.lat + location.lng
}



export default function Map(props) {
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [center, setNewCenter] = useState({lat: 34.0522, lng: -118.2437})
  const [bounds, getBounds] = useState(null)
  // const googleMapAPILibraries = ['places']
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyALQgRAEJ9wIRHd24DhxdnnWmcVgAzBUlo",
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
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={14}
      // onBoundsChanged={()=> {getBounds(LatLngBounds); console.log(bounds)}}
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
          width: `40%`,
          height: `5%`,
          padding: `0`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.6)`,
          fontSize: `16px`,
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
    
    <MarkerClusterer 
      options={options}
    >
          {(clusterer) =>
            mapData.map((location) => (
              <Marker 
                position={{ lat: location.latitude, lng: location.longitude }} 
                clusterer={clusterer} 
                onClick={() => {getInfo(location)}} />
            ))}
  
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
      <div className="infobox-text" style={divStyle}>
        <div className="infobox-header"><h5 className="station-name">{markerInfo.station_name}</h5>
        <p><strong>{markerInfo.street_address},</strong></p> 
           <p> <strong>{markerInfo.city}, {markerInfo.state} {markerInfo.zip}</strong></p>
        {/* <p>Hours: {markerInfo.access_days_time}</p></div> */}
      </div>
        <div className="charger-info"><p># of Level 1 Chargers: {markerInfo.ev_level1_evse_num}</p>
        <p># of Level 2 Chargers: {markerInfo.ev_level2_evse_num}</p>
        <p># of Level 3 Chargers: {markerInfo.eev_dc_fast_num}</p></div>
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


