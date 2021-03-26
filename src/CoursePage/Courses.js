import React, { Component } from "react";
import CategoryList from "./CategoryList";

class Courses extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Categories</h1>
        <br />

        <CategoryList />
      </div>
    );
  }
}

export default Courses;
