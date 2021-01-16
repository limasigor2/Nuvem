import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../components/Login/login';
import Register from '../components/Register/register';
import DocumentValidation from '../components/DocumentValidation/documentValidation';
import FileManager from '../components/User/FileManager/fileManager';
import Profile from '../components/Profile/profile';
import AddFile from '../components/User/AddFile/addFile';
import UserManager from '../components/Admin/List/list';
import UserRegistration from '../components/Admin/Register/register';
import UserEdition from '../components/Admin/Edit/edit';

import localStorage from '../services/localStorage';
import rolesPath from '../utils/roles';

const grantAccess = (rolesUser) => {
    const array = [];
    rolesPath.forEach((rolePath) => {
        rolesUser.forEach((roleUser) => {
            if (rolePath.role === roleUser) {
                array.push(rolePath.path);
            }
        });
    });
    return array;
}

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest}
        render={props => {
            if (localStorage.getUser()) {
                let allowedRoutes = grantAccess(localStorage.getRoles());
                if (allowedRoutes.includes(rest.location.pathname)) {
                    return (< Component {...props} />);
                } else if (allowedRoutes.length > 0) {
                    return <Redirect to={{ pathname: allowedRoutes[0], state: { from: props.location } }} />
                } else if (allowedRoutes.length === 0)
                    localStorage.logout();
            }
            return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        }
        }
    />
)

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/document/validation' component={DocumentValidation} />
            <PrivateRoute exact path='/home' component={FileManager} />
            <PrivateRoute exact path='/edit/profile' component={Profile} />
            <PrivateRoute exact path='/document' component={AddFile} />
            <PrivateRoute exact path='/admin' component={UserManager} />
            <PrivateRoute exact path='/admin/user/edit' component={UserEdition} />
            <PrivateRoute exact path='/admin/user/register' component={UserRegistration} />
            <Route component={Login} />
        </Switch>
    )
}