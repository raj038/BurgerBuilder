import React, {Component} from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axiosOrder';

class Orders extends Component {
    
    state={
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then( res=>{
                let fetchOrders=[];
                for(let key in res.data)
                {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({
                    loading: false,
                    orders: fetchOrders
                })
            })
            .catch( err=>{
                console.log(err);
                this.setState({
                    loading: false
                })
            })
    }

    render()
    {
        return (
        <div>
            {this.state.orders.map( order=>{
                return <Order key={order.id} 
                ingredients={order.ingredients}
                price={order.price} />
            })}
        </div>)
    }
}

export default Orders;