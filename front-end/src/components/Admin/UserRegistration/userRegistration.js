import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const UserRegistration = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div className="user-registration-container content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <h1>Resgistro de usuário</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor o nome' }, { min: 30, message: 'Por favor digite um nome válido' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Identificação"
                    name="id"
                    rules={[{ required: true, message: 'Por favor digite o nome de identificação' }]}
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

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor digite a senha' }]}
                >
                    <Input.Password />
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

export default UserRegistration;