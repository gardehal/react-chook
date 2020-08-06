import store from "../store";

import { SETTINGS_TOGGLE_CONTRASTMODE, SETTINGS_TOGGLE_METRIC, SHOW_ALERT_TOAST, HIDE_ALERT_TOAST, SETTINGS_TOGGLE_SCRAPER } from "./types";

export const contrastmodeStorageKey = "contrast_mode"; 
export const metricmodeStorageKey = "metric_ingredient_measurements"; 
export const ingredientScraperStorageKey = "ingredient_scraper"; 

export const toggleContrastMode = () =>
    store.dispatch({ type: SETTINGS_TOGGLE_CONTRASTMODE });

export const toggleMetricMode = () =>
    store.dispatch({ type: SETTINGS_TOGGLE_METRIC });

export const toggleScraper = () =>
    store.dispatch({ type: SETTINGS_TOGGLE_SCRAPER });

export const callToast = (message, time = 5000) =>
{
    store.dispatch({ type: SHOW_ALERT_TOAST, payload: message });
    
    if(time > 1)
        setTimeout(() => 
        {
            store.dispatch({ type: HIDE_ALERT_TOAST });
        }, time);
}