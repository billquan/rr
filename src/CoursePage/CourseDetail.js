import React, { Component } from "react";
import axios from "axios";
import PaypalButtons from "./PaypalButton"
import "../styles/CourseDetail.css";
import { Table,Form, Button, Col, Modal } from "react-bootstrap";
import AuthService from "../services/auth.service";




class CourseDetail extends Component {
  constructor(props) {
    super(props);
      this.state = {
          showPaypal : false
      };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/courses/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          course: response.data[0],
          title: response.data[0].title,
          description: response.data[0].description,
          facilitator: response.data[0].facilitator,
          startDate: response.data[0].startDate,
          endDate: response.data[0].endDate,
            startTime: response.data[0].startTime,
            endTime: response.data[0].endTime,
            location: response.data[0].location["address1"],
            count: response.data[0].count,
          maxMembers: response.data[0].maxMembers,
          cost: response.data[0].cost,
            ID: response.data[0]._id
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

    showPaypalButtons = () => {
        this.setState({ showPaypal: true });
    };
  render() {
      const { showPaypal } = this.state;
      const currentUser = AuthService.getCurrentUser();
      let button;
      let button1;
      if (!currentUser) {
          button = <Button variant="primary" onClick = {this.showPaypalButtons}  type="button" disabled>
              You have to log in first to enroll in a course
              </Button>;
      } else if (currentUser.courseEnrolledIn.includes(this.state.ID)){
          button = <Button variant="primary" onClick = {this.showPaypalButtons}  type="button" disabled>
              You have enrolled in this course
              </Button>;
      } else{
          
          button = <Button variant="primary" onClick = {this.showPaypalButtons}  type="button">
              Buy now for ${this.state.cost}
              </Button>;
         
      }
      if (showPaypal) {
          return <PaypalButtons
          cost = {this.state.cost}
          title = {this.state.title}
          courseId = {this.state.ID}
          />;
      } else {
        return (
          <div>
            {this.state.course ? (
                    <div>
                    <img src="https://picsum.photos/1000/300" alt="" />
                <h1>{this.state.title}</h1>
                <div style={{ width: "100%" }}>
      <div style={{ width: "50%", height: 80, float: "left" }}>
      <p>Created by {this.state.facilitator}</p>

          <p>
          {new Date(this.state.course.startDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/').concat(
                  " - ",
                  new Date(this.state.course.endDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/')
              )} | {this.state.course.location.address1.concat(
              ", ",
              this.state.course.location.address2,
              ", ",
              this.state.course.location.city,
              ", ",
              this.state.course.location.state,
              ", ",
              this.state.course.location.postCode,
          )} |{" "}
          {this.state.maxMembers-this.state.count} spots available!
          </p>
          </div>
          <div
          style={{
              width: "50%",
                  height: 80,
                  float: "right",
                  display: "flex",
                  alignItems: "center",
                  // alignContent: "center"
                  justifyContent: "center",
          }}
      >


          {button}
      </div>
          <p>
          {new Date(this.state.course.startTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'}).concat(
                  " - ",
                  new Date(this.state.course.endTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'})
              )} | {this.state.course.repeatDay.join(', ')}
          </p>
          </div>

          <div>
          <p>
          <h3>Description</h3>
          {this.state.description}
      </p>
          </div>
          </div>
                ):null}
            </div>
        );
  }
      }
}

export default CourseDetail;

