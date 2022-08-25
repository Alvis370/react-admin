import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeHeadTitle } from '../../redux/index-slice';
import { Button, Row, Col } from 'antd';
import './not-found.less';

export default function NotFound() {

    const history = useHistory();

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(changeHeadTitle('404'));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goHome = () => {
        history.replace('/home');
    }

    return (
        <Row className='not-found'>
            <Col span={12} className='left'></Col>
            <Col span={12} className='right'>
                <h1>404</h1>
                <h2>Page does not exist</h2>
                <div>
                    <Button type='primary' onClick={goHome}>
                        Return to Home page
                    </Button>
                </div>
            </Col>
        </Row>
    )
}
