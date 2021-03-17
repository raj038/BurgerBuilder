import * as actionTypes from './Actions';

const ingredientPrices={
    salad: 10,
    meat: 20,
    bacon: 20,
    cheese: 15
}

const initialState={
    ingredients: {
        meat: 0,
        cheese: 0,
        bacon: 0,
        salad: 0
    },
    totalPrice: 10
}

const reducer= (state=initialState , action)=>{
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1
                },
                totalPrice: state.totalPrice + ingredientPrices[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]-1
                },
                totalPrice: state.totalPrice - ingredientPrices[action.ingredientName]
            }
        default:
            return state
    }
}

export default reducer;