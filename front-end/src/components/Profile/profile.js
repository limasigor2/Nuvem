import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
        const { data } = response;
        if (response.status === 200) {
            setUser(data);

            let phones = [];

            for (let i = 0; i < data.phonenumbers.length; i++) {
                let aux = data.phonenumbers[i];
                let phone = `(${aux.ddd}) ${aux.number}`
                phones.push(phone);
            }

            form.setFieldsValue({ name: data.name, username: data.username, email: data.email, phonenumbers: phones });
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

        let phones = [];
        let phoneNumbers = user.phonenumbers;

        for (let i = 0; i < values.phonenumbers.length; i++) {
            let id = phoneNumbers[i].id;
            let aux = values.phonenumbers[i].split(/\(|\) /);
            let phone = { id: id, ddd: aux[1], number: aux[2] }
            phones.push(phone)
        }

        const response = await userService.put({
            ...values,
            externalId: user.externalId,
            phonenumbers: phones
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
                                                message: "Por favor, adicione um número de telefone válido",
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