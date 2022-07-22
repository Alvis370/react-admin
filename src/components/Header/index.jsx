import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Button, message } from 'antd';
import './index.less';
import { reqWeather } from '../../api/index';
import { formatDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';

const Header = () => {

    const [currentTime, setCurrentTime] = React.useState(formatDate(Date.now()));
    // const [ dayPicUrl, setDayPicUrl ] = React.useState();
    const [ weather, setWeather ] = React.useState();
    const [ timeTag, setTimeTag ] = React.useState();

    const username = memoryUtils.user.username;
    const location = useLocation();
    const history = useHistory();


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
    }, [])

    async function getWeather() {    
        const { data } = await reqWeather();
        setWeather(data);
    }

    const getTitle = () => {
        const path = location.pathname;
        let title = '';

        menuList.find(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title;
                }
            }
            return undefined;
        });

        return title;
    }

    const showConfirm = () => {
        Modal.confirm({
            title: 'Confirm Logout?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',

            onOk() {
                storageUtils.removeUser();
                memoryUtils.user = {};
                history.replace("/login");
            }
        });
    };

    return (
        <div className="header">
            <div className="header-top">
                <span>Welcome, {username}</span>
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