import React from 'react';
import { Card, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Category() {

  const title = "Category #1";

  const dataSource = [
    {
      parentId: '0',
      _id: '1',
      name: 'AAA',
      _v: 0
    },
    {
      parentId: '0',
      _id: '2',
      name: 'BBB',
      _v: 0
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Management',
      width: 300,
      render: () => (
        <span>
          <Button type="link">EDIT</Button>
          <Button type="link">SUB CATEGORY</Button>
        </span>
      ),
    }
  ];

  return (
    <Card
      title={title}
      extra={<Button type="primary" icon={<PlusOutlined />}>Add</Button>}
    >
      <Table dataSource={dataSource} columns={columns} rowKey='_id' bordered />
    </Card>
  )
}
