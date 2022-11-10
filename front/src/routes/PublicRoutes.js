import React from 'react';
import { Redirect, Route, Switch} from 'react-router-dom';
import SLUGS from '../resources/slugs';
import { Login } from '../Pages/Login/Login';
import { ForgetPassword } from '../Pages/ForgetPass/ForgetPass';
import { ResetPassword } from '../Pages/ResetPassword/ResetPassword';
import {ErrorPage} from '../Pages/ErroPage/ErrorPage'

function PublicRoutes() {
    return (
        <Switch>
            <Route path={SLUGS.login} component={Login} />
            <Route path={SLUGS.forgotPass} component={ForgetPassword} />
            <Route path={SLUGS.resetPassword} component={ResetPassword} />
            <Route path={SLUGS.error} component={ErrorPage} />
            <Redirect to={SLUGS.login} />
        </Switch>
    );
}

export default PublicRoutes;
