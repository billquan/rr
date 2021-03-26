import React, { Component } from "react";

import AdminService from "../services/admin.service";
import { Table, Button, CardGroup, Card} from "react-bootstrap";
import { Link } from "react-router-dom";


function compare( a, b ) {
    if ( a[1].businessName.toUpperCase() < b[1].businessName.toUpperCase()){
        return -1;
    }
    if ( a[1].businessName.toUpperCase() > b[1].businessName.toUpperCase() ){
        return 1;
    }
    return 0;
}

export default class BoardAdmin extends Component {
    constructor() {
        super();
        this.state = {
          courseApplications: [],
          businesses:[]
        };
      }

    componentDidMount() {
        AdminService.getBusinessAccounts().then(
            response => {
                this.setState({
                    businesses: response.data.sort(compare)
                });
                console.log(this.state.businesses);
                console.log(this.state.businesses.length);
            },
        );
    }
    

      
      render() {
        return (
          <div>
            {/* Title */}
            <h1>Admin Space</h1>
    
            {/* Buttons */}
            <div>
            <CardGroup>
              <Card style={{ width: '18rem' }}>
              
              <Card.Body>
              <Card.Title>Course Approval</Card.Title>
              <Card.Text>

              These are courses submitted by facilitors, please review carefully.
Once a decision is made, the system will automatically send an email to inform the applicant
              </Card.Text>
              <Button href="adminApproval/courses">Check the List</Button>
              </Card.Body>
              </Card> 

    
              <Card style={{ width: '18rem' }}>
              
              <Card.Body>
              <Card.Title>Business Approval</Card.Title>
              <Card.Text>
              These are Businesses registered by users, please review carefully.
Once a decision is made, the system will automatically send an email to inform the applicant
              </Card.Text>
              <Button href="adminApproval/businesses">Check the List</Button>
              </Card.Body>
              </Card> 



             

              </CardGroup>
              


    
   
            </div>

              <p>  </p>

            <div>
              <h3>Business Account List</h3>
              </div>
          <p>  </p>
              {this.state.businesses.map((business) => {
                      return (
                          <div>
                          <h5>
                          <Link to={`/admin/${business[0]._id}`}>
                      {business[1].businessName}
                  </Link>
                      </h5>
                      <p>
                      <b>Business Structure: </b>
                      {business[1].businessStructure}
                  </p>
                  <p>
                  <b>Phone: </b>
                  {business[1].phone}
              </p>
                  </div>
                  );
                  })}







            

          </div>
        );
      }
    
}