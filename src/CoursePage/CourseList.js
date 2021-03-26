import React, { Component } from "react";
import axios from "axios";
import CourseTile from "./CourseTile";

function compare( a, b ) {
    if ( new Date(a.startDate) < new Date(b.startDate) ){
        return -1;
    }
    if ( new Date(a.startDate) > new Date(b.startDate) ){
        return 1;
    }
    if ( new Date(a.startTime) > new Date(b.startTime) ){
        return -1;
    }
    if ( new Date(a.startTime) < new Date(b.startTime) ){
        return 1;
    }
    return 0;
}
class CourseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      description: "",
      imgUrl: "",
      courseIds: [],
      courses: [],
    };

    this.getCourses = this.getCourses.bind(this);
  }

  // Retrieve all the courses in the database, and add all the courses to the state
  componentDidMount() {
    // Retrieve an array of courseIds for a given category
    axios
      // *** The following commented line is needed for dynamic routes ***
      .get(
        `http://localhost:5000/categories/find/${this.props.match.params.category}`
      )
      .then((response) => {
        this.setState({
          category: response.data[0].category,
          description: response.data[0].description,
          imgUrl: response.data[0].imgUrl,
          courseIds: response.data[0].courses,
        });
        this.getCourses(); // This is a proceeding function
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCourses() {
    // Retrieve all the courses given the course's '_id'
    this.state.courseIds.forEach((courseId) => {
      axios
        .get(`http://localhost:5000/courses/${courseId}`)
        .then((response) => {
          this.setState({
            courses: this.state.courses.concat(response.data)
          });
          //console.log(response.data);
        });
    });
    this.setState({
          courses: this.state.courses.sort(compare)
    });

  }

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.category}</h1>
          <img src={this.state.imgUrl} alt="" />
          <p>{this.state.description}</p>
        </div>
        <div className="row row-cols-1 row-cols-md-2">
          {this.state.courses.map((course) => {
            return (
              <CourseTile
                category={this.props.match.params.category}
                title={course.title}
                description={course.description}
                key={course._id}
                id={course._id}
                  startDate={course.startDate}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CourseList;
