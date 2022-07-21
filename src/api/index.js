//傲寒应用中所有接口请求的模块
import ajax from './ajax';
import jsonp from 'jsonp';

// const GET = 'get';
const POST = 'post';
// const DELETE = 'delete';

export const reqLogin = (username, password) => ajax('/login', {username, password}, POST);

export const reqAddUser = (user) => ajax('/manage/user/add', user, POST);

//json请求的接口请求函数
export const reqWeather = () => {
    const url = "http://api.map.baidu.com/weather/v1/?district_id=511100&data_type=all&mcode=CE:F7:45:62:AE:78:28:68:A0:A5:6D:70:CD:DF:5B:7C:C5:B9:91:CF;com.mahao.leshan&output=json&ak=SrYlotSQCWdHHulPveAULFzFF9BjXE1C";
    jsonp(url, {}, (err, data) => {
        console.log('jsonp', err, data);
    })
}