import React from 'react';
import './index.less';

export default function Header() {
    return (
        <div className="header">
            <div className="header-top">
                <span>Welcome, admin</span>
                <a href="javascript:">Logout</a>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">Home</div>
                <div className="header-bottom-right">
                    <span>2019-5-2 11:11:11</span>
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
                    <span>Sunny</span>
                </div>
            </div>
        </div>
    )
}
