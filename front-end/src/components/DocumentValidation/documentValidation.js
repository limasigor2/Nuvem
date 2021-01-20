import React, { useState } from 'react';
import { Form, Input, Button, notification, Upload } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import validate from '../../services/validate';
import history from '../../utils/history';

const { Dragger } = Upload;

const DocumentValidation = () => {

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
        if (defaultFileList.length > 0) {
            setDisabled(true);
            setLoading(true);
            const response = await validate.post(values.file.file, values.user, values.name, values.justification);
            if (response.status === 200) {
                notification['success']({
                    message: 'Validação feita com sucesso!',
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
        } else {
            notification['error']({
                message: 'Por favor, adicione um arquivo',
            });
        }
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
                    label="Nome do usuário"
                    name="user"
                    rules={[{ required: true, message: 'Por favor digite o nome do usuário' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>
                <Form.Item
                    label="Nome do arquivo"
                    name="name"
                    rules={[{ required: true, message: 'Por favor digite o nome do arquivo' }]}
                >
                    <Input disabled={disabled} />
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
                    <Input.TextArea disabled={disabled} />
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

export default DocumentValidation;