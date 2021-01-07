import React, { useState } from 'react';
import { Button, Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import history from '../../../utils/history';

import './userManager.scss';

const columns = [
    {
        title: 'Identificador',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name'
    },
    {
        key: 'action',
        render: (record) => (
            <Space size="middle">
                <Button shape="circle" icon={<EditOutlined />} style={{ marginRight: '15px' }} onClick={() => history.push('admin/user')} />
                <Button shape="circle" icon={<DeleteOutlined />} />
            </Space>
        ),
    },
];


const UserManager = () => {
    const [data, setData] = useState([{
        key: '1',
        name: 'John Brown',
        id: 32,
    },]);

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