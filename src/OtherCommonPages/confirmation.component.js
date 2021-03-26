import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    componentDidMount() {
        AuthService.confirm(
            this.props.match.params.token
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: false
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage
                });
            }
        );

    }
    render() {
        return (
            <div className="col-md-12">
            <div className="card card-container">


            <Form
        onSubmit={this.handleRegister}
        ref={c => {
            this.form = c;
        }}
    >


            <div
                >
                {this.state.message}
                </div>



        </Form>
        </div>
        </div>
    );
    }
    
    
}