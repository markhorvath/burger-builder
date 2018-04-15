import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    // putting Logo in a div with className=classes.Logo
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={classes.SideDrawer}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Fragment>
    );
}

export default sideDrawer;