import { getDatabaseData, setDatabaseData, addLeadingZeros } from "../resources/Shared";

import { GET_METADATA_DATA_SUCCESS, GET_METADATA_DATA_FAIL, METADATA_LOADING, SET_METADATA_DATA_SUCCESS, SET_METADATA_DATA_FAIL } from "./types";
import { DB_META, DB_INGREDIENT, DB_RECIPE } from "../resources/language";
import store from "../store";

// Get
export const getMetadataData = async (orderByChild = "", equalTo = "", limit = 0) =>
{
    getDatabaseData(DB_META, GET_METADATA_DATA_SUCCESS, GET_METADATA_DATA_FAIL, METADATA_LOADING, orderByChild, equalTo, limit);
}

//Set
export const setMetadataData = async () =>
{
    store.dispatch({ type: METADATA_LOADING});
    
    let iRes = await getDatabaseData(DB_INGREDIENT);
    let rRes = await getDatabaseData(DB_RECIPE);

    let meta_total_ingredients = iRes.length;
    let meta_total_recipes = rRes.length;
    
    let d = new Date();
    let meta_last_updated_utc = d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + addLeadingZeros(d.getUTCDate()) 
        + " " + addLeadingZeros(d.getUTCHours()) + ":" + addLeadingZeros(d.getUTCMinutes());

    let uploadObject = 
    {
        meta_total_ingredients,
        meta_total_recipes,
        meta_last_updated_utc,
    };

    let path = "content";

    setDatabaseData(DB_META, uploadObject, SET_METADATA_DATA_SUCCESS, SET_METADATA_DATA_FAIL, METADATA_LOADING, path);
}