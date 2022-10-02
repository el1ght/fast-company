import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config.json';

axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use((res) => res, function (err) {
    const expectedErr = err.response &&
        err.response.status >= 400 &&
        err.response.status < 500;
    if (!expectedErr) {
        console.log(err);
        toast.error('Something was wrong. Try it later');
    }
    return Promise.reject(err);
});

const httpsService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpsService;
