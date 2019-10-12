import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import MetadataReducer from './MetadataReducer';
import RecipeReducer from './RecipeReducer';
import IngredientReducer from './IngredientReducer';

export default combineReducers({
    settings: SettingsReducer,
    meta: MetadataReducer,
    recipe: RecipeReducer,
    ingredient: IngredientReducer,
});
