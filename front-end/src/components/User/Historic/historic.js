import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './historic.scss'

const Historic = ({ close, data }) => {

    const card = (data, status, justificative) => {

        const date = new Date(data);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');

        const formatted = `${day}/${month}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

        return (
            <div className="historic-card">
                <div className="date"><span>{formatted}</span></div>
                <div className="validation-data">
                    {
                        status === true ?
                            <div className="valid">
                                <CheckCircleOutlined />
                            </div>
                            :
                            <div className="invalid">
                                <CloseCircleOutlined />
                            </div>
                    }
                    <p>
                        {justificative}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="historic-container">
            <div className="historic-header">
                <h2>Histórico de validações</h2>
                <CloseOutlined onClick={() => close()} />
            </div>
            {data ?
                <div className="historic-content">
                    {data.map(item =>
                        card(item.createdAt, item.isValid, item.motivo)
                    )}
                </div>
                :
                <div className="loading"><Spin /></div>
            }
        </div>
    )
}

export default Historic;