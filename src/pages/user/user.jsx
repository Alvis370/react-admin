import React from 'react';
import { Card, Table, Input, Button, Modal, Form, Select, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { reqUsers, reqAddUser, reqUpdateUser, reqDeleteUser } from '../../api';
import { formatDate } from '../../utils/dateUtils';

export default function User() {

  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [addUserVisible, setAddUserVisible] = React.useState(false);
  const [updateUserVisible, setUpdateUserVisible] = React.useState(false);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Register Time',
      dataIndex: 'create_time',
      render: formatDate
    },
    {
      title: 'Role',
      dataIndex: 'role_name',
    },
    {
      title: 'Management',
      width: 200,
      render: (user) => (
        <span>
          <Button type="link" onClick={() => onUpdateUserModalOpen(user)}>EDIT</Button>
          <Button type="link" onClick={() => onDeleteUserModalOpen(user)}>DELETE</Button>
        </span>
      ),
    }
  ];

  React.useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (form2) {
      form2.resetFields();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserVisible])

  const getUsers = async () => {
    const result = await reqUsers();

    if (result.status === 0) {
      message.success('Get user list successfully!');
      const { users, roles } = result.data;

      const roleNames = roles.reduce((pre, role) => {
        pre[role._id] = role.name;
        return pre;
      }, {});

      const newUsers = users.map((user) => {
        user.role_name = roleNames[user.role_id];
        return user;
      })

      setRoles(roles);
      setUsers(newUsers);
    } else {
      message.error('Get user list failed!');
    }
  }

  const onUpdateUserModalOpen = (user) => {
    setUser(user);
    setUpdateUserVisible(true);
  }

  const onDeleteUserModalOpen = (user) => {
    Modal.confirm({
      title: `Do you Want to delete ${user.username}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',

      onOk: async () => {
        const result = await reqDeleteUser(user._id);

        if (result.status === 0) {
          message.success('User was deleted successfully!');
          getUsers();
        } else {
          message.error('Delete user failed!');
        }
      },
    });
  }

  const onAddUserOK = async (results) => {
    const result = await reqAddUser({
      username: results.username,
      password: results.password,
      phone: results.phone,
      email: results.email,
      role_id: results.role_id,
    });

    if (result.status === 0) {
      message.success('Update user successfully!');
      getUsers();
      setAddUserVisible(false);
    } else {
      message.error('Update user failed!');
    }
  }

  const onUpdateUserOK = async (results) => {
    const result = await reqUpdateUser({
      username: results.username,
      phone: results.phone,
      email: results.email,
      role_id: results.role_id,
      _id: user._id,
    });

    if (result.status === 0) {
      message.success('Update user successfully!');
      getUsers();
      setUpdateUserVisible(false);
    } else {
      message.error('Update user failed!');
    }
  }

  const title = (
    <Button type='primary' onClick={() => setAddUserVisible(true)}>Create New User</Button>
  );

  return (
    <Card title={title}>
      <Table
        dataSource={users}
        columns={columns}
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        rowKey='_id'
        bordered
      />

      <Modal title="Add User" visible={addUserVisible} onOk={form.submit} onCancel={() => setAddUserVisible(false)} destroyOnClose={true}>
        <UserForm key='form1' form={form} onFinish={onAddUserOK} roles={roles} />
      </Modal>

      <Modal title="Update User" visible={updateUserVisible} onOk={form2.submit} onCancel={() => setUpdateUserVisible(false)} forceRender>
        <UserForm key='form2' form={form2} onFinish={onUpdateUserOK} user={user} roles={roles} />
      </Modal>

    </Card>
  )
}

function UserForm(props) {
  const { form, onFinish, user, roles } = props;

  const Option = Select.Option;

  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };

  return (
    <Form
      form={form}
      preserve={false}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        username: user?.username,
        password: user?.password,
        phone: user?.phone,
        email: user?.email,
        role_id: user?.role_id,//key: value
      }}
    >

      <Form.Item
        name='username'
        label='Name'
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('Username can not be empty!'));
              } else {
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input placeholder="Input username here." />
      </Form.Item>

      {user ? null : <Form.Item
        name='password'
        label='Password'
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('Password can not be empty!'));
              } else {
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input type='password' placeholder="Input password here." />
      </Form.Item>}

      <Form.Item
        name='phone'
        label='Phone'
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('Phone can not be empty!'));
              } else {
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input type='number' placeholder="Input phone number here." />
      </Form.Item>

      <Form.Item
        name='email'
        label='Email'
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('Email can not be empty!'));
              } else {
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input placeholder="Input Email here." />
      </Form.Item>

      <Form.Item
        name='role_id'
        label='Role'
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('Role can not be empty!'));
              } else {
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Select style={{ width: "100%" }} placeholder="Select a role here.">
          {roles.map(item => {
            return (<Option key={item._id} value={item._id}>{item.name}</Option>)
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}

UserForm.propTypes = {
  form: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,
}
