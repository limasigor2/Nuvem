import React, { useState } from 'react';
import { Form, Input, Button, notification, Tooltip } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import auth from '../../../services/auth';
import history from '../../../utils/history';

const Register = () => {

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setDisabled(true);
        setLoading(true);

        let phones = [];

        for (let i = 0; i < values.phones.length; i++) {
            let aux = values.phones[i].split(/\(|\) /);
            let phone = { ddd: aux[1], number: aux[2] }
            phones.push(phone)
        }

        const response = await auth.register({ ...values, phones: phones });
        if (response.status === 200) {
            notification['success']({
                message: 'Cadastro realizado com sucesso',
            });
            history.push('/');
        } else {
            notification['error']({
                message: response.data.message,
            });
            setDisabled(false);
            setLoading(false);
        }
    };

    return (
        <div className="register-container content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
                initialValues={{ phones: [""] }}
            >
                <h1>Cadastrar usuário</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor digite o nome' }, { min: 7, message: 'Por favor digite um nome válido' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="id"
                    rules={[{ required: true, message: 'Por favor digite o nome de usuário' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor digite o email' }, { type: 'email', message: 'Por favor digite um email válido' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.List
                    name="phones"
                    rules={[
                        {
                            validator: async (_, phones) => {
                                if (!phones || phones.length < 1) {
                                    return Promise.reject(new Error('Por favor, adicione um telefone'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {
                                fields.map((field, index) => (
                                    <div className={fields.length > 1 ? 'form-dynamic' : ''}>
                                        <Form.Item
                                            label={index === 0 ? "Telefone(s)" : ""}
                                            required={true}
                                            key={field.key}
                                        >
                                            {fields.length > 1 ? (
                                                <Button shape="circle" icon={<MinusOutlined />} disabled={disabled} onClick={() => remove(field.name)} />
                                            ) : null}
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Por favor, adicione um telefone",
                                                    },
                                                    {
                                                        pattern: '\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}',
                                                        message: "Por favor, adicione um número de telefone válido. Formato: (85) 99999-9999",
                                                    }

                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="(85) 99999-9999" disabled={disabled} />
                                            </Form.Item>
                                        </Form.Item>
                                    </div>
                                ))
                            }
                            <Form.Item className="dynamic-form-button">
                                <Tooltip title="Adicionar outro telefone">
                                    <Button shape="circle" icon={<PlusOutlined />} disabled={disabled} onClick={() => add()} />
                                </Tooltip>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor digite a senha' }]}
                >
                    <Input.Password disabled={disabled} />
                </Form.Item>

                <div className="inline">
                    <Button type="link" disabled={disabled} onClick={() => history.push("/")} className='no-padding-left'>
                        Cancelar
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

export default Register;