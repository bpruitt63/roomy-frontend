import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class RoomyApi {

    static token;

    static async request(endpoint, method='get', data={}) {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${RoomyApi.token}`};
        const params = method === 'get' ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message;
            !err.response ? message = "Server error, please try again later"
                : message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };

    static async login(data) {
        const res = await this.request('users/login', 'post', data);
        return res.token;
    };

    static async register(data) {
        const res = await this.request('users/register', 'post', data);
        return res.token;
    };

};

RoomyApi.token = localStorage.getItem('roomyToken');

export default RoomyApi;