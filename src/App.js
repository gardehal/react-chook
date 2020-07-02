import React from "react";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route } from "react-router-dom";

// Redux imports
import { SETTINGS_TOGGLE_CONTRASTMODE, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, SETTINGS_TOGGLE_SCRAPER } from "./actions/types";
import { getApiExample } from "./resources/ApiExample";

// Variable imports
import { NOT_FOUND_404, ERROR, PAGE_NOT_FOUND } from "./resources/language";

// Component imports
import HomePage from "./components/HomePage";
import DevPage from "./components/DevPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ListPage from "./components/ListPage";
import RecipeDetailsPage from "./components/RecipeDetailsPage";
import SearchPage from "./components/SearchPage";
import UploadPage from "./components/UploadPage";

import { contrastmodeStorageKey, ingredientScraperStorageKey } from "./actions/SettingsActions";
import { firebaseUserStorageKey } from "./actions/UserActions";

class App extends React.Component 
{
    constructor(props) 
    {
        super(props);

        let env =
        {
            apiKey: process.env.REACT_APP_FB_KEY,
            authDomain: process.env.REACT_APP_FB_DOM,
            databaseURL: process.env.REACT_APP_FB_URL,
            projectId: process.env.REACT_APP_FB_PID,
            storageBucket: process.env.REACT_APP_FB_SBU,
            messagingSenderId: process.env.REACT_APP_FB_SID
        }
        firebase.initializeApp(env);

        // getApiExample("https://rallycoding.herokuapp.com/api/music_albums");

        // Get stored settings from localStorage
        if(localStorage.getItem(contrastmodeStorageKey) === "true")
            store.dispatch({ type: SETTINGS_TOGGLE_CONTRASTMODE });
        if(localStorage.getItem(ingredientScraperStorageKey) === "true")
            store.dispatch({ type: SETTINGS_TOGGLE_SCRAPER });
        if(localStorage.getItem(firebaseUserStorageKey))
            try
            {
                store.dispatch({ type: USER_LOGIN_SUCCESS, payload: JSON.parse(localStorage.getItem(firebaseUserStorageKey)) });
            }
            catch
            {
                store.dispatch({ type: USER_LOGIN_FAIL });
            }
    }
   
    notFound() 
    {
        return (
            <div>
                <h2>{NOT_FOUND_404}</h2>
                <p>
                    {ERROR + ": " + PAGE_NOT_FOUND}
                </p>
            </div>
        );
    };

    render()
    {
        return (
                <Provider store={store}>
                    <BrowserRouter>
                        <Header/> 

                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/dev" component={DevPage}/>
                        <Route exact path="/list" component={ListPage}/>
                        <Route exact path="/details" component={RecipeDetailsPage}/>
                        <Route exact path="/search" component={SearchPage}/>
                        <Route exact path="/upload" component={UploadPage}/>
                        
                        <Footer/> 
                    </BrowserRouter >
                </Provider>
        );
    }
}

export default App;