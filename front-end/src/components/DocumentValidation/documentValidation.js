import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import md5 from 'crypto-js/md5';

const { Dragger } = Upload;

const DocumentValidation = () => {

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
        let md5Hash = md5(values.file.file);
        console.log(md5Hash);
        // var md5Hash = CryptoJS.MD5("Test");
    };

    return (
        <div className="document-validation-content content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Valide um arquivo</h1>
                <Form.Item
                    label="Código"
                    name="code"
                    rules={[{ required: true, message: 'Por favor digite o código do arquivo' }]}
                >
                    <Input />
                </Form.Item>

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

                <Form.Item
                    label="Justificativa da validação"
                    name="justification"
                    rules={[{ required: true, message: 'Por favor digite ajustificativa da validação' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Enviar
        </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default DocumentValidation;