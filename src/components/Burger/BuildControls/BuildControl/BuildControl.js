import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}>
            Remove
        </button>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.More} onClick={props.added}>Add</button>
    </div>
);

export default buildControl;