import React from "react";
import { Link } from "react-router-dom";

function CategoryTile(props) {
  return (
    <div className="col mb-4">
      <div className="card">
        <h3>
          <Link to={`/courses/${props.category}`}>{props.category}</Link>
        </h3>
      </div>
    </div>
  );
}

export default CategoryTile;
