import React, { Component } from 'react';
import Auxillary from '../../HOC/Auxillary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrder';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

const ingredientPrices={
    salad: 10,
    meat: 20,
    bacon: 20,
    cheese: 15
}

class BurgerBuilder extends Component {

    state={
        ingredients: null,
        totalPrice: 10,
        purchasable: false,
        purchasing: false,
        showLoader: false,
        error: false
    }


    componentDidMount(){
        
        axios.get('/ingredients.json')
            .then(response=>{
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error =>{
                this.setState({
                    error:true
                })
            });
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

        this.setState({
            showLoader: true
        });
        const data={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                    showLoader: false,
                    purchasing: false
                });
            })
            .catch( error=>{
                this.setState({
                    showLoader: false,
                    purchasing: false
                });
            });

    }

    render(){

        let disableInfo={...this.state.ingredients};

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key]<=0;
        }

        let orderSummary= null;

        let burger=this.state.error? <p>Something Went Wrong !!!</p>:<Spinner/>
        if(this.state.ingredients)
        {
            burger=(
                <Auxillary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disableInfo={disableInfo}
                    price={this.state.totalPrice}
                    purchase={this.purchaseHandler}
                    purchasable={this.state.purchasable}/>
                </Auxillary>
            )
            orderSummary= <OrderSummary
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder, axios);