import React from 'react';
import Auxillary from '../../../HOC/Auxillary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    
    const summaryList= Object.keys(props.ingredients).map( igKey=>{
        return (<li key={igKey}>
                    <span style={{textTransform : "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
    })

    return(
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {summaryList}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Auxillary>
    )
}

export default OrderSummary;