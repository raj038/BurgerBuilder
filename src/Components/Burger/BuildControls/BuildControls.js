import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const Controls=[
    { label: 'Meat' , type: 'meat'},
    { label: 'Cheese' , type: 'cheese'},
    { label: 'Salad' , type: 'salad'},
    { label: 'Bacon' , type: 'bacon'}
];

const BuildControls= (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {Controls.map(control=>{
                return <BuildControl key={control.label} 
                label={control.label}
                added={() => props.addIngredient(control.type)}
                removed={() => props.removeIngredient(control.type)}
                disable={props.disableInfo[control.type]}/>
            })}
            <button className={classes.OrderButton}  
            disabled={!props.purchasable}
            onClick={props.purchase}>ORDER NOW !!!</button>
        </div>
    )    
}

export default BuildControls; 