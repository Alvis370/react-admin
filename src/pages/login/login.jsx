import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './login.less';
import logo from './images/logo.png';

export default function Login() {


  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    //ajax
  };

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo img" />
        <h1>React项目：后台管理系统</h1>
      </header>

      <section className="login-content">
        <h2>LOGIN</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            username: 'Admin',
            password: 'Admin'
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input your Username!',
              },
              {
                type: 'string',
                min: 4,
                max: 12,
                message: 'Username must be 4 to 12 charactors long!',
              },
              {
                pattern: /^[0-9a-zA-Z_]+$/,
                message: 'Username can only contain letters, numbers and underlines!',
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              () => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('Please input your Password!'));
                  } else if (value.length < 4 || value.length > 12) {
                    return Promise.reject(new Error('Password must be 4 to 12 charactors long!'));
                  } else if (!/^[0-9a-zA-Z_]+$/.test(value)) {
                    return Promise.reject(new Error('Password can only contain letters, numbers and underlines!'));
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}
