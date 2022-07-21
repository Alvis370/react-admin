import React from 'react';
import { useHistory, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../user/user';
import Role from '../role/role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const { Footer, Sider, Content } = Layout;

export default function Admin() {
  const history = useHistory();

  function getUser() {
    const user = memoryUtils.user;

    if (!user || !user._id) {
      history.replace("/login");
    }

    return user.username;
  }

  return (
    <div style={{height: '100%'}}>
      {getUser() && <AdminLayout />}
    </div>
  )
}

function AdminLayout() {
  return (
    <Layout style={{ height: '100%' }}>
      <Sider>
        <LeftNav />
      </ Sider>

      <Layout>
        <Header />
        <Content style={{ margin: "20px", backgroundColor: 'white' }}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/category" component={Category} />
            <Route path="/product" component={Product} />
            <Route path="/user" component={User} />
            <Route path="/role" component={Role} />
            <Route path="/charts/bar" component={Bar} />
            <Route path="/charts/line" component={Line} />
            <Route path="/charts/pie" component={Pie} />
            <Redirect to="/home" />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#ccc' }}>Use Google Chrome to get optimized experience.</Footer>
      </Layout>

    </Layout>
  )
}