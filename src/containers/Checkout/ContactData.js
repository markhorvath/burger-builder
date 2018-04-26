import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zipcode'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                }
        },
        loading: false
    }

    orderHandler = (event) => {
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            /* on a production, real world site, price should b calculated on server
            to make sure user doesn't manipulate it in the browswer */
            price: this.props.price
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
                    <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                    <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                    <Input inputtype="input" type="text" name="street" placeholder="Your Street" />
                    <Input inputtype="input" type="text" name="postal" placeholder="Your Postal Code" />
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