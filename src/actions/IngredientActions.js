import { DB_RECIPE, DB_INGREDIENT } from "../resources/language";
import { GET_INGREDIENT_DATA_SUCCESS, GET_INGREDIENT_DATA_FAIL, INGREDIENT_LOADING } from "./types";
import { getDatabaseData } from "./Shared";


// Get
export const getIngredientData = async (orderByChild = "", equalTo = "", limit = 0) =>
{
    getDatabaseData(DB_INGREDIENT, GET_INGREDIENT_DATA_SUCCESS, GET_INGREDIENT_DATA_FAIL, INGREDIENT_LOADING, orderByChild, equalTo, limit);
}