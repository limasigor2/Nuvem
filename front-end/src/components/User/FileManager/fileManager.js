import React from 'react';
import Card from '../../Card/card';

import './fileManager.scss';

const FileManager = () => {
    return (
        <div className='file-manager-container padding-page'>
            <div className="card-list">
                <Card code={'Código do arquivo'} />
            </div>
        </div>
    )
}

export default FileManager;