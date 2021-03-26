import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table,Form, Button, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import BusinessService from "../services/business.service";
import AuthService from "../services/auth.service";



export default class BoardFacilitator extends Component {
    constructor(props) {
        super(props);

        this.state = {
          id: AuthService.getCurrentUser().business._id,
          courses: [],
        };


    }

    componentDidMount() {
        BusinessService.getBusinessCourses().then(
            response => {
                this.setState({
                    courses: response.data
                });
                console.log(this.state.courses);
                console.log(this.state.courses.length);
            },
        );
    }


    render() {
        return (
            <div>
            <div>
            <h1><Button variant="primary" onClick={(e) => {
            e.preventDefault();
            window.location.href='/facilitator/uploadCourse';
        }} type="button">
            Upload a course
        </Button></h1>
            </div>
            <div className="row row-cols-1 row-cols-md-2">
            {this.state.courses.map((course) => {
                    return (
                        <div className="col mb-4">
                        <div className="card">
                        <img src="https://picsum.photos/1000/300" alt="" />
                        <div className="card-body">
                        <h5>
                        <Link to={`/facilitator/${course._id}`}>
                    {course.title}
                </Link>
                    </h5>
                    <p>
                    <b>Facilitator: </b>
                    {course.facilitator}
                    </p>
                    <p>
                    <b>Date: </b>
                    {new Date(course.startDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/').concat(
                        " - ",
                        new Date(course.endDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/')
                    )}
                    </p>
                    <p>
                    <b>Time: </b>
                    {new Date(course.startTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'}).concat(
                        " - ",
                        new Date(course.endTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'})
                    )}
                    </p>
                    <p>
                    <b>Repeat Day: </b>
                    {course.repeatDay.join(', ')}
                    </p>
                    </div>
                    </div>
                    </div>
                );
                })}
            </div>
            </div>
    );
    }
    
}