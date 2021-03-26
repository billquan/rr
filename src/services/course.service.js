import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://signallingserver.us-east-2.elasticbeanstalk.com/courses/';

class CourseService {
    getHistoryCourses(userId) {
        return axios.get(API_URL + 'getHistoryCourses/'+userId);
    }
}

export default new CourseService();