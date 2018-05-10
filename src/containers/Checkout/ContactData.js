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
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zipcode'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: '',
                    valid: true
                }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        // again this is all done due to immutability of state, going through
        // orderForm and extracting all the values for each identifier, then assigning it to
        // the object formData which will then be passed in the const order
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            /* on a production, real world site, price should b calculated on server
            to make sure user doesn't manipulate it in the browswer */
            price: this.props.price,
            orderData: formData
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
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        // example of checking validation for a minimum length
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);

        let formIsValid = true;
        for (let inputIdentifiers in updatedOrderForm) {
            // this is checking that all valid properties in the updatedOrderForm object
            // are set to true AND that the formIsValid var 3 lines above is also true
            // because otherwise it would only set formIsValid to whatever the last
            // updatedOrderForm[inputIdentifier].valid in the loop is set to
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            // console.log(key); will return the keys in state.orderForm
            // console.log(this.state.orderForm[key]); will return the value objects
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElements.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>
                    ORDER</Button>
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