import React from "react";
import firebase from "firebase/app";
import env from "./secrets/env";
import { Provider } from "react-redux";
import store from "./store";

import { NOT_FOUND_404, ERROR, PAGE_NOT_FOUND } from "./resources/language-no";

class App extends React.Component 
{
    constructor(props) 
    {
        super(props);

        firebase.initializeApp(env);
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
                    <header className="App-header">
                        Hello World!
                    </header>
                </div>
            </Provider>
        );
    }
}

export default App;

