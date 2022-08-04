import React from 'react';
import { useHistory } from 'react-router-dom';
import { Select, Input, Card, Table, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { PAGE_SIZE } from '../../constants';

const Option = Select.Option;

export default function ProductHome() {

    const [products, setProducts] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [pageNum, setPageNum] = React.useState(1);
    const [searchName, setSearchName] = React.useState('');
    const [searchType, setSearchType] = React.useState('productName');
    const [isLoading, setIsLoading] = React.useState(false);

    const history = useHistory();

    const title = (
        <span style={{ width: "450px" }}>
            <Select
                defaultValue={searchType}
                style={{ width: 200 }}
                onChange={
                    value => setSearchType(value)
                }>
                <Option value="productName">Search by Name</Option>
                <Option value="productDesc">Search by Description</Option>
            </Select>
            <Input
                placeholder="Input Search value here..."
                style={{ width: 200, margin: "0 15px" }}
                value={searchName}
                onChange={
                    e => setSearchName(e.target.value)
                }
            />
            <Button type="primary" onClick={() => getProducts(1)}>Search</Button>
        </span>
    );

    const extra = (
        <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push('/product/addupdate')}
        >
            Add Product
        </Button>
    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'desc'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price) => '$' + price
        },
        {
            title: 'Status',
            // dataIndex: 'status',
            width: 200,
            render: (product) => {
                const { status, _id } = product;
                return (
                    <>
                        <Button type="primary" onClick={() => updateStatus(_id, status === 1 ? 2 : 1)}>{status === 1 ? 'Remove' : 'Put in Stock'}</Button>
                        <br />
                        <span>{status === 1 ? 'On Sale' : 'Not avaliable'}</span>
                    </>
                );
            }
        },
        {
            title: 'Edit',
            width: 120,
            render: (product) => {
                return (
                    <>
                        <Button type="link" onClick={() => history.push('/product/detail', product)}>DETAIL</Button>
                        <Button type="link" onClick={() => history.push('/product/addupdate', product)}>EDIT</Button>
                    </>
                );
            }
        },
    ];

    const getProducts = async (pageNum) => {
        setPageNum(pageNum);
        let res;
        setIsLoading(true);
        if (searchName) {
            res = await reqSearchProducts({
                pageNum,
                pageSize: PAGE_SIZE,
                searchName,
                searchType
            });
        } else {
            res = await reqProducts(pageNum, PAGE_SIZE);
        }
        setIsLoading(false);

        if (res?.status === 0) {
            const { total, list } = res.data;
            setTotal(total);
            setProducts(list);
        } else {
            message.error('Get product list failed!');
        }
    }

    const updateStatus = async (productId, status) => {
        let res = await reqUpdateStatus(productId, status);

        if (res.status === 0) {
            message.success('Update product successfully!');
            getProducts(pageNum);

            // let product = products.find(product => {
            //     return product._id === productId;
            // });

            // product.status = status;
            // const index = products.indexOf(product);
            // if(index !== -1){
            //     products[index] = product;
            // }
            // setProducts(products);
        }
    }

    React.useEffect(() => {
        if (products.length === 0) {
            getProducts(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Card title={title} extra={extra}>
            <Table
                bordered
                dataSource={products}
                columns={columns}
                loading={isLoading}
                rowKey='_id'
                pagination={{
                    current: pageNum,
                    defaultPageSize: PAGE_SIZE,
                    total: total,
                    showQuickJumper: true,
                    onChange: getProducts //getProducts默认传pageNum
                }}
            />
        </Card>
    )
}
