import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';

import history from '../../utils/history';
import auth from '../../services/auth';

import './login.scss';

const Login = () => {
    const onFinish = async (values) => {
        const response = await auth.login(values.id, values.password);
        if(response.status === 200){
            history.push('/home');
        } else {
            notification['error']({
                message: response.data.message,
            });
        }
        console.log(response);
    };

    return (
        <div className="login-container content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item
                    name="id"
                    rules={[{ required: true, message: 'Por favor digite seu nome de usuário' }]}
                >
                    <Input placeholder="Nome de usuário"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor digite sua senha' }]}
                >
                    <Input.Password placeholder="Senha"/>
                </Form.Item>
                <div className="inline">
                    <Link to="/register">
                       Crie sua conta
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

export default Login;