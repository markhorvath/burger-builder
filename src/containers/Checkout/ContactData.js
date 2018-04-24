import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data: </h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Your Street" />
                    <input type="text" name="postal" placeholder="Your Postal Code" />
                    <Button btnType="Success">ORDER</Button>
                    <Button btnType="Danger">CANCEL</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;