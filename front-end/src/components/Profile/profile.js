import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

import userService from '../../services/user';
import localStorage from '../../services/localStorage';
import history from '../../utils/history';

import './profile.scss';

const Profile = () => {
    const [form] = Form.useForm();

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const { username } = localStorage.getUser();

    async function getUser() {
        setDisabled(true);
        const response = await userService.get(username);
        console.log(response)
        const { data } = response;
        if (response.status === 200) {
            setUser(data);
            form.setFieldsValue({ name: data.name, username: data.username, email: data.email });
            setDisabled(false);
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
        setDisabled(true);
        setLoading(true);
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
        } else {
            setDisabled(true);
            setLoading(true);
            notification['error']({
                message: response.data.message,
            });
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
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="username"
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                >
                    <Input.Password disabled={disabled} />
                </Form.Item>

                <div className="inline">
                    <Button type="link" disabled={disabled} onClick={() => history.push("/")} className='no-padding-left'>
                        Cancelar
                        </Button>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={disabled} loading={loading}>
                            Salvar
        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default Profile;