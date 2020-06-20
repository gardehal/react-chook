import { 
    USER_LOADING, USER_LOADING_COMPLETE, USER_ERROR, USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL, USER_PERMISSION_DENIED, USER_LOGIN_FAIL_EMAIL, USER_LOGIN_FAIL_PASSWORD, USER_LOGIN_FAIL_REQUESTS,
} from "../actions/types";

import { ERROR_INVALID_USERNAME_PASSWORD, ERROR_INVALID_EMAIL, ERROR_TOO_MANY_REQUESTS, UNKNOWN_ERROR, ERROR_PERMISSION_DENIED } from "../resources/language";

const INITIAL_STATE = 
{ 
    userError: null, 
    userLoading: false,
    user: null,
};

export default (state = INITIAL_STATE, action) =>
{
    // console.log(action);
    
    switch(action.type)
    {
        case USER_LOADING:
            return { ...state, userLoading: true, userError: null };
        case USER_LOADING_COMPLETE:
            return { ...state, userLoading: false, userError: null };
        case USER_ERROR:
            return { ...state, userLoading: false, userError: action.payload };

        case USER_LOGIN_SUCCESS:
            return { ...state, userLoading: false, userError: null, user: action.payload };
        case USER_LOGIN_FAIL:
            return { ...state, userLoading: false, userError: ERROR_INVALID_USERNAME_PASSWORD };
        case USER_LOGIN_FAIL_EMAIL:
            return { ...state, userLoading: false, userError: ERROR_INVALID_EMAIL };
        case USER_LOGIN_FAIL_PASSWORD:
            return { ...state, userLoading: false, userError: ERROR_INVALID_USERNAME_PASSWORD };
        case USER_LOGIN_FAIL_REQUESTS:
            return { ...state, userLoading: false, userError: ERROR_TOO_MANY_REQUESTS };

        case USER_LOGOUT_SUCCESS:
            return { ...state, userLoading: false, userError: null, user: null };
        case USER_LOGOUT_FAIL:
            return { ...state, userLoading: false, userError: UNKNOWN_ERROR };

        case USER_PERMISSION_DENIED:
            return { ...state, userLoading: false, userError: ERROR_PERMISSION_DENIED };
            
        default:
            return state;
    }
}