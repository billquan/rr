import React, { Component } from "react";
import { Table, Button, Form ,Accordion,Card} from "react-bootstrap";

import AdminService from "../services/admin.service";


class CourseApplicationList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    
    };
  }
  approve(id){
      console.log(id);
      AdminService.approveCourseApplication(id).then(()=>{
            this.getApplications();
        });
    }

    deny(id){
        console.log(id);
        AdminService.denyCourseApplication(id).then(()=>{
            this.getApplications();
        });

    }

  componentDidMount() {
      this.getApplications();
  }

  getApplications(){
      AdminService.getCourseApplications().then((response) => {
          this.setState({
              data: Array.from(response.data),
          });
          console.log(this.state.data);
      });
  }




 

  render() {
    return (
      <div>
        {/* Map each value */}

        {this.state.data.map((singleCourse) => {
          return (

            <Accordion defaultActiveKey="0">
            <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {singleCourse.title}
            </Accordion.Toggle>
            <Button className="float-right" variant="danger" onClick={() => this.deny(singleCourse._id)}>
                Deny
                </Button>
                <Button className="float-right" variant="primary" onClick={() => this.approve(singleCourse._id)}>
                Approve
                </Button>

                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body><p>
              <b>Course ID: </b>
          {singleCourse._id}
        </p>
          <p>
          <b>Application date: </b>
          {singleCourse.createdAt}
        </p>
          <p>
          <b>Description: </b>
          {singleCourse.description}
        </p>
          <p>
          <b>Facilitator: </b>
          {singleCourse.facilitator}
        </p>
          <p>
          <b>Start Date: </b>
          {singleCourse.startDate}
        </p>
          <p>
          <b>Address 1: </b>
          {singleCourse.location.address1}
        </p>
          <p>
          <b>Address 2: </b>
          {singleCourse.location.address2}
        </p>
          <p>
          <b>City: </b>
          {singleCourse.location.city}
        </p>
          <p>
          <b>State: </b>
          {singleCourse.location.state}
        </p>
          <p>
          <b>Zip: </b>
          {singleCourse.location.postCode}
        </p>
          <p>
          <b>Cost: </b>
          {singleCourse.cost}
        </p>
          <p>
          <b>Max Members: </b>
          {singleCourse.maxMembers}
        </p></Card.Body>
            </Accordion.Collapse>
            </Card>
            </Accordion>
          );
        })}
      </div>
    );
  }
}

export default CourseApplicationList;
