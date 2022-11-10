import React, { useContext, useEffect, useState } from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { SidebarContext } from '../../hooks/useSidebar';
import SLUGS from '../../resources/slugs';
import { IconBell, IconSearch } from '../../assets/icons';
import DropdownComponent from '../dropdown';
import {  useHistory} from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
    avatar: {
        borderRadius: 50,
        marginLeft: 14,
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        '@media (max-width: 768px)': {
            marginLeft: 14
        }
    },
    container: {
        height: 40
    },
    name: {
        ...theme.typography.itemTitle,
        textAlign: 'right',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: `1px solid ${theme.color.lightGrayishBlue2}`,
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 14,
            marginRight: 0
        }
    },
    title: {
        ...theme.typography.title,
        '@media (max-width: 1080px)': {
            marginLeft: 50
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
}));

function HeaderComponent() {
    const navigate = useHistory();
    const { push } = useHistory();
    const { currentItem } = useContext(SidebarContext);
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [name,setName]=useState('');
    const [photo,setPhoto]=useState('');
    let title;

    switch (true) {
        case currentItem === SLUGS.dashboard:
            title = 'Dashboard';
            break;
        case currentItem === SLUGS.Livreurs:
            title = 'Livreurs';
            break;
        case currentItem === SLUGS.Restaurants:
            title = 'Restaurants';
            break;
        case currentItem === SLUGS.Plats:
            title = 'Plats';
            break;
        case currentItem === SLUGS.Clients:
            title = 'Clients';
            break;
        case currentItem === SLUGS.Commandes:
            title = 'Commande';
            break;
        case currentItem === SLUGS.settings:
            title = 'Settings';
            break;
        default:
            title = '';
    }


    function onSettingsClick() {
        navigate.push(SLUGS.settings);
    }
    useEffect(()=>{
         setName(localStorage.getItem("name")) 
         setPhoto(localStorage.getItem("photo"))
    },[name,photo])

    return (
        <Row className={classes.container} vertical='center' horizontal='space-between'>
            <span className={classes.title}>{title}</span>
            <Row vertical='center'>
                <div className={classes.separator}></div>
                <DropdownComponent
                    label={
                        <>
                            <span className={classes.name}>{name}</span>
                            <img
                                width="50px" height="50px"
                                src={photo}
                                alt='profil'
                                className={classes.avatar}
                            />
                        </>
                    }
                    options={[
                        {
                            label: 'Settings',
                            onClick: onSettingsClick
                        },
                        {
                            label: 'Logout',
                            onClick: () =>{ localStorage.clear(); push(SLUGS.login);}
                        }
                    ]}
                    position={{
                        top: 52,
                        right: -6
                    }}
                />
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;
