import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

import history from '../../utils/history';
import auth from '../../services/auth';
import localStorage from '../../services/localStorage';

import './login.scss';

const Login = () => {

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getUser()) history.push('/home');
    }, []);

    const onFinish = async (values) => {
        setDisabled(true);
        setLoading(true);
        const response = await auth.login(values.id, values.password);
        if (response.status === 200) {
            history.push('/home');
            setDisabled(false);
            setLoading(false);
        } else {
            notification['error']({
                message: response.data.message,
            });
            setDisabled(false);
            setLoading(false);
        }
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
                    <Input placeholder="Nome de usuário" disabled={disabled} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor digite sua senha' }]}
                >
                    <Input.Password placeholder="Senha" disabled={disabled} />
                </Form.Item>
                <div className="inline">
                    <Button type="link" disabled={disabled} onClick={() => history.push("/register")} className='no-padding-left'>
                        Crie sua conta
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

export default Login;