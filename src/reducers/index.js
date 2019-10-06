import { combineReducers } from 'redux';
import MetadataReducer from './MetadataReducer';
import RecipeReducer from './RecipeReducer';

export default combineReducers({
    meta: MetadataReducer,
    recipe: RecipeReducer,
});
