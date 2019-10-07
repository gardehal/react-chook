import React from "react";
import firebase from "firebase";
import store from "../store";

import { UNKNOWN_ERROR, LOADING, SUN, MON, TUE, WED, THU, FRI, SAT, JAN, FEB, MAR, APR, MAY, JUNE, JULY, AUG, SEPT, OCT, NOV, DEC } from "../resources/language";

// Get
export const getDatabaseData = async (tableName, reduxSuccessType, reduxFailType, reduxLoadingType, orderByChild = "", equalTo = "", limit = 0) =>
{
    // return dispatch => 
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

                console.log("getDatabaseData result: ");
                console.log(data);
                store.dispatch({ type: reduxSuccessType, payload: data });
            })
            .catch((err) =>
            {
                console.error("getDatabaseData error: " + err);
                store.dispatch({ type: reduxFailType });
            });
    };
}

export const getRandomInt = (max) =>
{
    return Math.floor(Math.random() * Math.floor(max));
}

export const renderLoading = (bigSpinner = false) =>
{
    if(bigSpinner)
        return (
            <div> 
                {/* <Spinner/> */}
                <p>
                    {LOADING}
                </p> 
            </div>);

    return (
        <div> 
            <p>
                {LOADING}
            </p> 
            {/* <Spinner/> */}
        </div>);
}

export const renderError = (error = UNKNOWN_ERROR, bigText = false) =>
{
    if(bigText)
        return (
            <div>
                <p>
                    {error}
                    {/* Refresh */}
                </p>
            </div>);

    return (
        <div>
            <h3>
                {error}
                {/* Refresh/Go to home */}
            </h3>
        </div>);
}

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
    var full = (includeDay ? days[d.getDay()] : "") + " " + d.getDate() + ". " + months[d.getMonth()] + (includeYear ? " " + d.getFullYear() : "");

    return full;
};