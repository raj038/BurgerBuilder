import React from 'react';
import classes from './Order.css';

const Order= (props)=>{
    
    let ingredients=[];
    for(let item in props.ingredients){
        ingredients.push({name: item, amount: props.ingredients[item]});
    }

    let ingredientOutput= ingredients.map(item=>{
        return <span key={item.name} style={{
            margin: "0 8px",
            padding: "5px",
            border: "1px solid #ccc",
            textTransform: "capitalize",
            display: "inline-block"
        }}>{item.name} ({item.amount})</span>
    })
   
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>INR {props.price}</strong></p>
        </div>
    )
}

export default Order;