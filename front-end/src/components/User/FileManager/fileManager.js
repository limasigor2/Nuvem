import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Card from '../../Card/card';
import Historic from '../Historic/historic';

import './fileManager.scss';
import history from '../../../utils/history';
import file from '../../../services/file';

const FileManager = () => {

    const [showHistoric, setShowHistoric] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => { fetchData() }, []);

    async function fetchData() {
        const response = await file.getFiles();
        if (response.status === 200) {
            setData(response.data);
            setLoading(false);
        } else {
            // setLoading(false);
            // notification['error']({
            //     message: response.data.message,
            // });
        }
    }

    return (
        <div className='file-manager-container'>
            <div className="page-header padding-page">
                <h2>Gerenciador de Arquivos</h2>
                <Button shape="circle" icon={<PlusOutlined />} onClick={() => history.push('/document')} />
            </div>
            {loading ? <div className="loading"><Spin /></div> :
                <div className={showHistoric ? 'with-historic' : ''}>
                    {data.map(item =>
                        <div className="card-list" key={item}>
                            <Card code={item} historic={() => setShowHistoric(!showHistoric)} edit={() => history.push('/document')} />
                        </div>
                    )}

                    {showHistoric && <Historic close={() => setShowHistoric(false)} />}
                </div>
            }
        </div>
    )
}

export default FileManager;