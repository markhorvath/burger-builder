import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button
    // props.btnType will have to be assigned dynamically outside
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}
        </button>
);

export default button;