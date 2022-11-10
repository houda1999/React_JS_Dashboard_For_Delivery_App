import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from '../../resources/slugs';

import { convertSlugToUrl } from '../../resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import { faTachometerAlt,faMotorcycle,
    faStore,faFile,faUtensils,faCogs,faSignOutAlt,
    faUserFriends} from '@fortawesome/fontawesome-free-solid'

const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent() {
    const { push } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;

    async function logout() {
        localStorage.clear()
        push(SLUGS.login);
    }

    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.dashboard}
                title='Dashboard'
                iconItem={faTachometerAlt}
                onClick={() => onClick(SLUGS.dashboard)}
            />
            <MenuItem
                id={SLUGS.Livreurs}
                title='Livreurs'
                iconItem={faMotorcycle}
                onClick={() => onClick(SLUGS.Livreurs)}
            />
            <MenuItem
                id={SLUGS.Restaurants}
                title='Restaurants'
                iconItem={faStore}
                onClick={() => onClick(SLUGS.Restaurants)}
            />


            <MenuItem
                id={SLUGS.Clients}
                title='Clients'
                iconItem={faUserFriends}
                onClick={() => onClick(SLUGS.Clients)}
            />

            <MenuItem
                id={SLUGS.Commandes}
                title='Commandes'
                iconItem={faFile}
                onClick={() => onClick(SLUGS.Commandes)}
            />

            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.settings}
                title='Settings'
                iconItem={faCogs}
                onClick={() => onClick(SLUGS.settings)}
            />

            <MenuItem id='logout' title='Logout' iconItem={faSignOutAlt} onClick={logout} />
        </Menu>
    );
}

export default SidebarComponent;
