import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './historic.scss'

const Historic = ({ close, data }) => {

    const card = (data, status, justificative) => {
        return (
            <div className="historic-card">
                <span>{data}</span>
                <div className="validation-data">
                    {
                        status === true ? <CheckCircleOutlined /> : <CloseCircleOutlined />
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