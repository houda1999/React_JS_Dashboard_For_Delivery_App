import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from '../resources/slugs';
import LoadingComponent from '../components/loading';
import DashboardComponent from './dashboard';
import SettingsComponent from '../Pages/Settings/Settings';
import Livreurs from '../Pages/Livreurs/Livreurs';
import Clients from '../Pages/Client/Client';
import Restaurants from '../Pages/Restaurants/Restaurant';
import Plats from '../Pages/Plats/Plats';
import Commandes from '../Pages/Commandes/Commandes';

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route path={SLUGS.Restaurants} component={Restaurants} />
                <Route exact path={SLUGS.Plats} component={Plats} />
                <Route exact path={SLUGS.Livreurs} component={Livreurs} />
                <Route exact path={SLUGS.Commandes} component={Commandes} /> 
                <Route exact path={SLUGS.Clients} component={Clients} />
                <Route exact path={SLUGS.settings} component={SettingsComponent} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
