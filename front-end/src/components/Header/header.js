import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
    return (
        <div className="header-content padding-page">
            <Link className="brand" to="/">
                <div className="brand">
                    <span>
                        vali
                    </span>
                    DC
                </div>
            </Link>
        </div>
    )
}

export default Header;