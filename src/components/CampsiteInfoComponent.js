import React, { Component } from "react";
import { CAMPSITES } from "../shared/campsites";

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  }

  render() {
    return (
      <div className="row">
        <div>Hello world</div>
      </div>
    );
  }
}

export default CampsiteInfo;
