import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

import './historic.scss'

const Historic = ({close}) => {
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
                <CloseOutlined onClick={() => close()}/>
            </div>
            <div className="historic-content">
                {card('bciuberfub', true, 'niujbnibnionbp')}
                {card('bciuberfub', true, 'niujbnibnionbp')}
            </div>
        </div>
    )
}

export default Historic;