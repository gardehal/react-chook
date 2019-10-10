import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import MetadataReducer from './MetadataReducer';
import RecipeReducer from './RecipeReducer';

export default combineReducers({
    settings: SettingsReducer,
    meta: MetadataReducer,
    recipe: RecipeReducer,
});
