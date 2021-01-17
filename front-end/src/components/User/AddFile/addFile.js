import React, { useState } from 'react';
import { Form, Button, notification, Upload } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import file from '../../../services/file';
import history from '../../../utils/history';

const { Dragger } = Upload;

const AddFile = () => {
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const onFinish = async (values) => {
        setDisabled(true);
        setLoading(true);
        if (defaultFileList.length > 0) {
            const response = await file.upload(values.file.file);
            if (response.status === 200) {
                notification['success']({
                    message: 'Arquivo enviado com sucesso!',
                });
                setDefaultFileList([]);
                setDisabled(false);
                setLoading(false);
            } else {
                notification['error']({
                    message: response.data.message,
                });
                setDisabled(false);
                setLoading(false);
            }
        }
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
                    <Button type="link" disabled={disabled} onClick={() => history.goBack()} className='no-padding-left'>
                        Cancelar
                    </Button>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={disabled} loading={loading}>
                            Enviar
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default AddFile;