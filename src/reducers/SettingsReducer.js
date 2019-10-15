import { SETTINGS_TOGGLE_CONTRASTMODE, SHOW_ALERT_TOAST, HIDE_ALERT_TOAST } from "../actions/types";

const INITIAL_STATE = 
{ 
    language: "no",
    contrastmode: false,
    fontsize: 20,
    toastMessage: "",
};

export default (state = INITIAL_STATE, action) =>
{
    // console.log(action);
    
    switch(action.type)
    {
        case SETTINGS_TOGGLE_CONTRASTMODE: 
            return { ...state, contrastmode: !state.contrastmode };

        case SHOW_ALERT_TOAST:
            return  { ...state, toastMessage: action.payload };
        case HIDE_ALERT_TOAST:
            return  { ...state, toastMessage: "" };

        default:
            return state;
    }
}