const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Course = db.course;
const Category = db.category;
const Business = db.business;
const Role = db.role;
var nodemailer = require('nodemailer');
var currentDate = new Date();
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.facilitatorBoard = (req, res) => {
    res.status(200).send("Facilitator Content.");
};


exports.registerBusiness = (req, res) => {
    User.findById(req.body.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user){
            res.status(500).send({ message: "User not found" });
            return;
        }
        // If the user has business attached, delete the business
        if (user.waitingForApproval==true && user.business){
            Business.findByIdAndDelete(user.business).exec((err, business) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
            });
        }
        user.waitingForApproval=true;
        // Create a new business and save
        const business = new Business({
            userId:user._id,
            businessStructure: req.body.businessStructure,
            businessName: req.body.businessName,
            ABN: req.body.ABN,
            TFN: req.body.TFN,
            registeredGST: req.body.registeredGST,
            professionalIndemnityInsurance: req.body.professionalIndemnityInsurance,
            publicLiabilityInsurance: req.body.publicLiabilityInsurance,
            businessAddress: req.body.businessAddress,
            phone: req.body.phone,
            website: req.body.website,
            email: req.body.email,
            logoImage: req.body.logoImage,
            decriptionOfBusiness: req.body.decriptionOfBusiness,
            styleOfCourse: req.body.styleOfCourse,
            refereeContacts: req.body.refereeContacts,
            facilitators: req.body.facilitators
        });
        business.save(err => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            user.business=business._id;
            user.save(err => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                // Send a confirmation email to the user's email address
                // The email service credential should be stored in .env file (TO DO)
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {user: 'test.haowei@gmail.com', pass: 'Root1234'}
                });
                const mailOptions = {
                    from: 'test.haowei@gmail.com',
                    to: user.email,
                    subject: 'Confirmation of business registration',
                    text: 'Hello,\n\n' + 'You have applied to be an business account with the following information: \n'
                        + 'businessStructure:' + req.body.businessStructure + '\n'
                        + 'businessName:' + req.body.businessName + '\n'
                        + 'ABN:' + req.body.ABN + '\n'
                        + 'TFN:' + req.body.tfn + '\n'
                        + 'registeredGST:' + req.body.registeredGST + '\n'
                        + 'professionalIndemnityInsurance:' + req.body.professionalIndemnityInsurance + '\n'
                        + 'publicLiabilityInsurance:' + req.body.publicLiabilityInsurance + '\n'
                        + 'businessAddress:' + req.body.businessAddress + '\n'
                        + 'phone:' + req.body.phone + '\n'
                        + 'website:' + req.body.website + '\n'
                        + 'email:' + req.body.email + '\n'
                        + 'decriptionOfBusiness:' + req.body.decriptionOfBusiness + '\n'
                        + 'styleOfCourse:' + req.body.styleOfCourse + '\n'
                        + 'refereeContacts:' + req.body.refereeContacts + '\n'
                        + 'facilitators:' + req.body.facilitators + '\n\n'
                        + 'Our admins will examine your information and inform you of the outcome within 5 business days. Thank you!' + '\n'
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message });
                        return;
                    }
                    const message = 'success to apply for business registration';
                    res.status(200).send({message:message});
                });

            });
        });

    });
};

exports.uploadCourse = (req, res) => {
    // Find the category
    Category.findOne({ category: req.body.category },(err, category) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!category){
            res.status(500).send({ message: "Category not found" });
            return;
        }

        Business.findById(req.body.businessId).exec((err, business) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!business){
                res.status(500).send({ message: "Business not found" });
                return;
            }
            // Create a new course and save
            const course = new Course({
                title: req.body.title,
                description: req.body.description,
                facilitator: req.body.facilitator,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                repeatDay: req.body.repeatDay,
                frequency: req.body.frequency,
                maxMembers: req.body.maxMembers,
                minMembers: req.body.minMembers,
                promoImage: req.body.promoImage,
                prerequisites: req.body.prerequisites,
                additionalInformation: req.body.additionalInformation,
                category: req.body.category,
                location: {
                    address1: req.body.location.address1,
                    address2: req.body.location.address2,
                    city: req.body.location.city,
                    state: req.body.location.state,
                    postCode: req.body.location.postCode
                },
                userId: business.userId,
                business: {
                    businessName: business.businessName,
                    ABN: business.ABN,
                    phone: business.phone,
                    email: business.email,
                    address: business.address,
                    decriptionOfBusiness: business.decriptionOfBusiness,
                    businessId: req.body.businessId
                },
                cost: req.body.cost,
                count: 0,
                passed: false
            });

            course.save(err => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
            });
            category.courses.push(course._id);
            category.save(err => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                User.findById(business.userId).exec((err, user) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    if (!user){
                        res.status(500).send({ message: "User not found" });
                        return;
                    }
                    // Send a confirmation email to the user's email address
                    // The email service credential should be stored in .env file (TO DO)
                    var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'test.haowei@gmail.com', pass: 'Root1234' } });
                    var mailOptions = { from: 'test.haowei@gmail.com', to: user.email, subject: 'Confirmation of course application', text: 'Hello,\n\n' + 'You have upload a course with the following information: \n'
                            + 'title:' + req.body.title + '\n'
                            + 'description:' + req.body.description + '\n'
                            + 'facilitator:' + req.body.facilitator + '\n'
                            + 'startDate:' + req.body.startDate + '\n'
                            + 'endDate:' + req.body.endDate + '\n'
                            + 'startTime:' + req.body.startTime + '\n'
                            + 'endTime:' + req.body.endTime + '\n'
                            + 'repeatDay:' + req.body.repeatDay + '\n'
                            + 'frequency:' + req.body.frequency + '\n'
                            + 'maxMembers:' + req.body.maxMembers + '\n'
                            + 'minMembers:' + req.body.minMembers + '\n'
                            + 'promoImage:' + req.body.promoImage + '\n'
                            + 'prerequisites:' + req.body.prerequisites + '\n'
                            + 'additionalInformation:' + req.body.additionalInformation + '\n'
                            + 'category:' + req.body.category + '\n'
                            + 'cost' + req.body.cost + '\n'
                            + 'location:' + req.body.location + '\n\n'
                            + 'Our admins will examine the information and inform you of the outcome within 5 business days. Thank you!' + '\n' };
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                            res.status(500).send({ message: err.message });
                            return;
                        }
                        var message = 'success to upload the course';
                        res.status(200).send({message:message});
                    });
                });


            });
        });
    });
};

exports.viewCourses = (req, res) => {
    // View courses that hasn't ended
    Course.find({userId: req.userId,endDate:{$gte:currentDate},passed: true}, (err, courses) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).json(courses);
        return;
    });
};

exports.viewOneCourse = (req, res) => {
    Course.find({userId: req.userId,endDate:{$gte:currentDate},passed: true, _id:req.body.courseId}, (err, course) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!course){
            res.status(500).send({ message: "Course not found" });
            return;
        }
        res.status(200).json(course);
        return;
    });
};

exports.viewCoursesInAdminPage = (req, res) => {
    Course.find({userId: req.body.userId,endDate:{$gte:currentDate},passed: true}, (err, courses) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).json(courses);
        return;
    });
};

exports.viewOneCourseInAdminPage = (req, res) => {
    Course.find({userId: req.body.userId,endDate:{$gte:currentDate},passed: true, _id:req.body.courseId}, (err, course) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!course){
            res.status(500).send({ message: "Course not found" });
            return;
        }
        res.status(200).json(course);
        return;
    });
};


exports.approveCourse = (req, res) => {
    // Approve the course
    if (req.body.approve == true){
        Course.findById(req.body.courseId).exec((err, course) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!course){
                res.status(500).send({ message: "Course not found" });
                return;
            }

            course.passed=true;
            course.save(err => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                User.findById(course.userId).exec((err, user) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    if (!user){
                        res.status(500).send({ message: "User not found" });
                        return;
                    }
                    // Send an email to the applicant's email address
                    // The email service credential should be stored in .env file (TO DO)
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {user: 'test.haowei@gmail.com', pass: 'Root1234'}
                    });
                    const mailOptions = {
                        from: 'test.haowei@gmail.com',
                        to: user.email,
                        subject: 'Congradulations! Your course ' + course.title + ' has been approved',
                        text: 'Hello,\n\n'
                            + 'After examination and consideration, we have approved your course ' + course.title + '. You can now view it on your facilitator page. \n'
                            + 'If you have any question, don\'t hesitate to contact us. Thank you!' + '\n'
                    };
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                            res.status(500).send({ message: err.message });
                            return;
                        }
                        const message = 'success to approve the course';
                        res.status(200).send({message:message});
                    });
                });
            });
        });
    // Deny the application
    }else if (req.body.approve == false){
        // Delete the temporary course (course application)
        Course.findByIdAndDelete(req.body.courseId).exec((err, course) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!course){
                res.status(500).send({ message: "Course not found" });
                return;
            }
            User.findById(course.userId).exec((err, user) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                if (!user){
                    res.status(500).send({ message: "User not found" });
                    return;
                }
                // Send an email to the applicant's email address
                // The email service credential should be stored in .env file (TO DO)
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {user: 'test.haowei@gmail.com', pass: 'Root1234'}
                });
                const mailOptions = {
                    from: 'test.haowei@gmail.com',
                    to: user.email,
                    subject: 'Your application for course ' + course.title + ' has been declined',
                    text: 'Hello,\n\n'
                        + 'After examination and consideration, we\'re sorry to inform you that the admins have declined your course ' + course.title + '. The reasons are as following: \n'
                        + 'There\'s typo in your course title. Please double check.' + '\n'
                        + 'If you have any question, don\'t hesitate to contact us. Thank you!' + '\n'
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message });
                        return;
                    }
                    const message = 'success to disapprove the course';
                    res.status(200).send({message:message});
                });
            });
        });
    }else{
        const message = 'invalid request';
        res.status(500).send({message: message});
    }
};

exports.approveBusiness = (req, res) => {
    // Approve the business
    if (req.body.approve == true){
        User.findById(req.body.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user){
                res.status(500).send({ message: "User not found" });
                return;
            }
            user.waitingForApproval=false;
            Role.findOne({ name: "business" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!role){
                    res.status(500).send({ message: "Role not found" });
                    return;
                }
                user.roles.push(role._id);
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    // Send an email to the applicant's email address
                    // The email service credential should be stored in .env file (TO DO)
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {user: 'test.haowei@gmail.com', pass: 'Root1234'}
                    });
                    const mailOptions = {
                        from: 'test.haowei@gmail.com',
                        to: user.email,
                        subject: 'Congradulations! Your application for business account has been approved',
                        text: 'Hello,\n\n'
                            + 'After examination and consideration, we have approved your application for a business account. You can now upload courses in your facilitator space. \n'
                            + 'If you have any question, don\'t hesitate to contact us. Thank you!' + '\n'
                    };
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                            res.status(500).send({ message: err.message });
                            return;
                        }
                        const message = 'success to approve the business registration';
                        res.status(200).send({message:message});
                    });
                });
            });

        });
    // Deny the application
    }else if (req.body.approve == false){
        User.findById(req.body.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user){
                res.status(500).send({ message: "User not found" });
                return;
            }
            user.waitingForApproval=false;
            user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            });
            Course.findByIdAndDelete(req.body.courseId).exec((err, course) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                // Send an email to the applicant's email address
                // The email service credential should be stored in .env file (TO DO)
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {user: 'test.haowei@gmail.com', pass: 'Root1234'}
                });
                const mailOptions = {
                    from: 'test.haowei@gmail.com',
                    to: user.email,
                    subject: 'Your application for business account has been declined',
                    text: 'Hello,\n\n'
                        + 'After examination and consideration, we\'re sorry to inform you that the admins have declined your application for a business account. The reasons are as following: \n'
                        + 'Your ABN is invalid. Please double check if the number is correct.' + '\n'
                        + 'If you have any question, don\'t hesitate to contact us. Thank you!' + '\n'
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message });
                        return;
                    }
                    const message = 'success to disapprove the course';
                    res.status(200).send({message:message});
                });
            });

        });
    }else{
        const message = 'invalid request';
        res.status(500).send({message: message});
    }
};

exports.getBusinessAccounts = (req, res) => {
    // Find all business accounts
    Role.findOne({ name: "business" }, (err, role) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!role){
            res.status(500).send({ message: "Role not found" });
            return;
        }

        User.find({ roles: { $in: role }},(err,users)=>{
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            var items=[];
            users.forEach(function(user, i) {
                Business.findById(user.business).exec((err, business) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    if (!business){
                        res.status(500).send({ message: "Business not found" });
                        return;
                    }
                    // Hide the passwords
                    user.password = undefined;
                    items.push([user,business]);
                    if (users.length-1 === i) {
                        done(items,res);
                    }
                });
            });
        });
    });

};

exports.courseApplications = (req, res) => {
    // Get all the course applications
    Course.find({ passed: false },(err, courses) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).json(courses);
        return;
    });
};


exports.businessApplications = (req, res) => {
    // Get all the business applications
    User.find({ waitingForApproval: true },(err, users) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        var items=[];
        users.forEach(function(user, i) {
            Business.findById(user.business).exec((err, business) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                if (!business){
                    res.status(500).send({ message: "Business not found" });
                    return;
                }
                user.password = undefined;
                items.push([user,business]);
                if (users.length-1 === i) {
                    done(items,res);
                }
            });
        });

    });
};

function done(items,res){
    res.status(200).json(items);
    return;
}
