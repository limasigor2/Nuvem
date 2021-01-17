import React, { useState, useEffect } from 'react';
import { Button, Modal, notification, Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import history from '../../../utils/history';

import './list.scss';
import user from '../../../services/user';

const List = () => {
    const { confirm } = Modal;

    const [data, setData] = useState(null);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
    });
    const [loading, setLoading] = useState(false);

    async function fetchData(page, size) {
        setLoading(true);
        const response = await user.list(page, size);
        if (response.status === 200) {
            setData(response.data);
            setLoading(false);
        } else {
            setLoading(false);
            notification['error']({
                message: response.data.message,
            });
        }
    }

    useEffect(() => { fetchData(pagination.page, pagination.size) }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('aqui')
    };

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
                            pathname: 'admin/user/edit',
                            state: { user: record }
                        })} />
                    <Button shape="circle" icon={<DeleteOutlined />} onClick={() => showConfirm(record.externalId)} />
                </Space>
            ),
        },
    ];

    function showConfirm(externalId) {
        confirm({
            title: 'Você deseja deletar esse usuário?',
            content: 'Deletando, você concorda que todas os dados do mesmo serão removidos',
            async onOk() {
                const response = await user.delete(externalId);
                if (response.status === 200) {
                    fetchData(pagination.page, pagination.size);
                    notification['success']({
                        message: 'Usuário deletado com sucesso',
                    });
                } else {
                    notification['error']({
                        message: response.data.message,
                    });
                }
            },
            okText: "Deletar",
            cancelText: "Cancelar",
        });
    }

    return (
        <div className='user-manager-container' >
            <div className="page-header padding-page">
                <h2>Gerenciador de Usuários</h2>
                <Button shape="circle" icon={<PlusOutlined />} onClick={() => history.push('/admin/user/register')} />
            </div>
            <div className="table-container padding-page">
                <Table columns={columns} dataSource={data} loading={loading} pagination={pagination}
                    onChange={handleTableChange} />
            </div>
        </div>
    )
};

export default List;