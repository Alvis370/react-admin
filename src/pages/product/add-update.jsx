import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Form, Input, Cascader, Upload, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCategorys } from '../../api';

const { Item } = Form;
const { TextArea } = Input;

export default function ProductAddUpdate() {

    const [form] = Form.useForm();
    const [options, setOptions] = React.useState([]);

    const history = useHistory();
    const state = useLocation().state || {};

    React.useEffect(() => {
        if (options.length === 0) {
            getOptionList();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getOptionList = async (pCategoryId = '0') => {
        //pCategoryId means parentId
        let res = await reqCategorys(pCategoryId);
        let optionList = [];

        if (res?.status === 0) {
            optionList = res.data.map(item => (
                {
                    value: item._id,
                    label: item.name,
                    //Note: category only have two levels here, so the sub category items must be leaves
                    isLeaf: pCategoryId === '0' ? false : true,
                }
            ));

            //Update Product needs to get the sub category along
            if (pCategoryId === '0' && state.pCategoryId !== '0') {
                let sub = await reqCategorys(state.pCategoryId);

                if (sub?.status === 0) {
                    const childOptions = sub.data.map(item => (
                        {
                            value: item._id,
                            label: item.name,
                            //Note: category only have two levels here, so the sub category items must be leaves
                            isLeaf: true,
                        }
                    ));

                    const targetOption = optionList.find(item => {
                        return state.pCategoryId === item.value;
                    });

                    if (targetOption !== undefined && childOptions.length > 0) {
                        targetOption.children = childOptions;
                    } 
                }else {
                    message.error('Get category list failed!');
                }
            }

            if (pCategoryId === '0') {
                setOptions(optionList);//optionList is the category#1 list 
            }
        } else {
            message.error('Get category list failed!');
        }

        return optionList;
    }

    const loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        let promise;

        if (targetOption !== undefined) {
            targetOption.loading = true;
            promise = getOptionList(targetOption.value);
            targetOption.loading = false;

            promise.then(childOptions => {
                if (childOptions.length > 0) {
                    targetOption.loading = false;
                    targetOption.children = childOptions;
                } else {
                    targetOption.isLeaf = true;
                }
                setOptions([...options]);
            });
        } else {
            promise = getOptionList(selectedOptions.value);

            promise.then(childrenList => {
                if (childrenList.length > 0) {
                    options.children = childrenList;
                }
                console.log(options);
                setOptions([...options]);
            });
        }
    };

    const title = (
        <>
            <ArrowLeftOutlined
                style={{ fontSize: '18px', color: '#1DA57A' }}
                onClick={() => history.goBack()}
            />
            <span style={{ fontSize: '18px', color: '#1DA57A', margin: "0 15px" }}>Update Product</span>
        </>
    );

    const onFinish = async (values) => {
        console.log(values);
    }

    const formItemLayout = {
        labelCol: {
            span: 2,
        },
        wrapperCol: {
            span: 8,
        },
    };

    return (
        <Card title={title} >
            <Form
                form={form}
                {...formItemLayout}
                initialValues={{
                    name: state.name,
                    desc: state.desc,
                    price: state.price,
                    category: state.pCategoryId === '0' ? [state.categoryId] : [state.pCategoryId, state.categoryId],
                    image: state.imgs,
                    detail: state.detail,
                }}
                onFinish={onFinish}
            >
                <Item
                    name='name'
                    label='Name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input a valid product name!',
                        },
                    ]}
                >
                    <Input placeholder='Input Product Name' />
                </Item>
                <Item
                    name='desc'
                    label='Description'
                    rules={[
                        {
                            required: true,
                            message: 'Please input a valid product description!',
                        },
                    ]}
                >
                    <TextArea
                        placeholder='Input Product Description'
                        autoSize={{
                            minRows: 2,
                            maxRows: 6,
                        }}
                    />
                </Item>
                <Item
                    name='price'
                    label='Price'
                    rules={[
                        {
                            required: true,
                            message: 'Please input a valid price!',
                        },
                        () => ({
                            validator(_, value) {
                                if (value <= 0) {
                                    return Promise.reject(new Error('Price must be bigger than zero!'));
                                } else {
                                    return Promise.resolve();
                                }
                            },
                        }),
                    ]}
                >
                    <Input addonBefore="$" type='number' placeholder='Input Product Price' />
                </Item>
                <Item
                    name='category'
                    label='Category'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a porper product category!',
                        },
                    ]}
                >
                    <Cascader options={options} loadData={loadData} changeOnSelect />
                </Item>
                <Item name='image' label='Image'>
                    <Input placeholder='Input Product Image' />
                </Item>
                <Item name='detail' label='Detail'>
                    <Input placeholder='Input Product Detail' />
                </Item>
                <Item>
                    <Button type='primary' htmlType="submit">Submit</Button>
                </Item>
            </Form>
        </Card>
    )
}
