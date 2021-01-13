import React, { useEffect } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, PaperClipOutlined } from '@ant-design/icons';

import Dropdown from '../Dropdown/dropdown';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import history from '../../utils/history';
import localStorage from '../../services/localStorage';
import userService from '../../services/user';

import './header.scss';

const Header = () => {
    const { pathname } = useLocation();

    const user = localStorage.getUser();

    async function getUser(id){
        const response = await userService.get(id);
        console.log(response);
    }

    // useEffect(() => { if (!user) 
    //     localStorage.logout();
    //     else {
    //         // getUser(user.username);
    //     }
    //  }, []);

    return (
        <div className="header-content padding-page">
            <Link className="brand" to="/">
                <div className="brand">
                    <PaperClipOutlined />
                    <p>ValiDC</p>
                </div>
            </Link>
            {user ?
                <Dropdown name={user.name} email={user.email} id={user.username} />
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