import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';

import './register.scss';
import auth from '../../services/auth';
import history from '../../utils/history';

const Register = () => {
    const onFinish = async (values) => {
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
        }
    };

    return (
        <div className="register-container content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Crie sua conta</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor digite seu nome' }, { min: 10, message: 'Por favor digite um nome válido' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="id"
                    rules={[{ required: true, message: 'Por favor digite seu nome de usuário' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor digite seu email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor digite sua senha' }]}
                >
                    <Input.Password />
                </Form.Item>

                <div className="inline">
                    <Link to="/">
                        Entre na conta
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

export default Register;