import React, { Fragment } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
        className={classes.Modal}
        // Conditional styles depending on whether props.show (purchasing in state) is true
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>
    </Fragment>
)

export default modal;