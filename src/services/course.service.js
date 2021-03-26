import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/courses/';

class CourseService {
    getHistoryCourses(userId) {
        return axios.get(API_URL + 'getHistoryCourses/'+userId);
    }
}

export default new CourseService();