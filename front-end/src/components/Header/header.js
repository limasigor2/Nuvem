import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './header.scss';
import history from '../../utils/history';

const Header = () => {
    return (
        <div className="header-content padding-page">
            <Link className="brand" to="/">
                <div className="brand">
                    <PaperClipOutlined />
                    <p>valiDC</p>
                </div>
            </Link>
            <Button type="link" onClick={() => {history.push('/document/validation')}}>Validar arquivo <ArrowRightOutlined /></Button>
        </div>
    )
}

export default Header;