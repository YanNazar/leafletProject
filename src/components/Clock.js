import React from "react";
import { RequestToAPI } from "../RequestToAPI";


export class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {letlng: RequestToAPI()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        100000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        letlng: RequestToAPI()
      });
    }
  
    render() {
      return (
        <div>
          <h2>{this.state.letlng.toString()}.</h2>
        </div>
      );
    }
  }
  