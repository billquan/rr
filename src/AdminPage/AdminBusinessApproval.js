import React, { Component } from "react";
import { Button,Accordion,Card } from "react-bootstrap";
import BusinessApplicationList from "./BusinessApplicationList";

class AdminBusinessApproval extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleClose(){
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        {/* Heading */}
        <h1>Business Approvals</h1>

        <BusinessApplicationList />

      </div>
    );
  }
}

export default AdminBusinessApproval;
