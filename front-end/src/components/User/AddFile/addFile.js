import React, { useState } from 'react';
import { Form, Button, Upload, message } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Dragger } = Upload;

const AddFile = () => {
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const uploadFile = {
        accept: '.png, .jpg, .jpeg, .pdf',
        name: 'file',
        multiple: false,
        beforeUpload: file => {
            let fileList = [file];
            setDefaultFileList(fileList);
            return false;
        },
        onRemove(file) {
            setDefaultFileList([]);
        }
    };

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div className="document-content content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Enviar arquivo</h1>

                <Form.Item
                    label="Arquivo"
                    name="file"
                    rules={[{ required: true, message: 'Por favor insira um arquivo' }]}
                >
                    <Dragger {...uploadFile} fileList={defaultFileList} disabled={disabled}>
                        <p className="ant-upload-drag-icon">
                            <PaperClipOutlined />
                        </p>
                        <p className="ant-upload-text">Click ou arraste o arquivo para adicioná-lo</p>
                        <p className="ant-upload-hint">
                            Você pode adicionar um arquivo .pdf, .png ou .jpeg
                        </p>
                    </Dragger>
                </Form.Item>

                <div className="inline">
                    <Link to="/home">
                        Cancelar
                    </Link>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Enviar
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default AddFile;