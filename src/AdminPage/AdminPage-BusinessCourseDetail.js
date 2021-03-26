import React, { Component } from "react";
import axios from "axios";
import "../styles/CourseDetail.css";
import AdminService from "../services/admin.service";
function compareUsername( a, b ) {
    if ( a.username < b.username ){
        return -1;
    }
    if ( a.username > b.username ){
        return 1;
    }
    return 0;
}
class BusinessCourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        AdminService.getBusinessOneCourseInAdminPage(this.props.match.params.accountId, this.props.match.params.courseId).then(
            response => {
                var course=response.data[0];
                var enrolledMembers=course.enrolledMembers;
                enrolledMembers.sort(compareUsername);
                course.enrolledMembers=enrolledMembers;
                this.setState({
                    course: course
                });
                console.log(this.state.course);
            },
        ).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
            <img src="https://picsum.photos/1000/500" alt="" />
            {this.state.course ? (

                    <div>
                    <p>
                    <b>Title: </b>
        {this.state.course.title}
    </p>
        <p>
        <b>Description: </b>
        {this.state.course.description}
    </p>
        <p>
        <b>Facilitator: </b>
        {this.state.course.facilitator}
    </p>
        <p>
        <b>Date: </b>
        {new Date(this.state.course.startDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/').concat(
            " - ",
            new Date(this.state.course.endDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/')
        )}
    </p>
        <p>
        <b>Time: </b>
        {new Date(this.state.course.startTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'}).concat(
            " - ",
            new Date(this.state.course.endTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'})
        )}
    </p>
        <p>
        <b>Repeat Day: </b>
        {this.state.course.repeatDay.join(', ')}
    </p>
        <p>
        <b>Location: </b>
        {this.state.course.location.address1.concat(
            ", ",
            this.state.course.location.address2,
            ", ",
            this.state.course.location.city,
            ", ",
            this.state.course.location.state,
            ", ",
            this.state.course.location.postCode,
        )}
    </p>
        <p>
        <b>Maximum Members: </b>
        {this.state.course.maxMembers}
    </p>

        <p>
        <b>Minimum Members: </b>
        {this.state.course.minMembers}
    </p>
        <p>
        <b>Cost: </b>
        {this.state.course.cost} AUD
    </p>
        <p>
        <b>Enrolled Members: </b>
        {this.state.course.enrolledMembers.map((member) => {
            return (
                <p>{member.username.concat(
                        " / ",
                        member.email
                    )}</p>
        )})}
    </p>
        </div>

    ):null}

    </div>
    );
    }
}

export default BusinessCourseDetail;
