import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://signallingserver.us-east-2.elasticbeanstalk.com/api/admin/';

class AdminService {


    getCourseApplications(){
        const header={ headers: authHeader()};

        return axios.get(API_URL+'courseApplications',
            header
        );
    }

    getBusinessApplications(){
        const header={ headers: authHeader()};

        return axios.get(API_URL+'businessApplications',
            header
        );
    }

    approveCourseApplication(id) {

        const header={ headers: authHeader()};

        const data =JSON.stringify({
            "courseId":id,
            "approve":true
        });
        return axios.post(API_URL+'approveCourse',
            data,
            header
        );
    }
    denyCourseApplication(id) {

        const header={ headers: authHeader()};

        const data =JSON.stringify({
            "courseId":id,
            "approve":false
        });
        return axios.post(API_URL+'approveCourse',
            data,
            header
        );
    }

    approveBusinessApplication(id) {

        const header={ headers: authHeader()};

        const data =JSON.stringify({
            "userId":id,
            "approve":true
        });
        return axios.post(API_URL+'approveBusiness',
            data,
            header
        );
    }
    denyBusinessApplication(id) {

        const header={ headers: authHeader()};

        const data =JSON.stringify({
            "userId":id,
            "approve":false
        });
        return axios.post(API_URL+'approveBusiness',
            data,
            header
        );
    }

    getBusinessAccounts(){
        return axios.get(API_URL + 'getBusinessAccounts', { headers: authHeader() });
    }
    getBusinessCoursesInAdminPage(userId){
        const data=JSON.stringify({
            "userId":userId
        });
        return axios.post(API_URL + 'viewCoursesInAdminPage', data, { headers: authHeader() });
    }
    getBusinessOneCourseInAdminPage(userId,courseId){
        const data=JSON.stringify({
            "userId":userId,
            "courseId":courseId
        });
        return axios.post(API_URL + 'viewOneCourseInAdminPage', data, { headers: authHeader() });
    }

}

export default new AdminService();