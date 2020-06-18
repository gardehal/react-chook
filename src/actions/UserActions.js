
import * as firebase from "firebase";
import store from "../store";

require('firebase/auth');

// Authentication
export const login = async(username, password, provider) =>
{
    // Default to Firebase
    if(provider === null || provider === undefined)
        provider = 1;

    if(provider === "firebase" || provider === 1)
        loginFirebase(username, password, null, null, null); // TODO types
};

export const logout = async(provider) =>
{
    // Default to Firebase
    if(provider === null || provider === undefined)
        provider = 1;

    if(provider === "firebase" || provider === 1)
        logoutFirebase(null, null, null); // TODO types
};

//Firebase
const loginFirebase = async(username, password, reduxLoadingType, reduxSuccessType, reduxFailType) =>
{
    store.dispatch({ type: reduxLoadingType });

    firebase.auth().signInWithEmailAndPassword(username, password)
        .then(() =>
        {
            console.log("User " + username + " logged in succesfully.");
            store.dispatch({ type: reduxSuccessType });
        })
        .catch((err) =>
        {
            console.error(err);
            store.dispatch({ type: reduxFailType });
        });
};

const logoutFirebase = (reduxLoadingType, reduxSuccessType, reduxFailType) =>
{
    store.dispatch({ type: reduxLoadingType });
    
    firebase.auth().signOut()
        .then(() => 
        {
            // Sign-out successful.
        })
        .catch((err) => 
        {
            // An error happened.
        });
};

export const userCanEditFirebase = (reduxLoadingType, reduxSuccessType, reduxFailType) =>
{
    store.dispatch({ type: reduxLoadingType });

    // firebase.auth.user
    // .. return true/false user can edit db
    store.dispatch({ type: reduxSuccessType });
    return false;
};