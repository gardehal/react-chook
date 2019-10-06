import { createStore, combineReducers, applyMiddleware } from "redux";
import recipeReducer from "./reducers/RecipeReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({ recipeReducer });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;