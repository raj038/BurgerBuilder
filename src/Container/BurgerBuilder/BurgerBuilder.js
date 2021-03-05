import React, { Component } from 'react';
import Auxillary from '../../HOC/Auxillary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

const ingredientPrices={
    salad: 10,
    meat: 20,
    bacon: 20,
    cheese: 15
}

class BurgerBuilder extends Component {

    state={
        ingredients:{
            meat: 0,
            cheese: 0,
            bacon: 0,
            salad: 0
        },
        totalPrice: 10,
        purchasable: false
    }

    updatePurchasable= (ingredients)=>{
        
        const sum= Object.keys(ingredients).map( igKey=>{
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum+el;
        }, 0);

        this.setState({
            purchasable: sum>0
        });
    }

    addIngredientHandler= (type)=>{
        let preCount=this.state.ingredients[type];
        let updIngredients= {...this.state.ingredients};
        updIngredients[type]= preCount+1;

        let updPrice=this.state.totalPrice;
        updPrice=updPrice + ingredientPrices[type];

        this.setState({
            ingredients: updIngredients,
            totalPrice: updPrice
        });

        this.updatePurchasable(updIngredients);
    }

    removeIngredientHandler= (type)=>{
        let preCount=this.state.ingredients[type];
        
        if(preCount<=0)
        {
            return;
        }
        
        let updIngredients= {...this.state.ingredients};
        updIngredients[type]= preCount-1;

        let updPrice=this.state.totalPrice;
        updPrice=updPrice - ingredientPrices[type];

        this.setState({
            ingredients: updIngredients,
            totalPrice: updPrice
        });

        this.updatePurchasable(updIngredients);
    }

    render(){

        let disableInfo={...this.state.ingredients};

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key]<=0;
        }

        return(
            <Auxillary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disableInfo={disableInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}/>
            </Auxillary>
        )
    }
}

export default BurgerBuilder;