import React from 'react';
import { Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import './index.less';
import logo from '../../assets/images/logo.png';
import menuConfig from '../../config/menuConfig';

export default function LeftNav() {
    const location = useLocation();
    const path = location.pathname;

    function getOpenKey(){
        let openKey = '';

        menuConfig.map(item => {
            if (item.children && item.children.find(cItem => cItem.key === path)) {
                openKey = item.key;
            }
            return undefined;
        });
    
        return openKey;
    }

    return (
        <div className="left-nav">
            <Link to='/' className="left-nav-header">
                <img src={logo} alt="logo img" />
                <h1>Management System</h1>
            </Link>

            <Menu
                selectedKeys={[path]}
                defaultOpenKeys={[getOpenKey()]}
                mode="inline"
                theme="dark"
                items={menuConfig}
            />
        </div>
    )
}