import { INGREDIENT_LOADING, INGREDIENT_LOADING_COMPLETE, GET_INGREDIENT_DATA_SUCCESS, GET_INGREDIENT_DATA_FAIL, SET_INGREDIENT_DATA_SUCCESS, SET_INGREDIENT_DATA_FAIL } from "../actions/types";

import { DB_FETCH_FAILED, DB_SET_FAILED } from "../resources/language";

const INITIAL_STATE = 
{ 
    ingredientError: "", 
    ingredientLoading: false,
    ingredientResult: [],
};

export default (state = INITIAL_STATE, action) =>
{
    // console.log(action);
    
    switch(action.type)
    {
        case INGREDIENT_LOADING:
            return { ...state, ingredientLoading: true, ingredientError: "" };
        case INGREDIENT_LOADING_COMPLETE:
            return { ...state, ingredientLoading: false, ingredientError: "" };

        case GET_INGREDIENT_DATA_SUCCESS:
            return { ...state, ingredientLoading: false, ingredientError: "", ingredientResult: action.payload };
        case GET_INGREDIENT_DATA_FAIL:
            return { ...state, ingredientLoading: false, ingredientError: DB_FETCH_FAILED };

        case SET_INGREDIENT_DATA_SUCCESS:
            return { ...state, ingredientLoading: false, ingredientError: "" };
        case SET_INGREDIENT_DATA_FAIL:
            return { ...state, ingredientLoading: false, ingredientError: DB_SET_FAILED };
            
        default:
            return state;
    }
}