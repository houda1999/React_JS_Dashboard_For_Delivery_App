import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import PrivateSection from './PrivateSection';
import PublicRoutes from './PublicRoutes';

function Routes() {
    const { pathname } = useLocation();
   
    const [token,setToken] = useState(localStorage.getItem('loginToken'));

    useEffect(() => {
        setToken(localStorage.getItem('loginToken'))

    }, [pathname,token]);

   
    return token ? <PrivateSection /> : <PublicRoutes />;
}

export default Routes;
