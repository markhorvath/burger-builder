import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

// Setting height in Logo as props can then be used to style the Logo component
// in-line which will override the Logo.css setting, also done in Sidedrawer
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;