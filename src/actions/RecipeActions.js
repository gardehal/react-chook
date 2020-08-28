import { DB_RECIPE } from "../resources/language";
import { GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, RECIPE_ERROR, SET_RECIPE_DATA_SUCCESS, SET_RECIPE_DATA_FAIL, USER_PERMISSION_DENIED } from "./types";
import { getDatabaseData, setDatabaseData } from "../resources/Shared";
import store from "../store";

// Get
export const getRecipeData = async (orderByChild = "", equalTo = "", limit = 0) =>
{
    return getDatabaseData(DB_RECIPE, GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, orderByChild, equalTo, limit);
}

export const setRecipeError = (error) =>
{
    store.dispatch({ type: RECIPE_ERROR, payload: error });
}

//Set
export const setRecipeData = async (payload) =>
{
    setDatabaseData(DB_RECIPE, payload, SET_RECIPE_DATA_SUCCESS, SET_RECIPE_DATA_FAIL, USER_PERMISSION_DENIED, RECIPE_LOADING, payload.id);
}