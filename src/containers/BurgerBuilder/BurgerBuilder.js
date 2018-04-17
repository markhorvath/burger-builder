import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    lettuce: 0.3,
    tomatoes: 0.3,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            tomatoes: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 2,
        purchaseable: false,
        purchasing: false,
        loading: false
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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("you continue");
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            /* on a production, real world site, price should b calculated on server
            to make sure user doesn't manipulate it in the browswer */
            price: this.state.totalPrice,
            customer: {
                name: "mark horv",
                address: {
                    street: "1234 test st",
                    zipCode: "99999",
                    country: "USA"
                },
                email: "test@email.com"
            },
            deliveryMethod: "fastest"
        }
        // the .json at the end is something specifically for firebase backends
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
                console.log(error);
            });
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
        let orderSummary = <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    purchase={this.purchaseHandler} />
            </Fragment>
        );
    }
}

export default BurgerBuilder;