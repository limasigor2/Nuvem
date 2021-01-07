import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Card from '../../Card/card';
import Historic from '../Historic/historic';

import './fileManager.scss';
import history from '../../../utils/history';

const FileManager = () => {

    const [showHistoric, setShowHistoric] = useState(false);

    return (
        <div className='file-manager-container'>
            <div className="page-header padding-page">
                <h2>Gerenciador de Arquivos</h2>
                <Button shape="circle" icon={<PlusOutlined />} onClick={() => history.push('/document')} />
            </div>
            <div className={showHistoric ? 'with-historic' : ''}>
                <div className="card-list">
                    <Card code={'Código do arquivo'} historic={() => setShowHistoric(!showHistoric)} edit={() => history.push('/document')} />
                </div>
                {showHistoric && <Historic close={() => setShowHistoric(false)} />}
            </div>
        </div>
    )
}

export default FileManager;