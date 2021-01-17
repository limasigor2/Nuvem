import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification} from 'antd';

import history from '../../../utils/history';
import userService from '../../../services/user';

const Edit = () => {
    const [form] = Form.useForm();

    const [user, setUser] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setDisabled(true);
        setLoading(true);
        const response = await userService.edit({
            ...values,
            externalId: user.externalId
        });
        const { data } = response;
        if (response.status === 200) {
            notification['success']({
                message: 'Edição realizada com sucesso!',
            });
            history.push("/admin");
        } else {
            setDisabled(false);
            setLoading(false);
            notification['error']({
                message: response.data.message,
            });
        }
    };

    useEffect(() => {
        if (history.location.state.user) {
            setUser(history.location.state.user);
            let data = history.location.state.user;
            form.setFieldsValue({ name: data.name, username: data.username, email: data.email })
        } else {
            history.push("/admin");
        };
    }, [])

    return (
        <div className="user-registration-container content-align-center form-container">
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Editar usuário</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor o nome' }, { min: 7, message: 'Por favor digite um nome válido' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="username"
                    rules={[{ required: true, message: 'Por favor digite o nome de usuário' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor digite o email' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>
                <div className="inline">
                    <Button type="link" disabled={disabled} onClick={() => history.push("/admin")} className='no-padding-left'>
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

export default Edit;