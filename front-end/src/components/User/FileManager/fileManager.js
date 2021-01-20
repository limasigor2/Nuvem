import React, { useEffect, useState } from 'react';
import { Button, Modal, notification, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Card from '../../Card/card';
import Historic from '../Historic/historic';

import './fileManager.scss';
import history from '../../../utils/history';
import file from '../../../services/file';
import localStorage from '../../../services/localStorage';
import validate from '../../../services/validate';

const FileManager = () => {
    const { confirm } = Modal;

    const [showHistoric, setShowHistoric] = useState(false);
    const [historicData, setHistoricData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => { fetchData() }, []);

    async function fetchData() {
        setLoading(true);
        const response = await file.getFiles();
        if (response.status === 200) {
            setData(response.data);
            setLoading(false);
        } else {
            setLoading(false);
            // setLoading(false);
            // notification['error']({
            //     message: response.data.message,
            // });
        }
    }

    async function get(item) {
        const username = localStorage.getUser().username;
        let filename = item.replace(username, "");
        const response = await file.get(filename);
        if (response.status === 200) {
            let file = new Blob([response.data], { type: response.headers['content-type'] });
            return file;
        } else {
            notification['error']({
                message: response.data.message,
            });
        }
    }

    function deleteConfirm(item) {
        const username = localStorage.getUser().username;
        let filename = item.replace(username, "");
        confirm({
            title: 'Você deseja deletar esse arquivo?',
            async onOk() {
                const response = await file.delete(filename);
                if (response.status === 200) {
                    fetchData();
                    notification['success']({
                        message: 'Arquivo deletado com sucesso',
                    });
                } else {
                    notification['error']({
                        message: response.data.message,
                    });
                }
            },
            okText: "Deletar",
            cancelText: "Cancelar",
        });
    }

    async function getHistoric(item) {
        if(historicData) setHistoricData(null);
        setShowHistoric(true);
        const username = localStorage.getUser().username;
        let aux = username + "/";
        let filename = item.replace(aux, "");
        const response = await validate.get(username, filename);
        if (response.status === 200) {
            setHistoricData(response.data);
        } else {
            notification['error']({
                message: response.data.message,
            });
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
                    {data &&
                        <div className="card-list" >
                            {data.map(item =>
                                <Card name={item} key={item} remove={() => deleteConfirm(item)} get={() => get(item)} historic={() => getHistoric(item)} edit={() => history.push('/document')} />
                            )}
                        </div>
                    }
                    {showHistoric && <Historic close={() => setShowHistoric(false)} data={historicData}/>}
                </div>
            }
        </div>
    )
}

export default FileManager;