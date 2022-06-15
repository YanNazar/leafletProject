import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Route from "./Route";

import VehiclesMarkers from "./VehiclesMarkers";

class Map extends Component {
 
  render() {
    const checked = this.props.checkedRouteList;
    const data = this.props.routeList;
    console.log(data);
    return (
      <MapContainer
        doubleClickZoom={false}
        id="mapId"
        zoom={5}
        center={[48.70, 23.64]}
      >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {checked.map(f => {
          return (<Route key={data[f].properties.id} waypoints={data[f].geometry.coordinates} />)
        })}
        {checked.length > 0 && data.map(i => {
          return (<VehiclesMarkers checkedRoute={i.properties.routeNumber} />)
        })}
      </MapContainer>

    )

  }

}
export default Map;
