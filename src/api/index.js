//傲寒应用中所有接口请求的模块
import ajax from './ajax';

// const GET = 'get';
const POST = 'post';
// const DELETE = 'delete';

export const reqLogin = (username, password) => ajax('/login', {username, password}, POST);

export const reqAddUser = (user) => ajax('/manage/user/add', user, POST);