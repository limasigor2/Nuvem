import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

import userService from '../../services/user';
import localStorage from '../../services/localStorage';

import './profile.scss';

const Profile = () => {
    const [form] = Form.useForm();

    const [user, setUser] = useState({});
    const { username } = localStorage.getUser();

    console.log(user)

    async function getUser() {
        const response = await userService.get(username);
        console.log(response)
        const { data } = response;
        if (response.status === 200) {
            setUser(data);
            form.setFieldsValue({ name: data.name, username: data.username, email: data.email })
        }
        else {
            notification['error']({
                message: 'Usuário não autorizado',
            });
            localStorage.logout();
        }
    };

    useEffect(() => { getUser(); }, [])

    const onFinish = async (values) => {
        const response = await userService.put({
                ...values,
                externalId: user.externalId
            });
        console.log(response);
        console.log(values);
    };

    return (
        <div className="profile-container content-align-center form-container">
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Editar perfil</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor digite seu nome' }, { min: 7, message: 'Por favor digite um nome válido' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="username"
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