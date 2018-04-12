import React from 'react';
import classes from './Modal.css';

const modal = (props) => (
    <div
        className={classes.Modal}
        // Conditional styles depending on whether props.show (purchasing in state) is true
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>
)

export default modal;