import store from "../store";

import { SETTINGS_TOGGLE_CONTRASTMODE } from "./types";

export const toggleContrastmode = () =>
{
    store.dispatch({ type: SETTINGS_TOGGLE_CONTRASTMODE });
}