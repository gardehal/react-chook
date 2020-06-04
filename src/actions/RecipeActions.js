import { DB_RECIPE } from "../resources/language";
import { GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, RECIPE_ERROR, SET_RECIPE_DATA_SUCCESS, SET_RECIPE_DATA_FAIL } from "./types";
import { getDatabaseData, setDatabaseData } from "../resources/Shared";
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

//Set
export const setRecipeData = async (payload) =>
{
    store.dispatch({ type: RECIPE_LOADING});

    setDatabaseData(DB_RECIPE, payload, SET_RECIPE_DATA_SUCCESS, SET_RECIPE_DATA_FAIL, RECIPE_LOADING, payload.id);
}