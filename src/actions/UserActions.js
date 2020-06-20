
import * as firebase from "firebase";
import store from "../store";
import { USER_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_FAIL_EMAIL, USER_LOGIN_FAIL_REQUESTS, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL } from "./types";
import { confirmUserPermissions } from "../resources/Shared";

require('firebase/auth');

// Had this code not been public I'd use non-related variable name as part of security through obscurity
export const firebaseUserStorageKey = "firebaseUser"; 

// Authentication
export const login = async(username, password, provider) =>
{
    // Default to Firebase
    if(provider === null || provider === undefined)
        provider = 1;

    if(provider === "firebase" || provider === 1)
        await loginFirebase(username, password);

    window.location.reload();
};

export const logout = async(provider) =>
{
    // Default to Firebase
    if(provider === null || provider === undefined)
        provider = 1;

    if(provider === "firebase" || provider === 1)
        await logoutFirebase();

    window.location.reload();
};

//Firebase
const loginFirebase = async(username, password) =>
{
    store.dispatch({ type: USER_LOADING });

    await firebase.auth().signInWithEmailAndPassword(username, password)
        .then((u) =>
        {
            console.log("User " + username + " logged in succesfully.");
            store.dispatch({ type: USER_LOGIN_SUCCESS, payload: u });
            localStorage.setItem(firebaseUserStorageKey, JSON.stringify(u));
        })
        .catch((err) =>
        {
            console.error(err);
            if(err.code === "auth/invalid-email")
                store.dispatch({ type: USER_LOGIN_FAIL_EMAIL });
            else if(err.code === "auth/wrong-password")
                store.dispatch({ type: USER_LOGIN_FAIL });
            else if(err.code === "auth/too-many-requests")
                store.dispatch({ type: USER_LOGIN_FAIL_REQUESTS });
        });
};

const logoutFirebase = async() =>
{
    store.dispatch({ type: USER_LOADING });
    
    await firebase.auth().signOut()
        .then(() => 
        {
            console.log("User logged out succesfully.");
            store.dispatch({ type: USER_LOGOUT_SUCCESS });
            localStorage.setItem(firebaseUserStorageKey, null);
        })
        .catch((err) => 
        {
            console.error(err);
            store.dispatch({ type: USER_LOGOUT_FAIL });
        });
};

export const userCanEditFirebase = async() =>
{
    await confirmUserPermissions("firebase", "write");
};