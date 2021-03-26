import React, { Component } from "react";
import axios from "axios";
import CategoryTile from "./CategoryTile";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  // Retrieve all the categories in the database, and add all the categories to the state

  componentDidMount() {
    axios
      .get("http://localhost:5000/categories/")
      .then((response) => {
        this.setState({ categories: response.data });
        // console.log(response.data); // To see the data, ### Remove once done
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="col">
          {/* Each object is called "individualCategory because the field for the object is also called 'category'" */}
          {this.state.categories.map((individualCategory) => {
            return (
              <CategoryTile
                category={individualCategory.category}
                key={individualCategory._id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CategoryList;
