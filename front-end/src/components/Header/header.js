import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, PaperClipOutlined } from '@ant-design/icons';

import Dropdown from '../Dropdown/dropdown';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import history from '../../utils/history';

import './header.scss';

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
            <Dropdown name={'fulana'} email={'fulana@gmail.com'} id={'full-ana'}/>
            { pathname !== '/document/validation' && <Button type="link" onClick={() => {history.push('/document/validation')}}>Validar arquivo <ArrowRightOutlined /></Button> }
        </div>
    )
}

export default Header;