import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import history from '../../../utils/history';
import userService from '../../../services/user';

const Edit = () => {
    const [form] = Form.useForm();

    const [user, setUser] = useState(null);

    const onFinish = async (values) => {
        const response = await userService.edit({
            ...values,
            externalId: user.externalId
        });
        const { data } = response;
        if (response.status === 200) {
            // localStorage.update(data.email, data.username);
            // notification['success']({
            //     message: 'Edição realizada com sucesso! Para continuar utilizando nosso sistema, por favor, realize login novamente',
            // });
            // localStorage.logout();
        }
    };

    // async function getUser(username) {
    //     const response = await user.getByUsername(username);
    //     console.log(response)
    //     const { data } = response;
    //     if (response.status === 200) {
    //         form.setFieldsValue({ name: data.name, username: data.username, email: data.email })
    //     }
    //     else {
    //         // notification['error']({
    //         //     message: 'Usuário não autorizado',
    //         // });
    //         // localStorage.logout();
    //     }
    // };

    useEffect(() => {
        if (history.location.state.user) {
            setUser(history.location.state.user);
            let data = history.location.state.user;
            form.setFieldsValue({ name: data.name, username: data.username, email: data.email })
        };
    }, [])

    return (
        <div className="user-registration-container content-align-center form-container">
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Resgistro de usuário</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor o nome' }, { min: 7, message: 'Por favor digite um nome válido' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="username"
                    rules={[{ required: true, message: 'Por favor digite o nome de usuário' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor digite o email' }]}
                >
                    <Input />
                </Form.Item>
                <div className="inline">
                    <Link to="/admin">
                        Cancelar
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

export default Edit;