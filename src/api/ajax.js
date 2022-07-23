import axios from 'axios';
import { message } from 'antd';

const BASE_URL = 'http://localhost:5000';

export default function ajax(url, data = {}, method) {

    return new Promise((resolve, reject) => {
        let mUrl = BASE_URL + url;
        let promise;

        if(method === 'get'){
            promise = axios.get(mUrl, { params: data });
        }else{
            promise = axios.post(mUrl, data);
        }

        promise.then(response => {
            resolve(response.data);
        }).catch(error => {
            message.error(error.message);
        });
    });
}