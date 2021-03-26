const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/user/registerBusiness",[authJwt.verifyToken], controller.registerBusiness);
    app.post("/api/business/uploadCourse",[authJwt.verifyToken, authJwt.isBusiness],controller.uploadCourse);
    app.get("/api/business/viewCourses",[authJwt.verifyToken, authJwt.isBusiness],controller.viewCourses);
    app.post("/api/business/viewOneCourse", [authJwt.verifyToken, authJwt.isBusiness],controller.viewOneCourse);
    app.post("/api/admin/approveCourse", [authJwt.verifyToken, authJwt.isAdmin],controller.approveCourse);
    app.post("/api/admin/approveBusiness", [authJwt.verifyToken, authJwt.isAdmin],controller.approveBusiness);
    app.get("/api/admin/getBusinessAccounts", [authJwt.verifyToken, authJwt.isAdmin],controller.getBusinessAccounts);
    app.get("/api/admin/courseApplications", [authJwt.verifyToken, authJwt.isAdmin],controller.courseApplications);
    app.get("/api/admin/businessApplications", [authJwt.verifyToken, authJwt.isAdmin],controller.businessApplications);
    app.post("/api/admin/viewCoursesInAdminPage",[authJwt.verifyToken, authJwt.isAdmin],controller.viewCoursesInAdminPage);
    app.post("/api/admin/viewOneCourseInAdminPage", [authJwt.verifyToken, authJwt.isAdmin],controller.viewOneCourseInAdminPage);
 
    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/facilitator",
        [authJwt.verifyToken, authJwt.isBusiness],
        controller.facilitatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};