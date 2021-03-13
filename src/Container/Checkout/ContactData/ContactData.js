import React , {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../Components/UI/Button/Button';
import axios from '../../../axiosOrder';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component{
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        showLoader: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
            
        this.setState({
            showLoader: true
        });
        const data={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Rajdeep',
                email: 'abc@email.com',
                address: {
                    country: 'India',
                    street : '123India',
                    ZipCode: 123456
                },
            },
            deliveryMethod: 'Fastest'
        }

        axios.post('/orders.json', data)
            .then( response =>{
                this.setState({
                    showLoader: false
                });
                this.props.history.push('/');
            })
            .catch( error=>{
                this.setState({
                    showLoader: false
                });
            });
    }

    render()
    {
        let form=(
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
        );

        if(this.state.showLoader)
        {
            form=<Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                <h3>Enter Your Contact Data</h3>
                {form}               
            </div>
        )
    }
}

export default ContactData;