import { SETTINGS_TOGGLE_CONTRASTMODE } from "../actions/types";

const INITIAL_STATE = 
{ 
    language: "no",
    contrastmode: false,
    fontsize: 20,
};

export default (state = INITIAL_STATE, action) =>
{
    // console.log(action);
    
    switch(action.type)
    {
        case SETTINGS_TOGGLE_CONTRASTMODE: 
            return { ...state, contrastmode: !state.contrastmode };

        default:
            return state;
    }
}