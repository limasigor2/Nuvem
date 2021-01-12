import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../components/Login/login';
import Register from '../components/Register/register';
import DocumentValidation from '../components/DocumentValidation/documentValidation';
import FileManager from '../components/User/FileManager/fileManager';
import Profile from '../components/Profile/profile';
import AddFile from '../components/User/AddFile/addFile';
import UserManager from '../components/Admin/UserManager/userManager';
import UserRegistration from '../components/Admin/UserRegistration/userRegistration';

import localStorage from '../services/localStorage';

const rolesUser = localStorage.getRoles();

const grantAccess = (rolesPath) => {
    const array = [];
    rolesPath.forEach((rolePath) => {
        rolesUser.forEach((roleUser) => {
            if (rolePath.includes(roleUser)) {
                array.push(rolePath);
            }
        });
    });
    if (array.length > 0) return true;
}

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={(props) => {
        if (rolesUser && grantAccess(roles)) {
            return (
                <Component {...props} />
            )
        }
        return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    }} />
)

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/document/validation' component={DocumentValidation} />
            <PrivateRoute exact path='/home' roles={['ROLE_USER']} component={FileManager} />
            <PrivateRoute exact path='/edit/profile' roles={['ROLE_USER']} component={Profile} />
            <PrivateRoute exact path='/document' roles={['ROLE_USER']} component={AddFile} />
            <PrivateRoute exact path='/admin' roles={['ROLE_ADMIN']} component={UserManager} />
            <PrivateRoute exact path='/admin/user' roles={['ROLE_ADMIN']} component={UserRegistration} />
            <Route component={Login} />
        </Switch>
    )
}