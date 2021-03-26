const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Token = db.token;
const Business = db.business;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var crypto = require('crypto');
var nodemailer = require('nodemailer');

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        token.save(function (err) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            // Send the email
            const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'test.haowei@gmail.com', pass: 'Root1234' } });
            const mailOptions = { from: 'test.haowei@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'http://localhost:8081' + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    res.status(500).send({ message: err.message });
                    return;
                }
                var message = 'A verification email has been sent to ' + user.email + '.'
                res.status(200).send({message:message});
            });
        });

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            if (!user.isVerified){
                return res.status(401).send({
                    accessToken: null,
                    message: "Your account has not been verified."
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            // if the user is a business account
            if (user.business && !user.waitingForApproval){
                Business.findById(user.business).exec((err, business) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    if (!business){
                        res.status(500).send({ message: "Business not found" });
                        return;
                    }
                    business.userId = undefined;
                    business.ABN = undefined;
                    business.TFN = undefined;
                    business.registeredGST = undefined;
                    business.professionalIndemnityInsurance = undefined;
                    business.publicLiabilityInsurance = undefined;
                    business.courseHistory = undefined;
                    res.status(200).send({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        roles: authorities,
                        accessToken: token,
                        business:business,
                        courseEnrolledIn:user.courseEnrolledIn
                    });
                });
            }else{
                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                    courseEnrolledIn:user.courseEnrolledIn
                });
            }
        });
};

exports.refresh = (req, res) => {
    User.findById(req.userId)
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }


            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            // if the user is a business account
            if (user.business && !user.waitingForApproval){
                Business.findById(user.business).exec((err, business) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    if (!business){
                        res.status(500).send({ message: "Business not found" });
                        return;
                    }
                    business.userId = undefined;
                    business.ABN = undefined;
                    business.TFN = undefined;
                    business.registeredGST = undefined;
                    business.professionalIndemnityInsurance = undefined;
                    business.publicLiabilityInsurance = undefined;
                    business.courseHistory = undefined;
                    res.status(200).send({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        roles: authorities,
                        accessToken: token,
                        business:business,
                        courseEnrolledIn:user.courseEnrolledIn
                    });
                });
            }else{
                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                    courseEnrolledIn:user.courseEnrolledIn
                });
            }
        });
};

exports.confirmation = (req, res) => {
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send({accessToken: null, message:"The account has been verified. Please log in."});
            });
        });
    });
};