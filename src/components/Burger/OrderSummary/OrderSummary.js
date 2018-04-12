import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
                    : {props.ingredients[ingKey]}
                </li>
            )
        }
    );
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button
                clicked={props.purchaseCancelled}
                btnType="Danger">CANCEL</Button>
            <Button
                clicked={props.purchaseContinued}
                btnType="Success">CONTINUE</Button>
        </Fragment>
    )
}

export default orderSummary;