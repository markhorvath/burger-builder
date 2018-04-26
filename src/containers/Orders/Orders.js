import React, { Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders);
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => {
                    console.log(order);
                    return <Order
                    // could set this to {+order.price} to convert this string to a number
                            price={order.price}
                            ingredients={order.ingredients}
                            key={order.id} />
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);