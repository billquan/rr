import React, { Component } from "react";
import CourseApplicationList from "./CourseApplicationList";

class AdminCourseApproval extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        {/* Heading */}
        <h1>Course Approvals</h1>

        <CourseApplicationList />
      </div>
    );
  }
}

export default AdminCourseApproval;
