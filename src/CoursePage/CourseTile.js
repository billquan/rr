import React from "react";
import { Link } from "react-router-dom";

function CourseTile(props) {
  return (
    // <div>
    //   <h3>
    //     <Link to={`/courses/${props.category}/${props.id}`}>{props.title}</Link>
    //   </h3>
    //   <p>{props.description}</p>
    // </div>
    <div className="col mb-4">
      <div className="card">
        <img src="https://picsum.photos/1000/300" alt="" />
        <div className="card-body">
          <h5>
            <Link to={`/courses/${props.category}/${props.id}`}>
              {props.title}
            </Link>
          </h5>
            <p style={{fontSize:'87%',fontWeight: 600}}>Starting from {new Date(props.startDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/')}</p>
            
    
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseTile;
