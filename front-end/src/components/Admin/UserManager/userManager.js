import React, { useState, useEffect } from 'react';
import { Button, Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import history from '../../../utils/history';

import './userManager.scss';
import user from '../../../services/user';

const UserManager = () => {

    async function fetchData(size, page) {
        const response = await user.list(size, page);
        setData(response.data);
        console.log(response);
    }

    async function deleteUser(externalId) {
        const response = await user.delete(externalId);
    }

    useEffect(() => { fetchData(0, 10) }, []);

    const [data, setData] = useState(null);


    const columns = [
        {
            title: 'Nome de usuário',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button shape="circle" icon={<EditOutlined />} style={{ marginRight: '15px' }} onClick={() => history.push(
                        {
                            pathname: 'admin/user',
                            state: { user: record }
                        })} />
                    <Button shape="circle" icon={<DeleteOutlined />} onClick={() => deleteUser(record.externalId)} />
                </Space>
            ),
        },
    ];

    return (
        <div className='user-manager-container' >
            <div className="page-header padding-page">
                <h2>Gerenciador de Usuários</h2>
                <Button shape="circle" icon={<PlusOutlined />} onClick={() => history.push('admin/user')} />
            </div>
            <div className="table-container padding-page">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
};

export default UserManager;