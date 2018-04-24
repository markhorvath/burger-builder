import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        console.log(query);
        console.log(query.entries());
        for (let param of query.entries()) {
            console.log(param);
            if (param[0] === 'price') {
                price = param[1];
            } else {
            // the + in +param[1] converts it to a number
                ingredients[param[0]] = +param[1];
            }

        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    // goBack() and replace() are just methods in this.props.navigation
    checkoutCancelledHandler = () => {
        this.props.history.pop();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                    />
            </div>
        )
    }
}

export default Checkout;