import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./RegisterAndLoginPages/login.component";
import Register from "./RegisterAndLoginPages/register.component";
import Home from "./OtherCommonPages/home.component";
import Profile from "./OtherCommonPages/profile.component";
import BoardUser from "./OtherCommonPages/board-user.component";
import BoardFacilitator from "./BusinessPage/board-business.component";
import BoardAdmin from "./AdminPage/board-admin.component";
import AuthService from "./services/auth.service";
import Confirmation from "./OtherCommonPages/confirmation.component";

import CourseDetail from "./CoursePage/CourseDetail";
import CourseList from "./CoursePage/CourseList";
import Courses from "./CoursePage/Courses";

import AdminApproval from "./AdminPage/board-admin.component";
import AdminCourseApproval from "./AdminPage/AdminCourseApproval";
import AdminBusinessApproval from "./AdminPage/AdminBusinessApproval";
import BusinessRegistration from "./BusinessRegistrationPage/BusinessRegistration";
import BusinessUploadCourse from "./BusinessPage/BusinessUploadCourse"
import BusinessCourseDetail from "./BusinessPage/BusinessCourseDetail"
import AdminPageBusinessDetail from "./AdminPage/AdminPage-BusinessDetail"
import AdminPageBusinessCourseDetail from "./AdminPage/AdminPage-BusinessCourseDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showFacilitatorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showFacilitatorBoard: user.roles.includes("ROLE_BUSINESS"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showFacilitatorBoard, showAdminBoard } = this.state;
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Reboot Retreats
            </Link>

            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showFacilitatorBoard && (
                <li className="nav-item">
                  <Link to={"/facilitator"} className="nav-link">
                    Facilitator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
              <li className="navbar-item">
                <Link to="/courses" className="nav-link">
                  Courses
                </Link>
              </li>

             {currentUser && !showFacilitatorBoard && !showAdminBoard &&(
              <li className="navbar-item">
                <Link to="/businessRegistration" className="nav-link">
                  Business Registration
                </Link>
              </li>
             )}
              


            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route exact path="/facilitator" component={BoardFacilitator} />
      {showAdminBoard ? <Route path="/admin" exact component={BoardAdmin} /> : null}
              <Route path="/courses" exact component={Courses} />
              <Route path="/courses/:category" exact component={CourseList} />
              <Route
                path="/courses/:category/:id"
                exact
                component={CourseDetail}
              />


              <Route path="/adminApproval" exact component={AdminApproval} />
              <Route
                path="/adminApproval/courses"
                exact
                component={AdminCourseApproval}
              />
            

              <Route
                path="/adminApproval/businesses"
                exact
                component={AdminBusinessApproval}
              />
              <Route
                path="/businessRegistration"
                exact
                component={BusinessRegistration}
              />
              <Route
          path="/facilitator/uploadCourse"
          exact
          component={BusinessUploadCourse}
          />
          <Route
          path="/facilitator/:id"
          exact
          component={BusinessCourseDetail}
          />
          <Route
          path="/admin/:accountId"
          exact
          component={AdminPageBusinessDetail}
          />
          <Route
          path="/admin/:accountId/:courseId"
          exact
          component={AdminPageBusinessCourseDetail}
          />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;