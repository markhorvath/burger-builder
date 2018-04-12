import React, { Component, Fragment } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    /* The whole point of this seems to be to see if there are any ingredients
    in the state (ie at least one must be above 0), this is a complicated way of doing this
    but is good practice for learning about Object.keys(), .map and .reduce */
    updatePurchaseState (ingredients) {
        console.log(ingredients);
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((initialValueAndCumulativeValue, currentElementValue) => {
                return initialValueAndCumulativeValue + currentElementValue;
            }, 0); /* The 0 here is just setting the starting point of the inital value */
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = priceAddition + this.state.totalPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        // created an immutable copy of the state
        const disabledInfo = {
            ...this.state.ingredients
        };

        // for each "key" in disabledInfo, returns true or false depending on whether
        // disabledInfo[key] <= 0, so will turn disabledInfo into something like
        // {salad: true, cheese: false, meat: true, bacon: false}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice} />
            </Fragment>
        );
    }
}

export default BurgerBuilder;