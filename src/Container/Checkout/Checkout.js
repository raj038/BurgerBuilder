import React , {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state={
        ingredients:{
            meat: 0,
            salad: 0,
            cheese:0,
            bacon: 0
        },
        totalPrice: null
    }

    componentDidMount(){
        const params=new URLSearchParams(this.props.location.search);
        let curIngredients={};
        let price;
        for(let item of params)
        {
            //[key, value] item is array of key and value
            if(item[0]==='price'){
                price=item[1];
            }
            else{
                curIngredients[item[0]]= +item[1];
            }
        }
        this.setState({
            ingredients: curIngredients,
            totalPrice: price
        })
    }

    cancelCheckoutHandler= ()=>{
        this.props.history.goBack();
    }

    continueCheckoutHandler= ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render (){
        return(
            <div>
                <CheckoutSummary  ingredients={this.state.ingredients}
                cancelPurchase={this.cancelCheckoutHandler}
                continuePurchase={this.continueCheckoutHandler}/>
                <Route path={this.props.match.url+ '/contact-data'} render={ (props)=> (
                <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        ) 
    }
}

export default Checkout;
