import React, { Component } from 'react';
import {connect} from 'react-redux';

import Auxillary from '../../HOC/Auxillary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrder';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../Store/Actions';

class BurgerBuilder extends Component {

    state={
        purchasing: false,
        showLoader: false,
        error: false
    }

    componentDidMount(){
        
        // axios.get('/ingredients.json')
        //     .then(response=>{
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error =>{
        //         this.setState({
        //             error:true
        //         })
        //     });
    }

    updatePurchasable= (ingredients)=>{
        
        const sum= Object.keys(ingredients).map( igKey=>{
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum+el;
        }, 0);

        return sum>0;
    }

    purchaseHandler= () =>{
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler= () =>{
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler= () =>{
        // let queryParams=[];
        // for(let item in this.state.ingredients)
        // {
        //     queryParams.push( encodeURIComponent(item) + '=' + encodeURIComponent(this.state.ingredients[item]));
        // }
        // queryParams.push('price='+ this.state.totalPrice)
        // let queryString=queryParams.join('&');
        this.props.history.push('/checkout');
    }

    render(){
        let disableInfo={...this.props.ings};

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key]<=0;
        }

        let orderSummary= null;

        let burger=this.state.error? <p>Something Went Wrong !!!</p>:<Spinner/>
        if(this.props.ings)
        {
            burger=(
                <Auxillary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                    addIngredient={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    disableInfo={disableInfo}
                    price={this.props.totalPrice}
                    purchase={this.purchaseHandler}
                    purchasable={this.updatePurchasable(this.props.ings)}/>
                </Auxillary>
            )
            orderSummary= <OrderSummary
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.props.ings}
            price={this.props.totalPrice}/>;
        }
        
        if(this.state.showLoader)
        {
            orderSummary= <Spinner/>
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} purchaseCancel={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        )
    }
}

const mapStateToProps= state =>{
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        onIngredientAdded: (ingName) => dispatch ({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch ({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
