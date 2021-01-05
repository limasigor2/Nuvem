import React from 'react';
import { Form, Input, Button } from 'antd';

const Login = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <Form
            name="basic"
            onFinish={onFinish}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Por favor digite seu nome' }]}
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Enviar
        </Button>
            </Form.Item>
        </Form>
    )
}

export default Login;