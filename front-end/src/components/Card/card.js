import React, { useState } from 'react';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';

import Document from '../Document/document';

import './card.scss';

const Card = ({ code, historic, edit }) => {

    const [file, setFile] = useState(null);
    const [type, setType] = useState('');
    const [showDocument, setShowDocument] = useState(false);

    const getFile = () => {
        setShowDocument(true);
        setFile('njverniogr');
        setType('');
    }

    const document = () => {
        if (showDocument) setShowDocument(false);
        else {
            getFile();
        }
    }

    return (
        <div className="card-container">
            <div className="card-header style-header-and-footer">
                <h3>{code}</h3>
                <div className="file-actions">
                    <Button shape="circle" icon={<EditOutlined />} style={{marginRight:'15px'}} onClick={() => edit()} />
                    <Button shape="circle" icon={<DeleteOutlined />} />
                </div>
            </div>
            {showDocument && <div className="file"><Document file={file} type={type} /></div>}
            <div className="card-footer style-header-and-footer">
                <Button onClick={() => document()}>
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