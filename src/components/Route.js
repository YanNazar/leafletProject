import L, { icon } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  // iconUrl: "vehicleMark.png",
  iconAnchor: [10, 28],
  iconSize: [20,30]
});

const createRoutineMachineLayer = (props) => {

  console.log(props);
  const routingControl = L.Routing.control({
    waypoints: props.waypoints,
    draggableWaypoints: false,
    addWaypoints: false,
    show: false, 
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  })
  return routingControl;
}

const Route = createControlComponent(createRoutineMachineLayer);

export default Route;

