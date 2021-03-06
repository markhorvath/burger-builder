import React, { Component, Fragment } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // This could be a functional component, doesn't have to be a class
    componentWillUpdate() {
        console.log("OrderSummary will update");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
                        : {this.props.ingredients[ingKey]}
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
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button
                    clicked={this.props.purchaseCancelled}
                    btnType="Danger">CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinued}
                    btnType="Success">CONTINUE</Button>
            </Fragment>
        );
    }
}

export default OrderSummary;