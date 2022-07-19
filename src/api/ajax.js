import axios from 'axios';
import { message } from 'antd';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = '';

export default function ajax(url, data = {}, method) {
    // console.log('url', url);
    // console.log('data', data);

    return new Promise((resolve, reject) => {
        let promise = axios({
            method,
            url: BASE_URL + url,
            data,
            // headers: {
            //     'content-type': 'application/x-www-form-urlencoded'
            // }
        });

        promise.then(response => {
            resolve(response);
        }).catch(error => {
            message.error(error.message);
        });
    });
}