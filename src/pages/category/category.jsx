import React from 'react';
import { Card, Table, Modal, Form, Select, Input, Button, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { reqCategory, reqAddCategory, reqUpdateCategory } from '../../api';

export default function Category() {

  const [category, setCategory] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [parentId, setParentId] = React.useState('0');
  const [categoryId, setCategoryId] = React.useState('0');
  const [parentName, setParentName] = React.useState('');

  const [addCategoryVisible, setAddCategoryVisible] = React.useState(false);
  const [editCategoryVisible, setEditCategoryVisible] = React.useState(false);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const reverseCategory = () => {
    setParentId('0');
    setParentName('');
    setSubCategory([]);
  }

  const title = parentId === '0' ? <Button type="link" >Category #1</Button> : (
    <span>
      <Button type="link" onClick={reverseCategory}>Category #1</Button>
      <ArrowRightOutlined />
      <Button type="link">{parentName}</Button>
    </span>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Management',
      width: 300,
      render: (category) => (
        <span>
          <Button type="link" onClick={() => onEditCategoryModalOpen(category)}>EDIT</Button>
          {parentId === '0' ? <Button type="link" onClick={() => showSubCategory(category)}>SUB CATEGORY</Button> : null}
        </span>
      ),
    }
  ];

  React.useEffect(() => {
    if (category === []) {
      getCategory();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId])

  const getCategory = async () => {
    setIsLoading(true);
    let res = await reqCategory(parentId);
    setIsLoading(false);

    if (res?.status === 0) {
      if (parentId === '0') {
        setCategory(res.data);
      } else {
        setSubCategory(res.data);
      }
    } else {
      message.error('Get category list failed!');
    }
  }

  const showSubCategory = (category) => {
    //setState是异步的
    setParentId(category._id);
    setParentName(category.name);
  }

  const onAddCategoryModalOpen = () => {
    form.setFieldsValue({ parentId });
    setAddCategoryVisible(true);
  }

  const onAddCategoryOK = async (values) => {
    let res = await reqAddCategory(values.categoryName, values.parentId);
    console.log(res);

    if (res?.status === 0) {
      getCategory();
    } else {
      message.error(res.msg);
    }

    form.resetFields();

    setAddCategoryVisible(false);
  }

  const onEditCategoryModalOpen = (category) => {
    form2.setFieldsValue({ categoryName: category.name });

    setCategoryId(category._id);

    setEditCategoryVisible(true);
  }

  const onEditCategoryCancel = () => {
    form2.resetFields();
    setEditCategoryVisible(false);
  }

  const onEditCategoryOK = async (values) => {
    let res = await reqUpdateCategory(values.categoryName, categoryId);
    console.log(res);

    if (res?.status === 0) {
      getCategory();
    } else {
      message.error('Get category list failed!');
    }

    form2.resetFields();

    setCategoryId('0');
    setEditCategoryVisible(false);
  }

  return (
    <Card
      title={title}
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={onAddCategoryModalOpen}>Add</Button>}
    >
      <Table
        dataSource={parentId === '0' ? category : subCategory}
        columns={columns}
        loading={isLoading}
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        rowKey='_id'
        bordered
      />

      <Modal title="Add Category" visible={addCategoryVisible} onOk={form.submit} onCancel={() => setAddCategoryVisible(false)}>
        <AddForm form={form} onFinish={onAddCategoryOK} id={'parentId'} name={'categoryName'} category={category} />
      </Modal>

      <Modal title="Edit Category" visible={editCategoryVisible} onOk={form2.submit} onCancel={onEditCategoryCancel}>
        <AddForm form={form2} onFinish={onEditCategoryOK} id={'categoryId'} name={'categoryName'} category={[]} />
      </Modal>
    </Card>
  )
}


function AddForm(props) {

  const Option = Select.Option;
  const { form, onFinish, id, name, category } = props;

  return (
    <Form form={form} onFinish={onFinish}>
      {id === 'parentId' ? (
        <>
          Type:<br />
          <Form.Item
            name={id}
            initialValue='0'
          >
            <Select style={{ width: "100%" }}>
              <Option key='0' value='0'>Category #1</Option>
              {category.map(item => {
                return (<Option key={item._id} value={item._id}>{item.name}</Option>)
              })}
            </Select>
          </Form.Item>
        </>
      ) : null}

      Name:<br />
      <Form.Item
        name={name}
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('Name can not be empty!'));
              } else {
                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input placeholder="Category Name" />
      </Form.Item>
    </Form>
  )
}

AddForm.propTypes = {
  form: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
}