import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary= (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope you Like It !!!</h1>
            <div style={{width: '100%' , margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
            clicked={props.cancelPurchase}>Cancel</Button>
            <Button btnType="Success"
            clicked={props.continuePurchase}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary;