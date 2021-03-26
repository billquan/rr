const express = require('express');
const router = express.Router();
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const db = require("../models");
const User = db.user;
const Course = db.course;
const Category = db.category;
const Business = db.business;
const Role = db.role;
const Payment = db.payment;


function environment() {
    let clientId = 'AbbtfecBeODkTGclTYhScc1J_MrroFd1g6XJ0gRGwoHXY-Lef2GmgiRaRtgeIISolOCCfB6XmqDAzQHB'; //Same one used on the PayPal button
    let clientSecret = 'EJtXF97xYGSDYBPk9y-UU3pYnlDbjUerBkNWYvUJ5RDXAM4k6hSNfiGN7RuWrnQdpIMgM2NhUD0beLs0'; //Obtained from console

    //This is set to sandbox, you would set this to the production method.
    return new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId, clientSecret
    );
}

function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

router.post("/", async(req, res) => {
    const orderId = req.body.orderId;
    const payerId = req.body.payerId;
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    const cost = req.body.cost;
    console.log(req.body);
    let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);
    try {
        //This queries the Orders API with your order id in the request
        let order = await client().execute(request);
        console.log("Status Code: " + order.create_time);
        //Check if the orderId has been used before
        Payment.findOne({orderId:orderId}).exec((err,payment)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (payment){
                res.status(500).send({ message: "It seems you are using a history order ID" });
                return;
            }
        });

        if (order.result.status === "COMPLETED") {
            //Enroll the member into the course
            User.findById(userId).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user){
                    res.status(500).send({ message: "User not found" });
                    return;
                }
                Course.findById(courseId).exec((err, course) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    if (!course){
                        res.status(500).send({ message: "Course not found" });
                        return;
                    }
                    course.count+=1;
                    course.enrolledMembers.push({userId:user._id,username:user.username,email:user.email});
                    course.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        user.courseEnrolledIn.push(course._id);
                        user.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            //Store the payment history
                            const payment = new Payment({
                                userId:userId,
                                cost:cost,
                                courseId:courseId,
                                payerId:payerId,
                                orderId:orderId
                            });
                            payment.save(err => {
                                if (err) {
                                    res.status(500).send({message: err});
                                    return;
                                }
                                res.status(200).send({
                                    "status": "completed"
                                })
                            });

                        });
                    });

                });

            });

        }
        //If the payment exists and the transaction isn't approved.
        else if (order.result.status !== "COMPLETED") {
            res.status(400).send({
                "status": "unsuccessful",
                "description": "This is likely due to your transaction not being approved"
            })
        }
    } catch (err) {
        //Catch any application errors in the code.
        //Not to be confused with a declined transaction
        console.log(err)
        res.status(500).send({
            "status": "error",
            "description": "An internal server error occured"
        });
    }
});
module.exports = router;