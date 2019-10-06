import {
    RECIPE_LOADING, RECIPE_LOADING_COMPLETE, GET_DATABASE_DATA_SUCCESS
} from "../actions/types";

const INITIAL_STATE = 
{ 
    recipeError: "", 
    recipeLoading: false,
    databaseResult: {},
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

        case GET_DATABASE_DATA_SUCCESS:
            return { ...state, recipeLoading: false, recipeError: "", databaseResult: action.payload };
            case GET_DATABASE_DATA_SUCCESS:
                return { ...state, recipeLoading: false, recipeError: "", databaseResult: action.payload };
            
        default:
            return state;
    }
}