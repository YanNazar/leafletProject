import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Route from "./Route";
import { fetchDataById } from "../util/Dao";
import GeojsonLayer from "./GeoJsonLayer";

import VehiclesMarkers from "./VehiclesMarkers";

class Map extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     error: null,
  //     isLoaded: false,
  //     coordinates: []
  //   }
  // }
  // componentDidMount() {
  //   console.log("did mount");
  //   fetch('https://city.dozor.tech/data?t=2')
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           coordinates: result.data[0].dvs
  //         });
  //         console.log(this.coordinates);
  //       },
  //       (error) => {
  //         this.setState({
  //           error
  //         });
  //       }
  //     )
  //   console.log("loaded");
  //   console.log(this.state.coordinates);
  // }

  render() {
    const data = fetchDataById(this.props.checkedRouteList);

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
        {data.map(f => {
          return (<Route key={f.properties.id} waypoints={f.geometry.coordinates} />)
        })}
        {/* <GeojsonLayer url={url} headers = {headers} method ={method}/> */}
        {/* {isLoaded && coordinates.map(i => {
          return (
            <Marker key={i.id} position={i.loc}>
              <Popup><div>{i.gNb}</div></Popup>
            </Marker>
          )
        })} */}
        {data.map(i => {
          return (<VehiclesMarkers checkedRoute={i.properties.routeNumber} />)
        })}
      </MapContainer>

    )

  }

}
export default Map;
