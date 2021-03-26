import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
 const CLIENT = {
   sandbox:
     "AbbtfecBeODkTGclTYhScc1J_MrroFd1g6XJ0gRGwoHXY-Lef2GmgiRaRtgeIISolOCCfB6XmqDAzQHB",
   production:
     "your_production_key"
 };

 const CLIENT_ID =
   process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;
 const CURRENCY = "AUD";

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      failed: false,
      paid: false,
      error: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {

    return actions.order.create({
      purchase_units: [
        {
          description: this.props.title,
          amount: {
            currency_code: "AUD",
            value: this.props.cost
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {

    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };  
      console.log("Payment Approved: ", paymentData);
      UserService.enrollCourse(AuthService.getCurrentUser().id,this.props.courseId,this.props.cost,data.payerID,data.orderID).then(
          response => {
            if (response.data.status === "completed"){
              AuthService.refreshCurrentUser().then(
                  () => {
                    this.setState({ showButtons: false, paid: true ,failed: false});
                  },
                  error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                      loading: false,
                      message: resMessage
                    });
                  }
              );
            }else if (response.data.status === "unsuccessful"){
              this.setState({ showButtons: false, paid: false ,failed: true});
            }else{
              this.setState({ showButtons: false, error:true});
            }
            console.log(response.data);
          },
      ).catch((error) => {
        console.log(error);
      });
    });
  };

  render() {
    const { showButtons,paid, failed , error} = this.state;

    return (
      <div className="main">
        {showButtons && (
          <div>
            <div>
              <h2>Course: {this.props.title}</h2>
              <h2>Cost： {this.props.cost} AUD</h2>
            </div>

            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div className="main">
            <img alt="Happy picture here"  />
            <h2>
        Congrats! you are now enrolled in  {this.props.title}{" "}

            </h2>
          </div>
        )}

    {failed && (
    <div className="main">
        <img alt="Sad"  />
        <h2>
        Sorry, your payment seems to be failed. Please try again.
    </h2>
    <h2>
    If you meet any problem, please contact admins.
    </h2>
    </div>
    )}
    {error && (
    <div className="main">
        <img alt="Sad"  />
        <h2>
        An error has occured. We're really sorry for the inconvinience!
    </h2>
    <h2>
    If the transaction has been completed, please contact our admins. Otherwise, please try again.
    </h2>
    </div>
    )}

      </div>
    );
  }

}


 export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=${CURRENCY}`)(PaypalButton);
