import { getDatabaseData } from "./Shared";

import { GET_METADATA_DATA_SUCCESS, GET_METADATA_DATA_FAIL, METADATA_LOADING } from "./types";

// Get
export const getMetadataData = async (tableName, orderByChild = "", equalTo = "", limit = 0) =>
{
    let res = getDatabaseData(tableName, GET_METADATA_DATA_SUCCESS, GET_METADATA_DATA_FAIL, METADATA_LOADING, orderByChild, equalTo, limit);
    return res;
}