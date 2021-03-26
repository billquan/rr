import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table,Form, Button, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminService from "../services/admin.service";
import AuthService from "../services/auth.service";



export default class BoardFacilitator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
        };


    }

    componentDidMount() {
        AdminService.getBusinessCoursesInAdminPage(this.props.match.params.accountId).then(
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

        <div className="row row-cols-1 row-cols-md-2">
            {this.state.courses.map((course) => {
                    return (
                        <div className="col mb-4">
                        <div className="card">
                        <img src="https://picsum.photos/1000/300" alt="" />
                        <div className="card-body">
                        <h5>
                        <Link to={`/admin/${this.props.match.params.accountId}/${course._id}`}>
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