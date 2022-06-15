import React, { Component } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Route from "./Route";
import { fetchDataById } from "../util/Dao";
import GeojsonLayer from "./GeoJsonLayer";

import VehiclesMarkers from "./VehiclesMarkers";

const method = 'GET';
const url = 'https://city.dozor.tech/data?t=1';
const headers = {
  cookie: 'JSESSIONID=6B2A8F84CD5B324CB5219EE44D5ED52D;',
  host: 'city.dozor.tech'
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
    // fetch({ method, url, headers })
    fetch({method, url, headers})
      .then(res => res.json())
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
          {coordinates.map( i =>{ 
            return(<Marker key = { i.id } position={i.loc}/>)})}
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
