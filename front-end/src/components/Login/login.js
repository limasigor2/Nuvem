import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import './login.scss';

const Login = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div className="login-container content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Por favor digite seu email' }]}
                >
                    <Input placeholder="Email"/>
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