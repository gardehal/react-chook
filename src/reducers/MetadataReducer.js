import { 
    METADATA_LOADING, METADATA_LOADING_COMPLETE, GET_METADATA_DATA_SUCCESS, GET_METADATA_DATA_FAIL, SET_METADATA_DATA_SUCCESS, SET_METADATA_DATA_FAIL, 
    METADATA_ERROR, METADATA_ERROR_RESOLVED, METADATA_TEST_ERROR 
} from "../actions/types";

import { DB_FETCH_FAILED, DB_SET_FAILED, UNKNOWN_ERROR, TEST_ERROR } from "../resources/language";

const INITIAL_STATE = 
{ 
    metadataError: "", 
    metadataLoading: false,
    metadataResult: {},
};

export default (state = INITIAL_STATE, action) =>
{
    // console.log(action);
    
    switch(action.type)
    {
        case METADATA_LOADING:
            return { ...state, metadataLoading: true, metadataError: "" };
        case METADATA_LOADING_COMPLETE:
            return { ...state, metadataLoading: false, metadataError: "" };
        case METADATA_ERROR:
            return { ...state, metadataLoading: false, metadataError: UNKNOWN_ERROR };
        case METADATA_TEST_ERROR:
            return { ...state, metadataLoading: false, metadataError: TEST_ERROR };
        case METADATA_ERROR_RESOLVED:
            return { ...state, metadataLoading: false, metadataError: "" };

        case GET_METADATA_DATA_SUCCESS:
            return { ...state, metadataLoading: false, metadataError: "", metadataResult: action.payload };
        case GET_METADATA_DATA_FAIL:
            return { ...state, metadataLoading: false, metadataError: DB_FETCH_FAILED };

        case SET_METADATA_DATA_SUCCESS:
            return { ...state, metadataLoading: false, metadataError: "" };
        case SET_METADATA_DATA_FAIL:
            return { ...state, metadataLoading: false, metadataError: DB_SET_FAILED };
            
        default:
            return state;
    }
}