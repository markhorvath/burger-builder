import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
{/*    i f you only need active to be on one particular link, you could pass
    the exact property to NavigationItem here in example below, then in NavigationItem.js
    set the exact property to exact={props.exact}
    {/*<NavigationItem link="/" exact>Example for exact/active</NavigationItem>*/}
        <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default navigationItems;