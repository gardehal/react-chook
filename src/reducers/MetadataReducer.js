import { 
    METADATA_LOADING, METADATA_LOADING_COMPLETE, GET_METADATA_DATA_SUCCESS, GET_METADATA_DATA_FAIL 
} from "../actions/types";

import { DB_FETCH_FAILED } from "../resources/language";

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

        case GET_METADATA_DATA_SUCCESS:
            return { ...state, metadataLoading: false, metadataError: "", metadataResult: action.payload };
        case GET_METADATA_DATA_FAIL:
            return { ...state, metadataLoading: false, metadataError: DB_FETCH_FAILED };
            
        default:
            return state;
    }
}