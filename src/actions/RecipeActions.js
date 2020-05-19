import { DB_RECIPE } from "../resources/language";
import { GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, RECIPE_ERROR } from "./types";
import { getDatabaseData } from "../resources/Shared";
import store from "../store";

// Get
export const getRecipeData = async (orderByChild = "", equalTo = "", limit = 0) =>
{
    getDatabaseData(DB_RECIPE, GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, orderByChild, equalTo, limit);
}

export const setRecipeError = (error) =>
{
    store.dispatch({ type: RECIPE_ERROR, payload: error });
}