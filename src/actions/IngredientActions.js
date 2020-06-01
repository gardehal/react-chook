import { getDatabaseData, setDatabaseData } from "../resources/Shared";

import { GET_INGREDIENT_DATA_SUCCESS, GET_INGREDIENT_DATA_FAIL, INGREDIENT_LOADING, SET_INGREDIENT_DATA_SUCCESS, SET_INGREDIENT_DATA_FAIL } from "./types";
import { DB_INGREDIENT } from "../resources/language";
import store from "../store";

// Get
export const getIngredientData = async (orderByChild = "", equalTo = "", limit = 0) =>
{
    getDatabaseData(DB_INGREDIENT, GET_INGREDIENT_DATA_SUCCESS, GET_INGREDIENT_DATA_FAIL, INGREDIENT_LOADING, orderByChild, equalTo, limit);
}

//Set
export const setIngredientData = async (payload) =>
{
    store.dispatch({ type: INGREDIENT_LOADING});

    setDatabaseData(DB_INGREDIENT, payload, SET_INGREDIENT_DATA_SUCCESS, SET_INGREDIENT_DATA_FAIL, INGREDIENT_LOADING);
}