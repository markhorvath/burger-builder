import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid input</p>;
    }

    switch (props.elementType) {
        case ('input'):
        // {...props} here will be whatever is uses in the <Input /> elements in ContactData.js
        // in this example, so things like name, type and placeholder are props here
            inputElement = <input
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea
                            className={inputClasses}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
                            <select
                                className={inputClasses}
                                value={props.value}
                                onChange={props.changed}>
                                {props.elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.displayValue}
                                    </option>
                                ))};
                            </select>
            );
            break;
        default:
            inputElement = <input
                            className={inputClasses}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;