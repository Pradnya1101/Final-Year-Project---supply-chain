import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./marker.css";

const checkPoints = ["Manufacturer", "Third Party", "Delivery Hub", "Customer"];

function Map({ prodData }) {
  const points = [];
  if (prodData[0][7].length !== 0) {
    points.push({ longitude: prodData[0][7], latitude: prodData[0][6] });
  }
  if (prodData[2][0].length !== 0) {
    points.push({ longitude: prodData[2][0], latitude: prodData[1][7] });
  }
  if (prodData[2][3].length !== 0) {
    points.push({ longitude: prodData[2][3], latitude: prodData[2][2] });
  }
  console.log(points)
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: Number(points[points.length-1].latitude) || 19,
    longitude: Number(points[points.length-1].longitude) || 72,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      width="full"
    >
      {points.reverse().map((point, index) => (
        <Marker
          key={index}
          latitude={Number(point.latitude)}
          longitude={Number(point.longitude)}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div className="marker temporary-marker">
            <span>{checkPoints[index]}</span>
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default Map;
