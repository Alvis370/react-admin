import {
    HomeOutlined,
    UserOutlined,
    AppstoreOutlined,
    LineChartOutlined,
    UnorderedListOutlined,
    AreaChartOutlined,
    SafetyCertificateOutlined,
    BarChartOutlined,
    ToolOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';


function getItem(label, key, icon, children, title) {
    //返回items数组中的对象
    return {
        label, key, icon, children, title
    };
}

const menuList = [
    getItem(
        (
            <Link to='/home'>
                首页
            </Link>
        ),
        '/home',
        <HomeOutlined />,
        undefined,
        '首页' 
    ),
    getItem('商品', 'sub1', <AppstoreOutlined />, [
        getItem(
            (
                <Link to='/category'>
                    品类管理
                </Link>
            ),
            '/category',
            <UnorderedListOutlined />,
            undefined,
            '品类管理'
        ),
        getItem(
            (
                <Link to='/product'>
                    商品管理
                </Link>
            ),
            '/product',
            <ToolOutlined />,
            undefined,
            '商品管理'
        )
    ]),
    getItem(
        (
            <Link to='/user'>
                用户管理
            </Link>
        ),
        '/user',
        <UserOutlined />,
        undefined,
        '用户管理'
    ),
    getItem(
        (
            <Link to='/role'>
                角色管理
            </Link>
        ),
        '/role',
        <SafetyCertificateOutlined />,
        undefined,
        '角色管理'
    ),
    getItem('图形图表', 'sub2', <AreaChartOutlined />, [
        getItem(
            (
                <Link to='/charts/bar'>
                    柱形图
                </Link>
            ),
            '/charts/bar',
            <BarChartOutlined />,
            undefined,
            '柱形图'
        ),
        getItem(
            (
                <Link to='/charts/line'>
                    折线图
                </Link>
            ),
            '/charts/line',
            <LineChartOutlined />,
            undefined,
            '折线图'
        ),
        getItem(
            (
                <Link to='/charts/pie'>
                    饼图
                </Link>
            ),
            '/charts/pie',
            <PieChartOutlined />,
            undefined,
            '饼图'
        )
    ])
];

export default menuList;