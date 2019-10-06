import { getDatabaseData } from "./Shared";

import { GET_METADATA_DATA_SUCCESS, GET_METADATA_DATA_FAIL } from "./types";

// Get
export const getMetadataData = async (tableName, orderByChild = "", equalTo = "", limit = 0) =>
{
    let res = getDatabaseData(tableName, GET_METADATA_DATA_SUCCESS, GET_METADATA_DATA_FAIL, orderByChild, equalTo, limit);
    return res;
}