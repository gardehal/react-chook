import React from "react";
import firebase from "firebase/app";
import env from "./secrets/env";
import { Provider } from "react-redux";
import store from "./store";
import { NOT_FOUND_404, ERROR, PAGE_NOT_FOUND } from "./resources/language";

import HomePage from "./components/HomePage";
import { SETTINGS_TOGGLE_CONTRASTMODE } from "./actions/types";

class App extends React.Component 
{
    constructor(props) 
    {
        super(props);

        firebase.initializeApp(env);

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
                <div className="App">
                    <HomePage/>
                </div>
            </Provider>
        );
    }
}

export default App;