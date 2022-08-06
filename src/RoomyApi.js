import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class RoomyApi {

    static token;

    static setToken(newToken) {
        this.token = newToken;
    };

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

};

RoomyApi.token = localStorage.getItem('token');

export default RoomyApi;