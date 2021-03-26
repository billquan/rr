import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://signallingserver.us-east-2.elasticbeanstalk.com/api/business/';

class UserService {

    getBusinessCourses(){
        return axios.get(API_URL + 'viewCourses', { headers: authHeader() });
    }
    getBusinessOneCourse(courseId){
        const data=JSON.stringify({
            "courseId":courseId
        });
        return axios.post(API_URL + 'viewOneCourse', data, { headers: authHeader() });
    }
    uploadCourse(genres,title,description,selectedFacilitator,startDate,endDate,startTime,endTime,selecteddays,selectedfrequency,address1,address2,city,state,zip,maxMembers,minMembers,id,cost) {

        const data =JSON.stringify({
            "category": genres,
            "title": title,
            "description": description,
            "facilitator": selectedFacilitator,
            "startDate":startDate,
            "endDate":endDate,
            "startTime":startTime,
            "endTime":endTime,
            "repeatDay":selecteddays,
            "frequency":selectedfrequency,

            "location":{
                "address1":address1,
                "address2":address2,
                "city":city,
                "state":state,
                "postCode":zip,
            },
            "maxMembers":maxMembers,
            "minMembers":minMembers,
            "promoImage":"none",
            "prerequisites":"none",
            "additionalInformation":"none",
            "businessId":id,
            "cost":cost

        });

        const header={ headers: authHeader()};

        return axios.post(API_URL+'uploadCourse',
            data,
            header
        );
    }

}

export default new UserService();