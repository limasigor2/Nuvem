import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

import auth from '../../../services/auth';
import history from '../../../utils/history';

const Register = () => {

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setDisabled(true);
        setLoading(true);
        const response = await auth.register(values);
        if (response.status === 200) {
            notification['success']({
                message: 'Cadastro realizado com sucesso',
            });
            history.push('/');
        } else {
            notification['error']({
                message: response.data.message,
            });
            setDisabled(false);
            setLoading(false);
        }
    };

    return (
        <div className="register-container content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Cadastrar usuário</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor digite o nome' }, { min: 7, message: 'Por favor digite um nome válido' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="id"
                    rules={[{ required: true, message: 'Por favor digite o nome de usuário' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor digite o email' }, { type: 'email', message: 'Por favor digite um email válido' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor digite a senha' }]}
                >
                    <Input.Password disabled={disabled} />
                </Form.Item>

                <div className="inline">
                    <Button type="link" disabled={disabled} onClick={() => history.push("/")} className='no-padding-left'>
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

export default Register;