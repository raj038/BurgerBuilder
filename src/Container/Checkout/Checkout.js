import React , {Component} from 'react';
import {Route} from 'react-router-dom';
import  {connect} from 'react-redux';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    cancelCheckoutHandler= ()=>{
        this.props.history.goBack();
    }

    continueCheckoutHandler= ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render (){
        return(
            <div>
                <CheckoutSummary  ingredients={this.props.ings}
                cancelPurchase={this.cancelCheckoutHandler}
                continuePurchase={this.continueCheckoutHandler}/>
                <Route path={this.props.match.url+ '/contact-data'} component={ContactData} />
            </div>
        ) 
    }
}

const mapStateToProps= state=>{
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
