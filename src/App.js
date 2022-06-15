import "./styles.css";
import "leaflet/dist/leaflet.css";
import React, { Component } from "react";

import CheckboxList from "./components/CheckboxList"
import Map from "./components/MapComponent";

export class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checkedRouteList: [],
      routeList: [],
    }
  }
  componentDidMount() {
    fetch('data.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            routeList: result.features
          });
          console.log(this.state.routeList);
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    console.log("loaded");
    console.log(this.state.routeList);
  }
  render() {
    return (
      <div className="App">
        <Map
          routeList={this.state.routeList}
          checkedRouteList={this.state.checkedRouteList}
        />
        <CheckboxList
          routeList={this.state.routeList}
          checkedRouteList={this.state.checkedRouteList}
          onCheckedListChange={this.handleChange}
        />
      </div>
    )
  }
  handleChange(value) {
    const currentIndex = this.state.checkedRouteList.indexOf(value);
    const newChecked = [...this.state.checkedRouteList];

    if (currentIndex === -1) {
      newChecked.push(value);

    } else {
      newChecked.splice(currentIndex, 1);
    }
    newChecked.sort(function (a, b) {
      return a - b;
    });
    this.setState({ checkedRouteList: newChecked });
  };


}
export default App;