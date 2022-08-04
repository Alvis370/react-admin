import React, { useState } from 'react';
import { message, Modal, Upload } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { BASE_URL, BASE_IMG_URL } from '../../constants';
import { reqDeleteImg } from '../../api';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

const PicturesWall = React.forwardRef((props, ref) => {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState(() => {
        const { imgList } = props;
        let newImgArr = [];
        if (imgList?.length > 0) {
            newImgArr = imgList.map((img, index) => {
                return {
                    uid: -(index + 1) + '',
                    name: img,
                    status: 'done',
                    url: BASE_IMG_URL + img
                };
            })
        }

        return newImgArr;
    });

    let onRemoveFlag = false;

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    /**
     * file: 当前操作的图片文件
     * fileList: 所有已上传图片文件对象的数组
     **/
    const handleChange = ({ file, fileList: newFileList }) => {

        // console.log('fileList', fileList);

        if (file.status === 'done') {
            if (onRemoveFlag) {
                return;
            }

            const result = file.response;
            if (result.status === 0) {
                message.success('Image uploaded successfully!');
                const data = result.data;
                let index = newFileList.length - 1;
                newFileList[index].name = data.name;
                newFileList[index].url = data.url;

                newFileList[index] = {
                    uid: file.uid,
                    name: data.name,
                    url: data.url,
                    status: file.status,
                };

                //todo 提问！！
                ref.current = newFileList.map(file => file.name);
            } else {
                message.error('Upload image failed!');
            }
            setLoading(false);
        } else if (file.status === 'uploading') {
            setLoading(true);
        } else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }

        // console.log('newFileList', newFileList);
        if (onRemoveFlag) {
            onRemoveFlag = false;
            return;
        }
        setFileList(newFileList);
    }

    const onRemove = async (file) => {
        onRemoveFlag = true;

        const result = await reqDeleteImg(file.name);

        if (result.status === 0) {
            message.success('Image deleted successfully!');

            const index = fileList.indexOf(file);
            //todo 提问！！
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);

            setFileList(newFileList);
        } else {
            message.error('Delete image failed!');
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <Upload
                action={`${BASE_URL}/manage/img/upload`}
                accept="image/*"
                name="image" /*default request param name*/
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={onRemove}
                ref={ref}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    )
});

PicturesWall.propTypes = {
    imgList: PropTypes.array,
}

export default PicturesWall;