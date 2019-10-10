import store from "../store";

import { SETTINGS_TOGGLE_CONTRASTMODE } from "./types";

export const toggleContrastmode = (currentValue) =>
{
    store.dispatch({ type: SETTINGS_TOGGLE_CONTRASTMODE });
    localStorage.setItem("contrastmode", JSON.stringify(currentValue ? false : true));
}