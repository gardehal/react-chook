import React from "react";
import firebase from "firebase";
import store from "../store";

import { UNKNOWN_ERROR, LOADING, SUN, MON, TUE, WED, THU, FRI, SAT, JAN, FEB, MAR, APR, MAY, JUNE, JULY, AUG, SEPT, OCT, NOV, DEC, MAIN_TITLE } from "./language";
import { getTextColor } from "./colors";
import { Toast } from "../components/common/Toast";

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

// Set
export const setDatabaseData = async (tableName, uploadObject, reduxSuccessType = "", reduxFailType = "", reduxLoadingType = "",  path = "") =>
{
    store.dispatch({ type: reduxLoadingType });

    firebase.database().ref("/" + tableName + "/" + path)
        .set(uploadObject)
        .then(() =>
        {
            console.log("setDatabaseData for \"" + tableName + "/" + path + "\" complete.");
            store.dispatch({ type: reduxSuccessType });
        })
        .catch((err) =>
        {
            console.error(err);
            store.dispatch({ type: reduxFailType });
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

export const getToday = () => 
{
    // Get today, in YYYY-MM-DD
    var date = new Date();

    let today = date.getFullYear() + "-";
    // Since JS" dates does not use 0X for single number dates, add them
    today += (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1 + "-");
    today += (date.getDate() + 1 < 10 ? "0" : "") + date.getDate();

    return today;
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

export const getRandomString = (length = 8) =>
{
    if(length > 32) length = 32;
    
    return (Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10) 
    + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)).substring(0, length);
};