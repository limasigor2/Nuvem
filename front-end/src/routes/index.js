import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/Login/login';
import Register from '../components/Register/register';
import DocumentValidation from '../components/DocumentValidation/documentValidation';
import FileManager from '../components/User/FileManager/fileManager';

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
        </Switch>
    )
}