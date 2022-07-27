//傲寒应用中所有接口请求的模块
import ajax from './ajax';
// import jsonp from 'jsonp';

const GET = 'get';
const POST = 'post';
// const DELETE = 'delete';

export const reqLogin = (username, password) => ajax('/login', { username, password }, POST);

export const reqAddUser = (user) => ajax('/manage/user/add', user, POST);

export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId }, GET);

export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, POST);

export const reqUpdateCategory = (categoryName, categoryId) => ajax('/manage/category/update', { categoryName, categoryId }, POST);

export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId }, GET);

export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', { productId, status }, POST);

export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize }, GET);

export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax('/manage/product/search', { 
    pageNum, 
    pageSize,
    [searchType]: searchName //searchType: productName / productDesc
}, GET);

export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, POST);

export const reqWeather = () => ajax('/weather', {}, GET);

//json请求的接口请求函数
// export const reqWeather = () => {
//     jsonp(url, {}, (err, data) => {
//         console.log('jsonp', err, data);
//     })
// }