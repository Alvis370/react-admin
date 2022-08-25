import React from 'react';
import { useHistory, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
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
import NotFound from '../not-found/not-found';

const { Footer, Sider, Content } = Layout;

export default function Admin() {
  const history = useHistory();

  const { user } = useSelector(state => state.userReducer);

  function getUser() {
    if (!user || !user._id) {
      history.replace("/login");
    }

    return user.username;
  }

  return (
    <div style={{ height: '100%' }}>
      {getUser() && <AdminLayout />}
    </div>
  )
}

function AdminLayout() {
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider>
        <LeftNav />
      </ Sider>

      <Layout>
        <Header />
        <Content style={{ margin: "20px", backgroundColor: 'white' }}>
          <Switch>
            <Redirect exact from='/' to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/category" component={Category} />
            <Route path="/product" component={Product} />
            <Route path="/user" component={User} />
            <Route path="/role" component={Role} />
            <Route path="/charts/bar" component={Bar} />
            <Route path="/charts/line" component={Line} />
            <Route path="/charts/pie" component={Pie} />
            <Route component={NotFound} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#ccc' }}>Use Google Chrome to get optimized experience.</Footer>
      </Layout>

    </Layout>
  )
}