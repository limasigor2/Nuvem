import React, { useState } from 'react';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import Document from '../Document/document';

import './card.scss';

const Card = ({ name, remove, get, historic, edit }) => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');
    const [showDocument, setShowDocument] = useState(false);

    async function document() {
        setLoading(true);
        const file = await get();
        console.log(file);
        if (file.type === "application/octet-stream") {
            setType('application/pdf');
        }
        else setType(file.type);
        let fileURL = URL.createObjectURL(file);
        setFile(fileURL);
        if (file) {
            setLoading(false);
            setShowDocument(true);
        }
    }

    return (
        <div className="card-container">
            <div className="card-header style-header-and-footer">
                <h3>{name}</h3>
                <div className="file-actions">
                    <Button shape="circle" icon={<EditOutlined />} style={{ marginRight: '15px' }} onClick={() => edit()} />
                    <Button shape="circle" icon={<DeleteOutlined />} onClick={() => remove()} />
                </div>
            </div>
            {showDocument && <div className="file"><Document file={file} type={type} /></div>}
            <div className="card-footer style-header-and-footer">
                <Button onClick={() => showDocument ? setShowDocument(false) : document()} loading={loading}>
                    {showDocument ? 'Ocultar Arquivo' : 'Abrir Arquivo'}
                </Button>
                <Button onClick={() => historic()}>
                    Ver histórico
                </Button>
            </div>
        </div>
    )
}

export default Card;