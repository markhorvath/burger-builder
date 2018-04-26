import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            /* on a production, real world site, price should b calculated on server
            to make sure user doesn't manipulate it in the browswer */
            price: this.props.price,
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
                this.setState({loading: false});
                // See lec213 for nots about using this.props.history.push('/'); here
                // and adding {...props} to the render method for the <Route> ContactData
                // line in Checkout.js
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            });
        event.preventDefault();
    }

    render() {
        let form = (
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Your Street" />
                    <input type="text" name="postal" placeholder="Your Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                    <Button btnType="Danger">CANCEL</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data: </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;