import { 
    USER_LOADING, USER_LOADING_COMPLETE, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_PERMISSION_DENIED
} from "../actions/types";

import { ERROR_INVALID_USERNAME_PASSWORD, UNKNOWN_ERROR, ERROR_PERMISSION_DENIED } from "../resources/language";

const INITIAL_STATE = 
{ 
    userError: "", 
    userLoading: false,
    userResult: {},
    username,
    userId,
};

export default (state = INITIAL_STATE, action) =>
{
    // console.log(action);
    
    switch(action.type)
    {
        case USER_LOADING:
            return { ...state, userLoading: true, userError: "" };
        case USER_LOADING_COMPLETE:
            return { ...state, userLoading: false, userError: "" };
        case USER_ERROR:
            return { ...state, userLoading: false, userError: action.payload };

        case USER_LOGIN_SUCCESS:
            return { ...state, userLoading: false, userError: "", username: action.payload.username, userId: action.payload.id };
        case USER_LOGIN_FAIL:
            return { ...state, userLoading: false, userError: ERROR_INVALID_USERNAME_PASSWORD };

        case USER_PERMISSION_DENIED:
            return { ...state, userLoading: false, userError: ERROR_PERMISSION_DENIED };
            
        default:
            return state;
    }
}