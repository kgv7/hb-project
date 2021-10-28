import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Loading from "./Loading";
// https://react-google-maps-api-docs.netlify.app/#

export default function Map() {
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA0gIQR2q797geP5awSYP6wPrC17XR9MoY",
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/charging-locations")
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);
        setLoading(false);
      });
  }, []);

  console.log(mapData)

  if (loadError) {
    return <h3>There was an error loading the map</h3>;
  }

  if (loading || !isLoaded) {
    return <Loading />;
  }

  return (
    <GoogleMap
      center={{ lat: 34.0522, lng: -118.2437 }}
      mapContainerStyle={{ width: "600px", height: "400px" }}
      zoom={12}
    >
      {mapData.map((dataPoint) => (
        <Marker
          key={dataPoint.id}
          position={{ lat: dataPoint.latitude, lng: dataPoint.longitude }}
        />
      ))}

      {mapData.map((dataPoint) => (
        <InfoWindow
          
        />
      ))}
    </GoogleMap>
  );
}
