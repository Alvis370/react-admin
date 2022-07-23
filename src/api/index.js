//傲寒应用中所有接口请求的模块
import ajax from './ajax';
// import jsonp from 'jsonp';

const GET = 'get';
const POST = 'post';
// const DELETE = 'delete';

export const reqLogin = (username, password) => ajax('/login', { username, password }, POST);

export const reqAddUser = (user) => ajax('/manage/user/add', user, POST);

export const reqCategory = (parentId) => ajax('/manage/category/list', { parentId }, GET);

export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, POST);

export const reqUpdateCategory = (categoryName, categoryId) => ajax('/manage/category/update', { categoryName, categoryId }, POST);

export const reqWeather = () => ajax('/weather', {}, GET);

//json请求的接口请求函数
// export const reqWeather = () => {
//     jsonp(url, {}, (err, data) => {
//         console.log('jsonp', err, data);
//     })
// }