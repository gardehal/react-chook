import store from "../store";

import { SETTINGS_TOGGLE_CONTRASTMODE, SHOW_ALERT_TOAST, HIDE_ALERT_TOAST } from "./types";

export const contrastmodeStorageKey = "contrastmode"; 

export const toggleContrastmode = (currentValue) =>
{
    store.dispatch({ type: SETTINGS_TOGGLE_CONTRASTMODE });
    localStorage.setItem(contrastmodeStorageKey, JSON.stringify(currentValue ? false : true));
}

export const callToast = (message, time = 5000) =>
{
    store.dispatch({ type: SHOW_ALERT_TOAST, payload: message });
    
    if(time > 1)
        setTimeout(() => 
        {
            store.dispatch({ type: HIDE_ALERT_TOAST });
        }, time);
}