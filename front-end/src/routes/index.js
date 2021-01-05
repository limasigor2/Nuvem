import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/Login/login';
import Register from '../components/Register/register';

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route exact path='/register'>
                <Register />
            </Route>
        </Switch>
    )
}