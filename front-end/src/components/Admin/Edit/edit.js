import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Tooltip} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import history from '../../../utils/history';
import userService from '../../../services/user';

const Edit = () => {
    const [form] = Form.useForm();

    const [user, setUser] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setDisabled(true);
        setLoading(true);
        const response = await userService.edit({
            ...values,
            externalId: user.externalId
        });
        const { data } = response;
        if (response.status === 200) {
            notification['success']({
                message: 'Edição realizada com sucesso!',
            });
            history.push("/admin");
        } else {
            setDisabled(false);
            setLoading(false);
            notification['error']({
                message: response.data.message,
            });
        }
    };

    useEffect(() => {
        if (history.location.state.user) {
            setUser(history.location.state.user);
            let data = history.location.state.user;
            console.log(data);
            let phones = [];

            for (let i = 0; i < data.phonenumbers.length; i++) {
                let aux = data.phonenumbers[i];
                let phone = `(${aux.ddd}) ${aux.number}`
                phones.push(phone);
            }

            form.setFieldsValue({ name: data.name, username: data.username, email: data.email, phonenumbers: phones });
        } else {
            history.push("/admin");
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
                <h1>Editar usuário</h1>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor o nome' }, { min: 7, message: 'Por favor digite um nome válido' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Nome de usuário"
                    name="username"
                    rules={[{ required: true, message: 'Por favor digite o nome de usuário' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor digite o email' }]}
                >
                    <Input disabled={disabled} />
                </Form.Item>

                <Form.List
                    label="Telefone(s)"
                    name="phonenumbers"
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
                            ))}
                            <Form.Item className="dynamic-form-button">
                                <Tooltip title="Adicionar outro telefone">
                                    <Button shape="circle" icon={<PlusOutlined />} disabled={disabled} onClick={() => add()} />
                                </Tooltip>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <div className="inline" style={{marginTop: 20}}>
                    <Button type="link" disabled={disabled} onClick={() => history.push("/admin")} className='no-padding-left'>
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

export default Edit;