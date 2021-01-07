import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/Login/login';
import Register from '../components/Register/register';
import DocumentValidation from '../components/DocumentValidation/documentValidation';
import FileManager from '../components/User/FileManager/fileManager';
import Profile from '../components/Profile/profile';
import AddFile from '../components/User/AddFile/addFile';
import UserManager from '../components/Admin/UserManager/userManager';
import UserRegistration from '../components/Admin/UserRegistration/userRegistration';

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route exact path='/register'>
                <Register />
            </Route>
            <Route exact path='/document/validation'>
                <DocumentValidation />
            </Route>
            <Route exact path='/home'>
                <FileManager />
            </Route>
            <Route exact path='/edit/profile'>
                <Profile />
            </Route>
            <Route exact path='/document'>
                <AddFile />
            </Route>
            <Route exact path='/admin'>
                <UserManager />
            </Route>
            <Route exact path='/admin/user'>
                <UserRegistration />
            </Route>
        </Switch>
    )
}