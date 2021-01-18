import React from 'react';
import './document.scss';

const Document = ({file, type}) => {
    return (
        <div className="document-container">
            <div className={`document-file ${type === 'application/pdf' ? 'typePdf' : ''}`} >
                {console.log(file)}
                {type === 'application/pdf' ?
                    <embed className="file" src={file} width="100%"></embed> :
                    <img src={file} className="img"/>
                }
            </div>
        </div>
    )
}

export default Document;