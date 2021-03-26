import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'test/all')
    }

    getUserBoard() {
        return axios.get(API_URL + 'test/user', { headers: authHeader() });
    }

    registerBusiness(id,businessStructure,businessName,ABN,TFN,RGSTStatus, PII,PLI,address,phone,website,email,description) {

        const data =JSON.stringify(
            {
                "userId":id,
                "businessStructure":businessStructure,
                "businessName":businessName,
                "ABN":ABN,
                "TFN":TFN,
                "registeredGST": RGSTStatus,
                "professionalIndemnityInsurance":PII,
                "publicLiabilityInsurance":PLI,
                "businessAddress":address,
                "phone":phone,
                "website":website,
                "email":email,
                "logoImage":"url",
                "decriptionOfBusiness":description,
                "styleOfCourse":"nostyle",
                "refereeContacts":
                    [
                        {"name":"Bill","phone":"0312333","email":"Bill@gmail.com","address":"secret"}
                    ],
                "facilitators":
                    [
                        {"name":"Bill","phone":"0312333","email":"Bill@gmail.com","workingWithChildren":false},
                        {"name":"Haowei","phone":"0312323","email":"Bill2@gmail.com","workingWithChildren":true}
                    ]
            }
        );
        const header={ headers: authHeader()};

        return axios.post(API_URL+'user/registerBusiness',
            data,
            header
        );
    }


    enrollCourse(userId,courseId,cost,payerId,orderId){
        console.log(userId);
        const data=JSON.stringify({
            "userId":userId,
            "courseId":courseId,
            "cost":cost,
            "payerId":payerId,
            "orderId":orderId,
        });
        console.log(data);
        return axios.post(API_URL + 'enroll', data, { headers: authHeader() });
    }
}

export default new UserService();