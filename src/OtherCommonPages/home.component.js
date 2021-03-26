import React, { Component } from "react";

import UserService from "../services/user.service";
import { Carousel } from "react-bootstrap";
import logo from "../assets/Logo2.PNG"
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://picsum.photos/1000/299"
      
    
    />
    <Carousel.Caption>
      <h1 style={{color: "lightblue"}}>Welcome to Reboot Retreats</h1>

    
      
      <p>Reboot Retreats offers a variety of topic driven self-help weekend immersives to help people reconnect with their passions, get unstuck, and learn self-care..</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      //src="https://picsum.photos/1000/300"
      src={logo} 
     
    />

    <Carousel.Caption>
      
      
    </Carousel.Caption>
  </Carousel.Item>
 
</Carousel>
            </div>
    );
    }
}