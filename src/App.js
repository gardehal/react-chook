import React from "react";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route } from "react-router-dom";

// Redux imports
import { SETTINGS_TOGGLE_CONTRASTMODE } from "./actions/types";
import { getApiExample } from "./resources/ApiExample";

// Variable imports
import { NOT_FOUND_404, ERROR, PAGE_NOT_FOUND } from "./resources/language";

// Component imports
import HomePage from "./components/HomePage";
import DevPage from "./components/DevPage";
import Header from "./components/common/Header";
import ListPage from "./components/ListPage";
import RecipeDetailsPage from "./components/RecipeDetailsPage";
import SearchPage from "./components/SearchPage";
import UploadPage from "./components/UploadPage";

class App extends React.Component 
{
    constructor(props) 
    {
        super(props);

        // let env = import("./secrets/env");
        // let env =
        // {
        //     apiKey: process.env.fb_apikey,
        //     authDomain: process.env.fb_authdom,
        //     databaseURL: process.env.fb_dburl,
        //     projectId: process.env.fb_pid,
        //     storageBucket: process.env.fb_storebuck,
        //     messagingSenderId: process.env.fb_msgid
        // }

        firebase.initializeApp(process.env.FirebaseObject);

        // getApiExample("https://rallycoding.herokuapp.com/api/music_albums");

        // Get stored settings from localStorage
        if(localStorage.getItem("contrastmode") === "true")
            store.dispatch({ type: SETTINGS_TOGGLE_CONTRASTMODE });
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
                        
                        {/* <Footer/>  */}
                    </BrowserRouter >
                </Provider>
        );
    }
}

export default App;