import React from 'react';
import { Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import './dropdown.scss';

const DropdownComponent = ({ name, id, email }) => {

    const menu = (
        <Menu>
            <Menu.Item className="menu-info">
                {name}
            </Menu.Item>
            <Menu.Item className="menu-info">
                {email}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <Link to="/edit/profile">
                    Editar perfil
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <a onClick={() => {}}>
                    Sair
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link dropdown-link" onClick={e => e.preventDefault()}>
                <span className="dropdown-id">{id}</span><CaretDownOutlined />
            </a>
        </Dropdown>
    )
};

export default DropdownComponent;