import { SETTINGS_TOGGLE_CONTRASTMODE, SETTINGS_TOGGLE_METRIC, SHOW_ALERT_TOAST, HIDE_ALERT_TOAST, SETTINGS_TOGGLE_SCRAPER } from "../actions/types";
import { contrastmodeStorageKey, metricmodeStorageKey, ingredientScraperStorageKey } from "../actions/SettingsActions";

const INITIAL_STATE = 
{ 
    language: "no",
    contrastmode: false,
    metricmode: false,
    scraper: false,
    fontsize: 20,
    toastMessage: "",
};

export default (state = INITIAL_STATE, action) =>
{
    // console.log(action);
    
    switch(action.type)
    {
        case SETTINGS_TOGGLE_CONTRASTMODE: 
            let contrastmode = !state.contrastmode;
            localStorage.setItem(contrastmodeStorageKey, JSON.stringify(contrastmode));
            return { ...state, contrastmode: contrastmode };
        case SETTINGS_TOGGLE_METRIC: 
            let metricmode = !state.metricmode;
            localStorage.setItem(metricmodeStorageKey, JSON.stringify(metricmode));
            return { ...state, metricmode: metricmode };
        case SETTINGS_TOGGLE_SCRAPER: 
            let scraper = !state.scraper;
            localStorage.setItem(ingredientScraperStorageKey, JSON.stringify(scraper));
            return { ...state, scraper: scraper };

        case SHOW_ALERT_TOAST:
            return  { ...state, toastMessage: action.payload };
        case HIDE_ALERT_TOAST:
            return  { ...state, toastMessage: "" };

        default:
            return state;
    }
}