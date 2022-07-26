import React from 'react';
import { Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import './index.less';
import logo from '../../assets/images/logo.png';
import menuConfig from '../../config/menuConfig';

export default function LeftNav() {
    const location = useLocation();
    let path = location.pathname;

    const getOpenKey = () => {
        let openKey = '';

        menuConfig.map(item => {
            if (item.children && item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
                openKey = item.key;
            }
            return undefined;
        });
    
        return openKey;
    }

    const getPorperPath = () => {
        if(path.indexOf('/product') === 0){
            path = '/product';
        }

        return path;
    }

    return (
        <div className="left-nav">
            <Link to='/' className="left-nav-header">
                <img src={logo} alt="logo img" />
                <h1>Management System</h1>
            </Link>

            <Menu
                selectedKeys={[getPorperPath()]}
                defaultOpenKeys={[getOpenKey()]}
                mode="inline"
                theme="dark"
                items={menuConfig}
            />
        </div>
    )
}