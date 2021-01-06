import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Card from '../../Card/card';
import Historic from '../Historic/historic';

import './fileManager.scss';

const FileManager = () => {

    const [showHistoric, setShowHistoric] = useState(false);

    return (
        <div className={`file-manager-container`} >
            <div className="page-header padding-page">
                    <h1>Gerenciador de Arquivos</h1>
                    <Button shape="circle" icon={<PlusOutlined />} />
                </div>
            <div className={showHistoric ? 'with-historic' : ''}>
                <div className="card-list">
                    <Card code={'Código do arquivo'} historic={() => setShowHistoric(!showHistoric)}/>
                </div>
                {showHistoric && <Historic close={() => setShowHistoric(false)}/>}
            </div>
        </div>
    )
}

export default FileManager;