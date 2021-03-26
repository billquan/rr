import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
            "roles":["user"]
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    refreshCurrentUser(){
        return axios.get(API_URL + "refresh", { headers: authHeader() }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    confirm(token) {
        return axios.post(API_URL + "confirmation", {
            token
        });
    }
}

export default new AuthService();