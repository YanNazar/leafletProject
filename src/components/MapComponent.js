import React, { Component } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Route from "./Route";
import { fetchDataById } from "../util/Dao";
import GeojsonLayer from "./GeoJsonLayer";

import VehiclesMarkers from "./VehiclesMarkers";

const requestOptions = {
  method: 'GET',
  headers : {
    'Cookie': 'gts.web.uuid=25508073-D039-4AA8-934C-F21ECA9C1313; gts.web.city=zhytomyr; gts.web.google_map.center.lon=50.254023; gts.web.google_map.center.lat=28.662694; gts.web.google_map.zoom=13; JSESSIONID=1FDF28C96D6BDA7460173C20FBE9A04D'
  }
}

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      coordinates: []
    }
  }
  componentDidMount() {
    console.log("did mount");
    fetch('https://city.dozor.tech/data?t=2', requestOptions)
      .then(res =>  res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            coordinates: result.data[0].dvs[0]
          });
          console.log(this.coordinates);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    console.log("loaded");
    console.log(this.state.coordinates);
  }

  render() {
    const { error, isLoaded, coordinates } = this.state;
    const data = fetchDataById(this.props.checkedRouteList);
    // console.log(this.state.coordinates);
    if (error) {
      console.log(error.message);
    }
    if (isLoaded) {
      console.log(coordinates)
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
          <Marker key = { coordinates.id } position={coordinates.loc}/>)
        </MapContainer>

      )
    } else {
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
        </MapContainer>
      )
    }
  }

}
export default Map;
