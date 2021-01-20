import React, { useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import { ArrowRightOutlined, PaperClipOutlined } from '@ant-design/icons';

import Dropdown from '../Dropdown/dropdown';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import history from '../../utils/history';
import localStorage from '../../services/localStorage';
import userService from '../../services/user';

import './header.scss';

const Header = () => {
    const [user, setUser] = useState(null)
    const { pathname } = useLocation();

    async function getUser(username) {
        const response = await userService.get(username);
        if (response.status === 200) setUser(response.data);
        else {
            notification['error']({
                message: 'Usuário não autorizado',
            });
            localStorage.logout();
        }
    };

    useEffect(() => {
        if (localStorage.getUser()) {
            getUser(localStorage.getUser().username);
        }
        else {
            localStorage.logout();
        }
    }, []);

    return (
        <div className="header-content padding-page">
            <Link className="brand" to="/">
                <div className="brand">
                    <PaperClipOutlined />
                    <p>ValiDC</p>
                </div>
            </Link>
            {localStorage.getUser() ?
                <Dropdown email={localStorage.getUser().email} id={localStorage.getUser().username} />
                :
                <div>
                    {pathname !== '/document/validation' &&
                        <Button type="link" onClick={() => { history.push('/document/validation') }}>Validar arquivo <ArrowRightOutlined /></Button>
                    }
                </div>
            }
        </div>

    )
}

export default Header;