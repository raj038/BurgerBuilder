import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger= (props)=>{
    
    let transformedIngredients= Object.keys(props.ingredients).map(igkey =>{
        return [...Array(props.ingredients[igkey])].map( (_,index)=>{
            return <BurgerIngredient key={igkey+index} type={igkey}/>
        })
    }).reduce((arr,cur)=>{
        return arr.concat(cur);
    },[]);

    if(transformedIngredients.length===0)
    {
        transformedIngredients= <p>Please Add the Ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger;