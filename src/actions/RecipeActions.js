import { DB_RECIPE } from "../resources/language";
import { GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING } from "./types";
import { getDatabaseData } from "./Shared";


// Get
export const getRecipeData = async (orderByChild = "", equalTo = "", limit = 0) =>
{
    getDatabaseData(DB_RECIPE, GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, orderByChild, equalTo, limit);
}