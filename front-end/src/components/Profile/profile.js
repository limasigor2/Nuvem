import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';

import userService from '../../services/user';
import localStorage from '../../services/localStorage';
import history from '../../utils/history';

import './profile.scss';

const Profile = () => {
    const [form] = Form.useForm();

    const [user, setUser] = useState({});
    const { username } = localStorage.getUser();

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
        const { data } = response;
        if (response.status === 200) {
            localStorage.update(data.email, data.username);
            notification['success']({
                message: 'Edição realizada com sucesso! Para continuar utilizando nosso sistema, por favor, realize login novamente',
            });
            localStorage.logout();
        }
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
                    rules={[{ min: 7, message: 'Por favor digite um nome válido' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="username"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                >
                    <Input.Password />
                </Form.Item>

                <div className="inline">
                    <Link to="/">
                        Cancelar
                    </Link>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Salvar
        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default Profile;