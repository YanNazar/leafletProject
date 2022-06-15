import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';

export default class VehiclesMarkers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            coordinates: [],
            timerID: 0
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
        console.log("did mount");
    }
    tick() {
        fetch(`https://city.dozor.tech/data?t=2&p=${this.props.checkedRoute}`)
            .then(res => res.json
            )
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        coordinates: result.data[0].dvs
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    render() {
        console.log(this.state.carNumbers);
        const icon = L.icon({
            iconUrl: "vehicleMark.png",
            iconAnchor: [10, 28],
            iconSize: [20, 30]
        });
        const { error, isLoaded, coordinates } = this.state;
        if (error)
            return console.log(error);
        return (
            isLoaded && coordinates.map(i => {
                return (
                    <Marker key={i.id} position={i.loc} icon={icon}>
                        <Popup key={i.id}><div>{i.gNb}</div></Popup>
                    </Marker>
                )
            })
        );
    }
}