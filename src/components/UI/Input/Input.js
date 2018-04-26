import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
        // {...props} here will be whatever is uses in the <Input /> elements in ContactData.js
        // in this example, so things like name, type and placeholder are props here
            inputElement = <input
                            className={classes.InputElement}
                            {...props.elementConfig}
                            value={props.value} />
            break;
        case ('textarea'):
            inputElement = <textarea
                            className={classes.InputElement}
                            {...props.elementConfig}
                            value={props.value} />
            break;
        default:
            inputElement = <input
                            className={classes.InputElement}
                            {...props.elementConfig}
                            value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;