import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BASE_IMG_URL } from '../../constants';
import { reqCategory } from '../../api';

const { Item } = List;

export default function ProductDetail() {

    const [categoryName, setCategoryName] = React.useState('');
    const [pCategoryName, setPCategoryName] = React.useState('');

    const history = useHistory();
    const { state } = useLocation();
    // const imgArr = JSON.parse(state?.imgs[0]);

    React.useEffect(() => {
        getCategoryNames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCategoryNames = async () => {
        const { pCategoryId, categoryId } = state;

        if(pCategoryId === '0'){
            const res = await reqCategory(categoryId);
            setCategoryName(res.data.name);
        }else{
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
            setPCategoryName(results[0].data.name);
            setCategoryName(results[1].data.name);
        }
    }

    const title = (
        <>
            <ArrowLeftOutlined
                style={{ fontSize: '18px', color: '#1DA57A' }}
                onClick={() => history.goBack()}
            />
            <span style={{ fontSize: '18px', color: '#1DA57A', margin: "0 15px" }}>Product Detail</span>
        </>
    );

    return (
        <Card title={title} >
            <List>
                <Item className='product-detail'>
                    <span className='product-detail-left'>Name: </span>
                    <span className='product-detail-right'>{state.name}</span>
                </Item>
                <Item className='product-detail'>
                    <span className='product-detail-left'>Description: </span>
                    <span>{state.desc}</span>
                </Item>
                <Item className='product-detail'>
                    <span className='product-detail-left'>Price: </span>
                    <span>${state.price}</span>
                </Item>
                <Item className='product-detail'>
                    <span className='product-detail-left'>Category: </span>
                    <span>{pCategoryName} {pCategoryName ? '-->' + categoryName : categoryName}</span>
                </Item>
                <Item className='product-detail'>
                    <span className='product-detail-left'>Image: </span>
                    <span>
                        {state.imgs.map(imgsrc => {
                            return (
                                <img
                                    className='product-detail-image'
                                    key={imgsrc}
                                    src={BASE_IMG_URL + imgsrc}
                                    alt='product pic'
                                />
                            )
                        })}
                    </span>
                </Item>
                <Item className='product-detail'>
                    <span className='product-detail-left'>Detail: </span>
                    <span dangerouslySetInnerHTML={{ __html: state.detail }}></span>
                </Item>
            </List>
        </Card>
    )
}
