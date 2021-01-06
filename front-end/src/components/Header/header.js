import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import './header.scss';
import history from '../../utils/history';

const Header = () => {
    const {pathname} = useLocation();
    console.log(pathname);
    return (
        <div className="header-content padding-page">
            <Link className="brand" to="/">
                <div className="brand">
                    <PaperClipOutlined />
                    <p>valiDC</p>
                </div>
            </Link>
            { pathname !== '/document/validation' && <Button type="link" onClick={() => {history.push('/document/validation')}}>Validar arquivo <ArrowRightOutlined /></Button> }
        </div>
    )
}

export default Header;