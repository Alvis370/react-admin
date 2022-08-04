import React from 'react';
import { Card, Table, Button, Modal, Form, Input, Tree, message } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api';
import { formItemLayout } from '../../constants';
import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { formatDate } from '../../utils/dateUtils';

export default function Role() {

  const [roles, setRoles] = React.useState([]);
  const [role, setRole] = React.useState({});
  const [addRoleVisible, setAddRoleVisible] = React.useState(false);
  const [addSetAuthVisible, setAddSetAuthVisible] = React.useState(false);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const treeMenuRef = React.createRef();

  const location = useLocation();
  const history = useHistory();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      render: formatDate //(create_time) => formatDate(create_time)
    },
    {
      title: 'Auth Time',
      dataIndex: 'auth_time',
      render: formatDate
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

  const onAddRoleOK = async ({ roleName }) => {
    const result = await reqAddRole(roleName);

    if (result.status === 0) {
      message.success("New role added successfully!");

      setRoles([...roles, result.data]);

      setAddRoleVisible(false);
    } else {
      message.error("Add role failed!");
    }
  }

  const onUpdateRoleOK = async () => {
    if (Array.isArray(treeMenuRef.current)) {
      //menu has changed
      role.menus = treeMenuRef.current;
      role.auth_time = Date.now();
      role.auth_name = memoryUtils.user.username;
    }

    const result = await reqUpdateRole(role);

    if (result.status === 0) {
      message.success("Current user has changed roles. Login out automatically!");

      setAddSetAuthVisible(false);
      if (role._id === memoryUtils.user.role_id) {
        storageUtils.removeUser();
        memoryUtils.user = {};
        history.replace("/login");
      } else {
        message.success("Role permission changed successfully!");

        setRole(JSON.parse(JSON.stringify(role)));
        setRoles(JSON.parse(JSON.stringify(roles)));

        // let newRole = role;
        // roles.push(newRole);
        // setRoles(roles);

        // getRoles();
      }
    } else {
      message.error("Change role permission failed!");
    }
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
      <Button
        type="primary"
        disabled={role._id ? false : true}
        style={{ marginLeft: 10 }}
        onClick={() => setAddSetAuthVisible(true)}
      >Authroization</Button>
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
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [role._id],
          onSelect: role => {
            setRole(role);
          }
        }}
        onRow={onRow}
      >

      </Table>

      <Modal
        title="Add a new Role"
        visible={addRoleVisible}
        destroyOnClose={true}
        onOk={form.submit}
        onCancel={() => setAddRoleVisible(false)}
      >
        <AddForm form={form} onFinish={onAddRoleOK} name={'roleName'} />
      </Modal>

      <Modal
        title="Setting role permissions"
        visible={addSetAuthVisible}
        destroyOnClose={true}
        onOk={form2.submit}
        onCancel={() => setAddSetAuthVisible(false)}
      >
        <AddForm
          form={form2}
          onFinish={onUpdateRoleOK}
          role={role}
          ref={treeMenuRef}
        />
      </Modal>
    </Card >
  )
}

const AddForm = React.forwardRef((props, ref) => {

  const { form, onFinish, role } = props;

  const [treeData, setTreeData] = React.useState([]);

  const onCheck = (checkedKeys, info) => {
    ref.current = checkedKeys;
  };

  const getTreeData = (list) => {
    return list.reduce((pre, item) => {
      pre.push({
        title: item.title,
        key: item.key,
        children: item.children ? getTreeData(item.children) : null
      });
      return pre;
    }, []);
  }

  React.useEffect(() => {
    if (role && treeData.length === 0) {
      const treeData = [
        {
          title: 'Permissions',
          key: 'all',
          children: getTreeData(menuList)
        }
      ];

      setTreeData(treeData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form
      form={form}
      preserve={false}
      {...formItemLayout}
      initialValues={{
        roleName: role?.name,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='roleName'
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
        <Input placeholder="Role Name" disabled={role ? true : false} />
      </Form.Item>

      {role && treeData.length > 0 ?
        (<Tree
          checkable
          defaultCheckedKeys={role?.menus}
          onCheck={onCheck}
          treeData={treeData}
          defaultExpandAll={true}
          ref={ref}
        />)
        : null}
    </Form>
  )

});

AddForm.propTypes = {
  form: PropTypes.object.isRequired,
  role: PropTypes.object,
}