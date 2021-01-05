import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link className="brand" to="/">
                <div className="brand">
                    Marca aqui
                </div>
            </Link>


        </div>
    )
}

export default Header;