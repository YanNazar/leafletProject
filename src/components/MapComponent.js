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
    fetch("www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            coordinates: result
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
    // const data = this.state.coordinates;
    // console.log(this.state.coordinates);
    if (error) {
      return <div>Помилка: {error.message}</div>;
    } else if (isLoaded) {
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
          {/* {this.state.isLoaded && data.map(f => {
          return (<Route key={f.properties.id} waypoints={f.geometry.coordinates} />)
        })} */}
          {/* <GeojsonLayer url={url} headers = {headers} method ={method}/> */}
          <Marker position={[coordinates.lat, coordinates.lng]} />
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
