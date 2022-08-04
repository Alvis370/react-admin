import React from 'react';
import { Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import './index.less';
import logo from '../../assets/images/logo.png';
import menuConfig from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';

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

    function getItem(label, key, icon, children, title) {
        return {
            label, key, icon, children, title
        };
    }

    const getAuthMenuConfig = () => {
        return menuConfig.reduce((pre, item) => {
            // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
            if (hasAuth(item)) {
                // 向pre添加<Menu.Item>
                if (!item.children) {
                    pre.push((
                        getItem(
                            (
                                <Link replace to={item.key}>
                                    {item.title}
                                </Link>
                            ),
                            item.key,
                            item.icon,
                            undefined,
                            item.title
                        )
                    ));
                } else {
                    let newItem = getItem(
                        (
                            <Link replace to={item.key}>
                                {item.title}
                            </Link>
                        ),
                        item.key,
                        item.icon,
                        undefined,
                        item.title
                    );

                    const menu = memoryUtils.user.role.menus;
                    const username = memoryUtils.user.username;
                    let cItemArr = [];

                    item.children.map(child => {
                        if(username === 'admin' || menu.indexOf(child.key) !== -1){
                            cItemArr.push(getItem(
                                (
                                    <Link replace to={child.key}>
                                        {child.title}
                                    </Link>
                                ),
                                child.key,
                                child.icon,
                                undefined, //child does not have any more children
                                child.title
                            )); 
                        }
                        
                        return undefined;
                    });

                    newItem.children = cItemArr;

                    pre.push((
                        newItem
                    ));
                }
            }

            return pre;
        }, [])
    }

    const hasAuth = item => {
        const key = item.key;
        const menu = memoryUtils.user.role.menus;
        const username = memoryUtils.user.username;

        if (username === 'admin' || key === '/home' || menu.indexOf(key) !== -1) {
            return true;
        } else if (item.children) {
            //if menu has children items
            return !!item.children.find(child => menu.indexOf(child.key) !== -1);//forced boolean
        }
        return false;
    }

    const getPorperPath = () => {
        if (path.indexOf('/product') === 0) {
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
                items={getAuthMenuConfig()}
            />
        </div>
    )
}