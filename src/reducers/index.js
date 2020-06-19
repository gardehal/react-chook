import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import MetadataReducer from './MetadataReducer';
import UserReducer from './UserReducer';
import RecipeReducer from './RecipeReducer';
import IngredientReducer from './IngredientReducer';

export default combineReducers({
    settings: SettingsReducer,
    meta: MetadataReducer,
    user: UserReducer,
    recipe: RecipeReducer,
    ingredient: IngredientReducer,
});
