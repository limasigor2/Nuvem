import React from 'react';
import { Form, Input, Button } from 'antd';

import './profile.scss';
import user from '../../services/user';

const Profile = () => {

    const onFinish = async (values) => {
        const response = await user.put(values);
        console.log(response);
        console.log(values);
    };

    return (
        <div className="profile-container content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Editar perfil</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor digite seu nome' }, { min: 8, message: 'Por favor digite um nome válido' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Identificação"
                    name="username"
                    rules={[{ required: true, message: 'Por favor digite seu nome de identificação' }]}
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

                {/* <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor digite sua senha' }]}
                >
                    <Input.Password />
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Salvar
        </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Profile;