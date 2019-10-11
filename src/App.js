import React from "react";
import firebase from "firebase/app";
import env from "./secrets/env";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter , Route, Link } from "react-router-dom";

// Redux imports
import { SETTINGS_TOGGLE_CONTRASTMODE } from "./actions/types";

// Variable imports
import { NOT_FOUND_404, ERROR, PAGE_NOT_FOUND } from "./resources/language";

// Component imports
import HomePage from "./components/HomePage";
import DevPage from "./components/DevPage";
import Header from "./components/common/Header";

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
                    <BrowserRouter>
                        <Header/> 

                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/dev" component={DevPage}/>
                        
                        {/* <Footer/>  */}
                    </BrowserRouter >
                </Provider>
        );
    }
}

export default App;