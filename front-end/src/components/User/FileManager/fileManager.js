import React from 'react';
import { Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import Card from '../../Card/card';

import './fileManager.scss';

const FileManager = () => {
    return (
        <div className='file-manager-container padding-page'>
            <div className="page-header">
                <h1>Gerenciador de Arquivos</h1>
                <Button shape="circle" icon={<PlusOutlined />} />
            </div>
            <div className="card-list">
                <Card code={'Código do arquivo'} />
            </div>
        </div>
    )
}

export default FileManager;