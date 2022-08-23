import React from 'react';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/user-slice';
import './index.less';
// import { reqWeather } from '../../api/index';
import { formatDate } from '../../utils/dateUtils';

const Header = () => {

    const [currentTime, setCurrentTime] = React.useState(formatDate(Date.now()));
    // const [ dayPicUrl, setDayPicUrl ] = React.useState();
    const [weather, setWeather] = React.useState('Sunny');
    const [timeTag, setTimeTag] = React.useState();

    const history = useHistory();

    const { user } = useSelector(state => state.userReducer);
    const { index } = useSelector(state => state.indexReducer);
    const dispatch = useDispatch();

    React.useEffect(() => {
        // Anything in here is fired on component mount.
        let tag = setInterval(() => {
            setCurrentTime(formatDate(Date.now()));
        }, 1000);

        setTimeTag(tag);

        getWeather();

        return () => {
            // Anything in here is fired on component unmount.
            clearInterval(timeTag);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getWeather() {
        // const { data } = await reqWeather();
        // setWeather(data?.weather);

        setWeather('Sunny');
    }

    const getTitle = () => {
        //without redux:
        // const path = location.pathname;
        // let title = '';
        // menuList.find(item => {
        //     if (item.key === path) {
        //         title = item.title;
        //     } else if (item.children) {
        //         const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        //         if (cItem) {
        //             title = cItem.title;
        //         }
        //     }
        //     return undefined;
        // });
        // return title;

        return index;
    }

    const showConfirm = () => {
        Modal.confirm({
            title: 'Confirm Logout?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',

            onOk() {
                dispatch(deleteUser());
                history.replace("/login");
            }
        });
    };

    return (
        <div className="header">
            <div className="header-top">
                <span>Welcome, {user.username}</span>
                <Button type="link" onClick={showConfirm}>Logout</Button>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{getTitle()}</div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
                    <span>{weather}</span>
                </div>
            </div>
        </div>
    )
}

export default Header;