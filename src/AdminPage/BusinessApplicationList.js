import React, { Component } from "react";
import { Button, Form ,Accordion,Card} from "react-bootstrap";
import AdminService from "../services/admin.service";

class BusinessApplicationList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],

    };
  }

  componentDidMount() {
    this.getApplications();
}
  approve(id){
    console.log(id);
    AdminService.approveBusinessApplication(id).then(()=>{
      this.getApplications();
    })
  }

  deny(id){
    console.log(id);
    AdminService.denyBusinessApplication(id).then(()=>{
      this.getApplications();
    })
  }

  getApplications(){
    AdminService.getBusinessApplications().then(
        (response) => {
          this.setState({
            data: Array.from(response.data)
          });
          console.log(this.state.data);
        });
  }




  render() {
    return (
        <div>
        {/* Map each value */}

    {this.state.data.map((business) => {
      return (

          <Accordion defaultActiveKey="0">
      <Card>
      <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
          {business[1].businessName}  -  {business[0].username}
          </Accordion.Toggle>
          <Button className="float-right" variant="danger" onClick={() => this.approve(business[0]._id)}>
      Deny
      </Button>
      <Button className="float-right" variant="primary" onClick={() => this.deny(business[0]._id)}>
      Approve
      </Button>

      </Card.Header>
      <Accordion.Collapse eventKey="0">
          <Card.Body>
          <p>
          <b>Business Name: </b>
      {business[1].businessName}
    </p>
      <p>
      <b>User Name: </b>
      {business[0].username}
    </p>
      <p>
      <b>Business Description: </b>
      {business[1].decriptionOfBusiness}
    </p>
      <p>
      <b>Business Structure: </b>
      {business[1].businessStructure}
    </p>
      <p>
      <b>ABN: </b>
      {business[1].ABN}
    </p>
      <p>
      <b>TFN: </b>
      {business[1].TFN}
    </p>
      <p>
      <b>Registered GST: </b>
      {business[1].registeredGST}
    </p>
      <p>
      <b>Professional Indemnity Insurance: </b>
      {business[1].professionalIndemnityInsurance}
    </p>
      <p>
      <b>Public Liability Insurance: </b>
      {business[1].publicLiabilityInsurance}
    </p>
      <p>
      <b>Business Address: </b>
      {JSON.stringify(business[1].businessAddress)}
    </p>
      <p>
      <b>Phone: </b>
      {business[1].phone}
    </p>
      <p>
      <b>Website: </b>
      {business[1].website}
    </p>
      <p>
      <b>Email: </b>
      {business[1].email}
    </p>
      <p>
      <b>Style Of Course: </b>
      {business[1].styleOfCourse}
    </p>
      <p>
      <b>Referee Contacts: </b>
      {JSON.stringify(business[1].refereeContacts)}
    </p>
      <p>
      <b>Facilitators: </b>
      {JSON.stringify(business[1].facilitators)}
    </p>
</Card.Body>
      </Accordion.Collapse>
      </Card>
      </Accordion>
    );
    })}
  </div>
    );
  }
}

export default BusinessApplicationList;
