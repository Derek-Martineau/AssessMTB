import React, { Component } from "react";
import ReactDOM from "react-dom";

class CallParks extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    const response = await fetch(`http://localhost:8081/parks/trailparks`);
    const json = await response.json();
    this.setState({ data: json });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map(el => (
            <li>
              {el.parkName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CallParks;