import React from 'react';
import { Card, Table, Button, Modal, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import { reqRoles } from '../../api';
import { formItemLayout } from '../../constants';

export default function Role() {

  const [roles, setRoles] = React.useState([]);
  const [role, setRole] = React.useState({});
  const [addRoleVisible, setAddRoleVisible] = React.useState(false);

  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
    },
    {
      title: 'Auth Time',
      dataIndex: 'auth_time',
    },
    {
      title: 'Authorizer',
      dataIndex: 'auth_name',
    },
  ];

  React.useEffect(() => {
    if (roles.length === 0) {
      getRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRoles = async () => {
    const result = await reqRoles();

    if (result.status === 0) {
      setRoles(result.data);
    }
  }

  const onAddRoleOK = () => {
    alert('FUCCCKKAAAAAA!');
    setAddRoleVisible(false);
  }

  const onRow = (role) => {
    return {
      onClick: e => {
        setRole(role);
      }
    };
  }

  const title = (
    <>
      <Button type="primary" onClick={() => setAddRoleVisible(true)}>Create Role</Button>
      <Button type="primary" disabled={role._id ? false : true} style={{ marginLeft: 10 }}>Authroization</Button>
    </>
  );

  return (
    <Card title={title}>
      <Table
        dataSource={roles}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
        rowKey='_id'
        bordered
        rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
        onRow={onRow}
      >

      </Table>

      <Modal title="Add a new Role" visible={addRoleVisible} onOk={form.submit} onCancel={() => setAddRoleVisible(false)}>
        <AddForm form={form} onFinish={onAddRoleOK} name={'roleName'} />
      </Modal>
    </Card >
  )
}

function AddForm(props) {

  const { form, onFinish, name } = props;

  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
    >

      <Form.Item
        name={name}
        label='Name'
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('Role name can not be empty!'));
              } else {
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input placeholder="Role Name" />
      </Form.Item>
    </Form>
  )
}

AddForm.propTypes = {
  form: PropTypes.object.isRequired,
}