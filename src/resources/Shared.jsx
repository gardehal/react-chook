import React from "react";
import * as firebase from "firebase";
import store from "../store";
// import { remote } from "webdriverio";

import { UNKNOWN_ERROR, LOADING, SUN, MON, TUE, WED, THU, FRI, SAT, JAN, FEB, MAR, APR, MAY, JUNE, JULY, AUG, SEPT, OCT, NOV, DEC, MAIN_TITLE, DB_RECIPE, DB_FETCH_FAILED, DB_INGREDIENT } from "./language";
import { getTextColor } from "./colors";
import { Toast } from "../components/common/Toast";
import { USER_LOADING, USER_LOADING_COMPLETE, GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, GET_INGREDIENT_DATA_SUCCESS, GET_INGREDIENT_DATA_FAIL, INGREDIENT_LOADING, INGREDIENT_LOADING_COMPLETE } from "../actions/types";
import { callToast } from "../actions/SettingsActions";
import { Spinner } from "../components/common/Spinner";
import { Ingredient } from "../models/Ingredient";
import { IngredientType } from "../models/enums/IngredientType";
import { QuantityUnit, QuantityUnitValue } from "../models/enums/QuantityUnit";

// Database basic functions

export const confirmUserPermissions = async(provider, action, uid) =>
{
    if(provider === undefined || provider === null || action === undefined || action === null)
        return null;

    let res = null;
    if(provider === "firebase" || provider === 1)
    {
        store.dispatch({ type: USER_LOADING });
        
        if(action === "write")
        {
            let id = getRandomString();
            await firebase.database().ref("/ping/" + id)
                .set({ id: id, datetime: getNow(true), uid: uid })
                .then(() =>
                {
                    console.log("User may edit.");
                    store.dispatch({ type: USER_LOADING_COMPLETE });
                    res = true;
                })
                .catch((err) =>
                {
                    console.log("User may not edit.");
                    store.dispatch({ type: USER_LOADING_COMPLETE });
                    res = false;
                });
        }
    }

    return res;
}

export const getDatabaseData = async (tableName, reduxSuccessType = "", reduxFailType = "", reduxLoadingType = "", orderByChild = "", equalTo = "", limit = 0, indexOn = 0) =>
{
    store.dispatch({ type: reduxLoadingType });
    let data = [];
    let ref = firebase.database().ref("/" + tableName + "/");

    if(orderByChild)
        ref = ref.orderByChild(orderByChild);
    if(equalTo)
        ref = ref.equalTo(equalTo);
    if(limit > 1)
        ref = ref.limitToFirst(limit);
    if(indexOn > 1)
        ref = ref.indexOn(indexOn);

    console.log("getDatabaseData for table \"" + tableName + "\"" 
        + (orderByChild ? ", orderByChild: \"" + orderByChild + "\"" : "") 
        + (equalTo ? ", equalTo: \"" + equalTo + "\"" : "")
        + (limit ? ", limit: \"" + limit + "\"" : ""));

    await ref
        .once("value", snapshot =>
        {
            if(snapshot.val())
                data = Object.values(snapshot.val());

            console.log("getDatabaseData for \"" + tableName + "\" result: ");
            console.log(data);
            store.dispatch({ type: reduxSuccessType, payload: data });
        })
        .catch((err) =>
        {
            console.error("getDatabaseData error: " + err);
            store.dispatch({ type: reduxFailType });
        });

    return data;
}

export const setDatabaseData = async (tableName, uploadObject, reduxSuccessType, reduxFailType, reduxFailPermissionType = null, reduxLoadingType = null,  path = "") =>
{
    store.dispatch({ type: reduxLoadingType });

    await firebase.database().ref("/" + tableName + "/" + path)
        .set(uploadObject)
        .then(() =>
        {
            console.log("setDatabaseData for \"" + tableName + "/" + path + "\" complete.");
            store.dispatch({ type: reduxSuccessType });
        })
        .catch((err) =>
        {
            console.error(err);

            if(err.code === "PERMISSION_DENIED")
                store.dispatch({ type: reduxFailPermissionType ?? UNKNOWN_ERROR });
            else
                store.dispatch({ type: reduxFailType ?? UNKNOWN_ERROR });
        });
}

// TODO - want to minimize send/recieve load as this is client side sorting
// Search database for searchterm.
// - searchterm is searchterm, regex allowed. Required.
// - matchLevel is how similar term and candidate must be; 0(regex), 1(strict), 2(medium), 3(relaxed), 4(loose). Default 0.
// - searchPropperties are propperties which should be searched, if empty search all. Default empty.
// - table is name of table to search, if null, search in all. Default null.
// - startIndex is what index in database search should start from, will affect the entire collection. Default 0.
// - endIndex is what index in databases search should end on, if zero take all, will affect the entire collection. Default 0.
// - dbLimit is limit of elements Firebase should include, if null, no limit. Individual for each table. Default null.
export const searchDatabase = async (searchTerm, matchLevel = 0, searchPropperties = [], table = null, startIndex = 0, endIndex = 0, dblimit = null) =>
{
    if(searchTerm === null)
        return null;
    
    let termsArray = [];
    let collection = [];
    let results = []; // TODO consider making it object of {find: item, reason: "level x: matched term on \"key\": \"value\""}

    // Set termsArray from searchTerm depending on matchLevel
    if(matchLevel === 0)
    {
        let regexSplit = searchTerm.split(";");
        termsArray[0] = new RegExp(regexSplit[0], regexSplit[1] ?? "gmi");
    }
    else if(matchLevel === 1 || matchLevel === 2)
    {
        termsArray[0] = searchTerm;
    }
    else if(matchLevel === 3)
    {
        termsArray = searchTerm.split(" ");
    }
    else if(matchLevel === 4)
    {
        searchTerm = searchTerm.toLowerCase();
        searchTerm = searchTerm.replace(",", "");
        termsArray = searchTerm.split(" ");
    }
    else 
        return null;

    // Get data from DB
    if(table === null)
    {
        collection = collection.concat(await getDatabaseData(DB_INGREDIENT, GET_INGREDIENT_DATA_SUCCESS, GET_INGREDIENT_DATA_FAIL, INGREDIENT_LOADING, null, null, dblimit));
        collection = collection.concat(await getDatabaseData(DB_RECIPE, GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, null, null, dblimit));
    }
    else if(table === DB_INGREDIENT)
    {
        collection = await getDatabaseData(DB_INGREDIENT, GET_INGREDIENT_DATA_SUCCESS, GET_INGREDIENT_DATA_FAIL, INGREDIENT_LOADING);
    }
    else if(table === DB_RECIPE)
    {
        collection = await getDatabaseData(DB_RECIPE, GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING);
    }
    else 
        return null;

    // Slice collection on indexes
    if((startIndex > 0 || endIndex < collection.length) && endIndex > 0)
        collection = collection.slice(startIndex, endIndex)

    console.log("Searching for " + termsArray + " in " + collection.length + " items, matchLevel " + matchLevel + " ...");
    // For each item in collection, go though each propperty and search on each term in termsArray
    for (let i = 0; i < collection.length; i++) 
    {
        let item = collection[i];

        let res = findIn(termsArray, item, searchPropperties, matchLevel);
        if(res.length > 0)
            results = results.concat(res);
    }

    console.log("results: " + results.length);
    // console.log(results); // Filtrate unique? Add add index based on hits and sort by that?
    return results;
}

const findIn = (termsArray, searchItem, searchPropperties, matchLevel) =>
{
    // console.log("findIn: ");
    // console.log(searchItem);
    let results = [];
    for(let key in searchItem)
    {
        if(searchPropperties.length > 0 && !searchPropperties.includes(key))
            continue;

        let v = searchItem[key];

        if(Array.isArray(v) || typeof v === "object")
        {
            // console.log("recursive on " + v);
            let res = findIn(termsArray, v, searchPropperties, matchLevel);
            if(res !== null)
                results = results.concat(res);
        }
        else
        {
            for(let tIndex in termsArray)
            {
                let t = termsArray[tIndex];
                // console.log(key + ": " + v + " <- " + t)
                
                if(matchLevel === 0)
                {     
                    if(t.test(v))
                    {
                        // console.log("Match on: " + t + " -> " + v);
                        results.push(searchItem);
                    }
                }
                else if(matchLevel === 1)
                {
                    if(v === t)
                    {
                        // console.log("Match on: " + t + " -> " + v);
                        results.push(searchItem);
                    }
                }
                else if(matchLevel === 2)
                {
                    if(v.toString().toLowerCase().includes(t.toLowerCase()))
                    {
                        // console.log("Match on: " + t + " -> " + v);
                        results.push(searchItem);
                    }
                }
                else if(matchLevel === 3)
                {
                    if(v.toString().toLowerCase().includes(t.toLowerCase()))
                    {
                        // console.log("Match on: " + t + " -> " + v);
                        results.push(searchItem);
                    }
                }
                else if(matchLevel === 4)
                {
                    if(v.toString().toLowerCase().includes(t.toLowerCase()))
                    {
                        // console.log("Match on: " + t + " -> " + v);
                        results.push(searchItem);
                    }
                }
            }   
        }
    }
    
    return results;
}

// Random related functions

// TODO: When database grows this will be slower. Add a table for index and ID, getRandomRecipe gets random int, look up in recipeIndex-table, return ID of recipe
// OR: get metadata, number of recipes, use .indexOn with random index, length 1? depends on how indexOn works, will be limited to last update 
// (can never get those added after latest update, may get index out of range)
export const getRandomRecipe = async (getByKey = null, getByValue = null, gotoDetails = false) =>
{
    let recipes = await getDatabaseData(DB_RECIPE, GET_RECIPE_DATA_SUCCESS, GET_RECIPE_DATA_FAIL, RECIPE_LOADING, getByKey.toString(), getByValue);

    if(recipes.length === 0)
    {
        callToast(DB_FETCH_FAILED);
        return null;
    }

    let i = getRandomInt(recipes.length - 1);
    console.log("Random recipe: " + i + "/" + recipes.length);
    console.log(recipes);
    let recipe = recipes[i];

    if(gotoDetails)
        window.location.assign("/details/?recipe=" + recipe.id);
    else
        return recipe; 
}

export const getRandomInt = (max) =>
{
    return Math.floor(Math.random() * Math.floor(max));
}

export const getRandomString = (length = 16) =>
{
    if(length > 32) length = 32;
    
    return (Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10) 
    + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)).substring(0, length);
};

// Render commodity items

export const renderLoading = (bigSpinner = false, contrastmode = false) =>
{
    if(bigSpinner)
        return (
            <div key="renderLoadingLarge" className="centerContentDiv"> 
                <Spinner/>
                <h1 style={{ ...getTextColor(contrastmode) }}>
                    {LOADING}
                </h1> 
            </div>);

    return (
        <div key="renderLoadingSmall"> 
            <Spinner/>
            <p style={{ ...getTextColor(contrastmode) }}>
                {LOADING}
            </p> 
        </div>);
}

export const renderError = (error = UNKNOWN_ERROR, bigText = false, contrastmode = false) =>
{
    if(bigText)
        return (
            <div key="renderErrorlarge" className="centerContentDiv"> 
                <h1 style={{ ...getTextColor(contrastmode) }}>
                    {error}
                    {/* Refresh */}
                </h1>
            </div>);

    return (
        <div key="renderErrorSmall">
            <p style={{ ...getTextColor(contrastmode) }}>
                {error}
                {/* Refresh/Go to home */}
            </p>
        </div>);
}

export const renderToast = (message, time = 5000, contrastmode = false, alttext = message, onClick = null) =>
{
    if(message)
        return <Toast key="alertToast" message={message} time={time} contrastmode={contrastmode} alttext={alttext} onClick={onClick}/>;
};

// Date/time

export const getNow = (includeTime = false) => 
{
    // Get today, in YYYY-MM-DD
    var date = new Date();
    let now = "";
    
    now += date.getUTCFullYear();
    now += "-" + addLeadingZeros(date.getUTCMonth());
    now += "-" + addLeadingZeros(date.getUTCDate());

    if(includeTime)
    {
        now += "T" + addLeadingZeros(date.getUTCHours());
        now += "-" + addLeadingZeros(date.getUTCMinutes());
        now += "-" + addLeadingZeros(date.getUTCSeconds());
        now += "Z";
    }

    return now;
};

export const incrementMinutes = (timeString, minutes = 15, decrement = false) => 
{
    if (!timeString) 
        return;

    const timeSplit = timeString.split(":");
    const d = new Date();

    d.setHours(parseInt(timeSplit[0]));

    if (decrement) 
        d.setMinutes(parseInt(timeSplit[1]) - minutes);
    else 
        d.setMinutes(parseInt(timeSplit[1]) + minutes);

    const h = d.getHours();
    const m = d.getMinutes();

    // Format: "07:15", "09:45", "10:30", "14:00" etc.
    return (h < 10 ? "0" : "") + h + ":" + ((m < 10 ? "0" : "") + m);
};

export const getLongFormatDate = (date, includeDay = true, includeYear = true ) => 
{   
    if (!date) 
        return;

    const days = [SUN, MON, TUE, WED, THU, FRI, SAT];
    const months = [JAN, FEB, MAR, APR, MAY, JUNE, JULY, AUG, SEPT, OCT, NOV, DEC];

    // Split and reverse date from DD-MM-YYYY to YYYY-MM-DD  if not already
    var tmpSplit = date.split("-");
    if (parseInt(tmpSplit[0]) < 99) 
    {
        date = tmpSplit[2] + "-" + tmpSplit[1] + "-" + tmpSplit[0];
    }

    // Format: "Mandag 17. Juni 2019", "Fredag 20. Januar"
    var d = new Date(date);
    var full = (includeDay ? days[d.getDay()] : "") + " " + addLeadingZeros(d.getDate()) + ". " + months[d.getMonth()] + (includeYear ? " " + d.getFullYear() : "");

    return full;
};

// Utilities

// Adds nOfZeros zeros in front of n, to the max digit-size of leadingLimit
export const addLeadingZeros = (n, nOfZeros = 1, leadingLimit = 10) =>
{
    let res = n;
    if(n < leadingLimit)
        for (let i = 0; i < nOfZeros; i++) 
            res = "0" + JSON.stringify(res);

    return res;
};

export const setTitle = (title = "") =>
{
    document.title = MAIN_TITLE + (title ? " | " + title : "");
};

export const toCamelCase = (s, delim = " ") =>
{
    var a = s.split(delim);
    var res = "";
    for (var item of a)
        res += delim.toString() + item.slice(0, 1).toUpperCase() + item.slice(1, item.length).toLowerCase();
    
    return res.trim();
};

export const uppercaseFirst = (s) =>
{
    return s.toLowerCase()[0].toUpperCase() + s.slice(1, s.length);
};

export const trimString = (s, repalceComma = false, splitIndex = 0, asNumber = false) =>
{
    let emptyRegex = new RegExp("\\s+", "gm");
    let split = [];
    let res = "";

    s = s.toString();
    s = s.replace("↵", "");
    s = s.replace(emptyRegex, " ");
    if(repalceComma)
        s = s.replace(",", ".")
    
    s = s.trim();
    split = s.split(" ")
    
    if(splitIndex < 1)
        splitIndex = split.length;

    for (let i = 0; i < splitIndex; i++) 
        res += split[i] + " ";

    if(asNumber)
        return Number(res.trim().match(/\d+[.|,]?\d*/gmi));

    return res.trim();
};

// As Kolonial has responded with an automated response that boils down to "you're probably not getting API access", just use Cheerio to do basically the same thing.
// Function should use Kolonial to search for ingredientName, get data for the first item , create and return an Ingredient.
export const getKolonialItemWithCheerio = async (ingredientName) =>
{
    store.dispatch({ type: INGREDIENT_LOADING });
    console.log("getKolonialItemWithCheerio: Starting ASYNC call go get ingredient \"" + ingredientName + "\" from Kolonial.no...");
    let cheerio = require("cheerio");

    let name = ingredientName;
    let is_commodity = false;
    if(name[name.length - 1] === "*")
    {
        is_commodity = true;
        name = name.slice(0, name.length - 1);
    }

    // https://github.com/Rob--W/cors-anywhere Local library?
    // Using cors-anywhere (Github: https://github.com/Rob--W/cors-anywhere/ ) as a proxy to circumvent CORS issues
    let corsAnywhere = "https://cors-anywhere.herokuapp.com/";
    let url = corsAnywhere + "https://kolonial.no/sok/?q=" + name;

    return await fetch(url)
        .then(response => response.text())
        .then(data =>
        {
            console.log("getKolonialItemWithCheerio: Started ASYNC call 1");
            // console.log(data); 
                
            let $ = cheerio.load(data);
            let searchRes = $(".product-list-item ");
            // console.log(searchRes); 

            if(!searchRes[0])
            {
                console.log("First fetch failed: searchRes was empty");
                store.dispatch({ type: INGREDIENT_LOADING_COMPLETE }); // TODO should fail with redux type, use error type to tell user no item found
                return null;
            }

            let detailsPath = searchRes[0].children[1].attribs.href;
            let kolonialId = detailsPath.match(/\/(\d+)-/)[1];
            let kolDetails = "https://kolonial.no" + detailsPath;
            let detailsUrl = corsAnywhere + kolDetails;
            console.log(kolDetails);

            if(!detailsUrl)
            {
                console.log("First fetch failed: detailsUrl was null");
                store.dispatch({ type: INGREDIENT_LOADING_COMPLETE });
                return null;
            }

            return fetch(detailsUrl)
                .then(response => response.text())
                .then(data =>
                {
                    console.log("getKolonialItemWithCheerio: Started ASYNC call 2");
                    // console.log(data); 

                    if(!data)
                    {
                        console.log("Second fetch failed: data was null");
                        store.dispatch({ type: INGREDIENT_LOADING_COMPLETE });
                        return null;
                    }
                    
                    let $ = cheerio.load(data);
                    let productInfo = $(".product-detail")[0];
                    console.log(productInfo);
                    
                    let originalName, brand, currency, price, type, energy_kj, cals_kcal, protein_gram, carbs_gram, sugar_gram, fat_gram, satFat_gram, salt_gram = null;
                    let sourceLink = kolDetails;
                    let id = getRandomString();
                    name = trimString(uppercaseFirst(name)) ?? null;
                    
                    let nameDiv = $(".name-extra")[0].parent;
                    originalName = trimString(nameDiv.children[0].data);
                    // console.log(originalName);
                    
                    let brandDiv = $(".brand-name")[0];
                    brand = brandDiv ? trimString(brandDiv.children[1].children[1].children[0].data) + " " : "";
                    // console.log(brand);

                    let priceDiv = $(".price ")[0];
                    currency = priceDiv ? " " + trimString(priceDiv.children[1].children[0].data) : "";
                    let intPrice = priceDiv ? trimString(priceDiv.children[2].data) : 0;
                    let decPrice = priceDiv ? trimString(priceDiv.children[4].children[0].data) : 0;
                    price = Number(intPrice + "." + decPrice);
                    // console.log(price);
                    // console.log("(" + currency + ") " + price.toString());

                    // TODO adapt/pasre/translate productInfo.children[1].children[5].children[1].children[1].children[0].data.toString().trim()
                    let typeDiv = $(".breadcrum")[0];
                    type = IngredientType[0];
                    // console.log(typeDiv);
                    
                    let nutritionDivId = "#nutrition-" + kolonialId;
                    let nutritionDiv = $(nutritionDivId);
                    // console.log(nutritionDiv);

                    // NB: Values per 100g/ml 
                    if(nutritionDiv.length === 0)
                        console.log("No nutrition-tab found.");
                    else
                    {
                        let nutritionTable = nutritionDiv.find(".table-striped")[0];
                        let nutritionArray = nutritionTable.children[3].children;
                        console.log(nutritionArray);

                        let nutritionArrayDestilled = [];
                        for (let i = 0; i < nutritionArray.length; i++) 
                            if(nutritionArray[i].children)
                                nutritionArrayDestilled.push(nutritionArray[i]);

                        console.log(nutritionArrayDestilled);
                        for (let i = 0; i < nutritionArrayDestilled.length; i++) 
                        {
                            let label = trimString(nutritionArrayDestilled[i].children[1].children[0].data);
                            let value = nutritionArrayDestilled[i].children[3].children[0].data;

                            console.log("Setting value - \"" + label + "\": \"" + value + "\"");
                            if(label === "Energi")
                            {
                                energy_kj = trimString(value, true, 2, true);
                                cals_kcal = trimString(value.split("/")[1], true, 2, true);
                            }
                            else if(label === "Fett")
                            {
                                fat_gram = trimString(value, true, 0, true);
                            }
                            else if(label === "hvorav mettede fettsyrer")
                            {
                                satFat_gram = trimString(value, true, 0, true);
                            }
                            else if(label === "Karbohydrater")
                            {
                                carbs_gram = trimString(value, true, 0, true);
                            }
                            else if(label === "hvorav sukkerarter")
                            {
                                sugar_gram = trimString(value, true, 0, true);
                            }
                            else if(label === "Protein")
                            {
                                protein_gram = trimString(value, true, 0, true);
                            }
                            else if(label === "Salt")
                            {
                                salt_gram = trimString(value, true, 0, true);
                            }
                        }
                    }

                    let ingredient = new Ingredient(id, name, type, price, is_commodity, cals_kcal, protein_gram, carbs_gram, sugar_gram, fat_gram, satFat_gram, salt_gram, brand + originalName, sourceLink);
                    console.log("Created new ingredient from Kolonial:");
                    console.log(ingredient);

                    store.dispatch({ type: INGREDIENT_LOADING_COMPLETE });
                    console.log("getKolonialItemWithCheerio: Finished ASYNC call 2");
                    return ingredient;
                });

            console.log("getKolonialItemWithCheerio: Finished ASYNC call 1");
        });
    console.log("getKolonialItemWithCheerio end");
};

// Convert quantity (of ex. an ingredient, from cups to gram) though recursion from orignal quantity/unit to quantity/gram to quantity/toUnit
// Measurements will be rounded to closest integer for water for simplicity. Flour, sugar, grains, powders etc. is going to be less, about 10% +/- 10 depending on mass.
// - quantity, the number of units
// - quantityUnit, the enum of what measurement unit was used
// - toUnit, the enum measurement unit to convert to
export const convertQuantityUnits = (quantity, quantityUnit, toUnit) =>
{
    if(quantity <= 0 
        || quantityUnit === null || QuantityUnit[quantityUnit.toString().toUpperCase()] === undefined 
        || toUnit === null || QuantityUnit[toUnit.toString().toUpperCase()] === undefined)
        return null;

    quantityUnit = quantityUnit.toString().toUpperCase();
    toUnit = toUnit.toString().toUpperCase();
	switch(QuantityUnit[quantityUnit])
	{
        // Cannot be quantified. If ingredient name contains package size like "1l ..." or "400g ...", maybe.
        case 0: // OTHER, unknown
        case 8: // QUBE,
        case 9: // PORTION,
        case 10: // SLICE,
        case 11: // WHOLE, 
        case 12: // PACK,
        case 13: // BOTTLE,
        case 14: // CAN,
        case 15: // UNIT,
        case 16: // SOME,
        case 17: // ALOT,
            return null;

        // General units
        // Kitchen "units"
        case 1: // TS, 1 teaspoon = 5 gram
            return convertQuantityUnits(quantity * 5, "G", toUnit);
        case 2: // TBS, 1 tablespoon = 15 gram
            return convertQuantityUnits(quantity * 15, "G", toUnit);
        case 3: // CUP, 1 cup = 235 gram
            return convertQuantityUnits(quantity * 235, "G", toUnit);

        // Partial units
        case 4: // CLOVE, 1 average clove of garlic is about 5 gram, according to a random YouTube video (https://youtu.be/dqmGplbZPfA) (about 5 from own experiemnts)
            return convertQuantityUnits(quantity * 5, "G", toUnit);
        case 5: // PINCH, 1 pinch = 0.5 gram, Wikipedia (https://en.wikipedia.org/wiki/Pinch_(unit)) suggests 1/8th of a teaspoon (0.625 g) to 1/16th (0.3125 g)
            return convertQuantityUnits(quantity * 0.5, "G", toUnit);
        case 6: // FIST, estimate 1 fist = 200 gram
            return convertQuantityUnits(quantity * 200, "G", toUnit);
        case 7: // LEAF, estimate 1 leaf = 1/15th, 1/20th of a gram 1 leaf = 0.06 gram
            return convertQuantityUnits(quantity * 0.06, "G", toUnit);
        
        // SI units
        // SI weight
        case 18: // MG, 1 milligram = 0.001 gram
            return convertQuantityUnits(quantity * 1000, "G", toUnit);
        case 19: // G,
            // Reverse propperties in parent switch
            switch(QuantityUnit[toUnit])
            {
                // Cannot be quantified. If ingredient name contains package size like "1l ..." or "400g ...", maybe.
                case 0: // OTHER, unknown
                case 8: // QUBE,
                case 9: // PORTION,
                case 10: // SLICE,
                case 11: // WHOLE, 
                case 12: // PACK,
                case 13: // BOTTLE,
                case 14: // CAN,
                case 15: // UNIT,
                case 16: // SOME,
                case 17: // ALOT,
                    return null;
        
                // General units
                // Kitchen "units"
                case 1: // TS, 1 teaspoon = 5 gram
                    return quantity * (1/5);
                case 2: // TBS, 1 tablespoon = 15 gram
                    return quantity * (1/15);
                case 3: // CUP, 1 cup = 235 gram
                return quantity * (1/235);
        
                // Partial units
                case 4: // CLOVE, 1 clove = 5 gram
                    return quantity * (1/5);
                case 5: // PINCH, 1 pinch = 0.5 gram
                    return quantity * (1/0.5);
                case 6: // FIST, estimate 1 fist = 200 gram
                    return quantity * (1/200);
                case 7: // LEAF, estimate 1 leaf = 1/15th, 1/20th of a gram 1 leaf = 0.06 gram
                    return quantity * (1/0.06);
                
                // SI units
                // SI weight
                case 18: // MG, 1 milligram = 0.001 gram
                    return quantity * (1/0.001);
                case 19: // G,
                    return quantity;
                case 20: // DAG, 1 dekagram = 10 gram
                    return quantity * (1/10);
                case 21: // HG, 1 hektogram = 100 gram
                    return quantity * (1/100);
                case 22: // KG, 1 kilogram = 1000 gram
                    return quantity * (1/1000);
        
                // SI length
                case 23: // MM, 1 millimeter = 1 gram
                    return quantity * (1/1);
                case 24: // CM, estimate 1 centimeter = 10 gram
                    return quantity * (1/10);
                case 25: // M, 1 meter = 1000 gram
                    return quantity * (1/1000);
        
                // SI volume
                case 26: // ML, 1 milliliter = 1 gram 
                    return quantity * (1/1);
                case 27: // CL, 1 centiliter = 10 gram
                    return quantity * (1/10);
                case 28: // DL, 1 deciliter = 100 gram
                    return quantity * (1/100);
                case 29: // L, 1 liter = 1000 gram
                    return quantity * (1/1000);
                
                // Imperial units
                // Imperial weight
                case 30: // GR, 1 grain = 0.065 gram
                    return quantity * (1/0.065);
                case 31: // IB, 1 pound = 450 gram
                    return quantity * (1/450);
                case 32: // ST, 1 stone = 6350 gram
                    return quantity * (1/6350);
        
                // Imperial length adapted from cm measurements
                case 33: // INCH, 1 inch = 2.5 gram
                    return quantity * (1/2.5);
                case 34: // FOOT, 1 foot = 300 gram
                    return quantity * (1/300);
        
                // Imperial volume
                case 35: // OZ, 1 fluid ounce = 28 gram
                    return quantity * (1/28);
                case 36: // PT, 1 pint = 470 gram
                    return quantity * (1/470);
                case 37: // QT, 1 quart = 945 gram
                    return quantity * (1/945);
                case 38: // GAL, 1 gallon = 3785 gram
                    return quantity * (1/3785);
            }
        case 20: // DAG, 1 dekagram = 10 gram
            return convertQuantityUnits(quantity * 10, "G", toUnit);
        case 21: // HG, 1 hektogram = 100 gram
            return convertQuantityUnits(quantity * 100, "G", toUnit);
        case 22: // KG, 1 kilogram = 1000 gram
            return convertQuantityUnits(quantity * 1000, "G", toUnit);

        // SI length
        case 23: // MM, 1 millimeter = 1 gram
            return convertQuantityUnits(quantity * 1, "G", toUnit);
        case 24: // CM, estimate 1 centimeter (thicker) ginger is 12 gram, round average thickness down to 10
            return convertQuantityUnits(quantity * 10, "G", toUnit);
        case 25: // M, 1 meter = 1000 gram
            return convertQuantityUnits(quantity * 1000, "G", toUnit);

        // SI volume
        case 26: // ML, 1 milliliter = 1 gram 
            return convertQuantityUnits(quantity, "G", toUnit);
        case 27: // CL, 1 centiliter = 10 gram
            return convertQuantityUnits(quantity * 10, "G", toUnit);
        case 28: // DL, 1 deciliter = 100 gram
            return convertQuantityUnits(quantity * 100, "G", toUnit);
        case 29: // L, 1 liter = 1000 gram
            return convertQuantityUnits(quantity * 1000, "G", toUnit);
        
        // Imperial units
        // Imperial weight
        case 30: // GR, 1 grain = 0.065 gram
            return convertQuantityUnits(quantity * 0.065, "G", toUnit);
        case 31: // IB, 1 pound = 450 gram
            return convertQuantityUnits(quantity * 450, "G", toUnit);
        case 32: // ST, 1 stone = 6350 gram
            return convertQuantityUnits(quantity * 6350, "G", toUnit);

        // Imperial length adapted from cm measurements
        case 33: // INCH, 1 inch = 2.5 gram
            return convertQuantityUnits(quantity * 2.5, "G", toUnit);
        case 34: // FOOT, 1 foot = 300 gram
            return convertQuantityUnits(quantity * 300, "G", toUnit);

        // Imperial volume
        case 35: // OZ, 1 fluid ounce = 28 gram
            return convertQuantityUnits(quantity * 28, "G", toUnit);
        case 36: // PT, 1 pint = 470 gram
            return convertQuantityUnits(quantity * 470, "G", toUnit);
        case 37: // QT, 1 quart = 945 gram
            return convertQuantityUnits(quantity * 946, "G", toUnit);
        case 38: // GAL, 1 gallon = 3785 gram
            return convertQuantityUnits(quantity * 3785, "G", toUnit);
    }

    return null;
};