import React from "react";
import * as firebase from "firebase";
import store from "../store";

import { UNKNOWN_ERROR, LOADING, SUN, MON, TUE, WED, THU, FRI, SAT, JAN, FEB, MAR, APR, MAY, JUNE, JULY, AUG, SEPT, OCT, NOV, DEC, MAIN_TITLE } from "./language";
import { getTextColor } from "./colors";
import { Toast } from "../components/common/Toast";
import { USER_LOADING, USER_LOADING_COMPLETE } from "../actions/types";

// Firebase user can edit
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

// Get
export const getDatabaseData = async (tableName, reduxSuccessType = "", reduxFailType = "", reduxLoadingType = "", orderByChild = "", equalTo = "", limit = 0) =>
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

// Set DB
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

export const getRandomInt = (max) =>
{
    return Math.floor(Math.random() * Math.floor(max));
}

export const renderLoading = (bigSpinner = false, contrastmode = false) =>
{
    if(bigSpinner)
        return (
            <div key="renderLoadingLarge" className="centerContentDiv"> 
                {/* <Spinner/> */}
                <h1 style={{ ...getTextColor(contrastmode) }}>
                    {LOADING}
                </h1> 
            </div>);

    return (
        <div key="renderLoadingSmall"> 
            <p style={{ ...getTextColor(contrastmode) }}>
                {LOADING}
            </p> 
            {/* <Spinner/> */}
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

export const getNow = (includeTime = false) => 
{
    // Get today, in YYYY-MM-DD
    var date = new Date();
    let now = "";

    now += "Z" + date.getUTCFullYear();
    now += "-" + addLeadingZeros(date.getUTCMonth());
    now += "-" + addLeadingZeros(date.getUTCDate());

    if(includeTime)
    {
        now += "T" + addLeadingZeros(date.getUTCHours());
        now += "-" + addLeadingZeros(date.getUTCMinutes());
        now += "-" + addLeadingZeros(date.getUTCSeconds());
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

export const getRandomString = (length = 16) =>
{
    if(length > 32) length = 32;
    
    return (Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10) 
    + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)).substring(0, length);
};

export const toCamelCase = (s, delim = " ") =>
{
    var a = s.split(delim);
    var res = "";
    for (var item of a)
        res += delim.toString() + item.slice(0, 1).toUpperCase() + item.slice(1, item.length).toLowerCase();
    
    return res;
};

export const uppercaseFirst = (s) =>
{
    return s.toLowerCase()[0].toUpperCase();
};

// As Kolonial has responded with a bot response that boild down to "you're probably not getting API access" just use Selenium to do basically the same thing.
// Function should use Kolonial to search for ingredientName, get data for the first item such as name, price, mapping to IngredientType
// and return an Ingredient.
export const getKolonialItemWithSelenium = (ingredientName) =>
{
    // Input capabilities
    var capabilities = {
        'browserName' : 'Chrome',
        'browser_version' : '84.0 beta',
        'os' : 'Windows',
        'os_version' : '10',
        'resolution' : '1024x768',
        'browserstack.user' : 'USERNAME',
        'browserstack.key' : 'ACCESS_KEY',
        'name' : 'Bstack-[Node] Sample Test'
    };

    var webdriver = require('selenium-webdriver');
    var driver = new webdriver.Builder() 
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();

    // driver.get('https://www.kolonial.no')
    //     .then(function()
    //     {
    //         console.log(driver.getTitle());
    //         driver.quit();
    //         // driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack\n')
    //         //     .then(function()
    //         //     {
    //         //         driver.getTitle()
    //         //             .then(function(title)
    //         //             {
    //         //                 console.log(title);
    //         //                 driver.quit();
    //         //             });
    //         //     });
    //     });

};