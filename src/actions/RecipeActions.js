import { GET_DATABASE_DATA_SUCCESS, GET_DATABASE_DATA_FAIL } from "./types";

// Fetch
// TODO add dispatches
export const getDatabaseData = (tableName, orderByChild = "", equalTo = "", limit = 0) =>
{
    return dispatch => {
        let data = [];
        let ref = firebase.database().ref("/" + tableName + "/");

        if(orderByChild)
            ref = ref.orderByChild(orderByChild);
        if(equalTo)
            ref = ref.equalTo(equalTo);
        if(limit > 1)
            ref = ref.limitToFirst(limit);

        console.log("getDatabaseData for table \"" + tableName + "\"" 
            + (orderByChild ? ", orderByChild: \"" + orderByChild + "\"" : "") 
            + (equalTo ? ", equalTo: \"" + equalTo + "\"" : "")
            + (limit ? ", limit: \"" + limit + "\"" : ""));

        await ref
            .once("value", snapshot =>
            {
                if(snapshot.val())
                    data = Object.values(snapshot.val());

                console.log("getDatabaseData result: ");
                console.log(data);
    
                  dispatch({ type: GET_DATABASE_DATA_SUCCESS, payload: data });
            })
            .catch((err) =>
            {
                console.error("getDatabaseData error: " + err);
                  dispatch({ type: GET_DATABASE_DATA_FAIL });
            });
    };
}