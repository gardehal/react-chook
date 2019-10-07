import {
    RECIPE_LOADING, RECIPE_LOADING_COMPLETE, GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL
} from "../actions/types";

import { DB_FETCH_FAILED } from "../resources/language";

const INITIAL_STATE = 
{ 
    recipeError: "", 
    recipeLoading: false,
    recipeResult: {},
};

export default (state = INITIAL_STATE, action) =>
{
    // console.log(action);
    
    switch(action.type)
    {
        case RECIPE_LOADING:
            return { ...state, recipeLoading: true, recipeError: "" };
        case RECIPE_LOADING_COMPLETE:
            return { ...state, recipeLoading: false, recipeError: "" };

        case GET_RECIPE_DATA_SUCCESS:
            return { ...state, recipeLoading: false, recipeError: "", recipeResult: action.payload };
        case GET_RECIPE_DATA_FAIL:
            return { ...state, recipeLoading: false, recipeError: DB_FETCH_FAILED };
            
        default:
            return state;
    }
}