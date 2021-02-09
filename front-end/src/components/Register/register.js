import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './register.scss';
import auth from '../../services/auth';
import localStorage from '../../services/localStorage';
import history from '../../utils/history';

const Register = () => {

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getUser()) {
            history.push('/home');
        }
    }, []);

    const onFinish = async (values) => {
        setDisabled(true);
        setLoading(true);
        console.log(values);
        console.log(values.phones[0].split(/\(|\) /));


        // const response = await auth.register(values);
        // if (response.status === 200) {
        //     notification['success']({
        //         message: 'Cadastro realizado com sucesso',
        //     });
        //     history.push('/');
        // } else {
        //     setDisabled(false);
        //     setLoading(false);
        //     notification['error']({
        //         message: response.data.message,
        //     });
        // }
    };

    return (
        <div className="register-container content-align-center form-container">
            <Form
                name="basic"
                onFinish={onFinish}
                layout={'vertical'}
                initialValues={{ phones: [""] }}
            >
                <h1>Crie sua conta</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor digite seu nome' }, { min: 7, message: 'Por favor digite um nome válido' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="id"
                    rules={[{ required: true, message: 'Por favor digite seu nome de usuário' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor digite seu email' }, { type: 'email', message: 'Por favor digite um email válido' }]}
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
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? "Telefone(s)" : ""}
                                    required={true}
                                    key={field.key}
                                >
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
                                                message: "Por favor, adicione um número de telefone teste",
                                            }

                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="(85) 99999-9999" disabled={disabled} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                            disabled={disabled} 
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                    disabled={disabled} 
                                >
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor digite sua senha' }]}
                >
                    <Input.Password disabled={disabled} />
                </Form.Item>

                <div className="inline">
                    <Button type="link" disabled={disabled} onClick={() => history.push("/")} className='no-padding-left'>
                        Entre na conta
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