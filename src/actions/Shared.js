import firebase from "firebase";
import store from "../store";

// Get
export const getDatabaseData = async (tableName, reduxSuccessType, reduxFailType, orderByChild = "", equalTo = "", limit = 0) =>
{
    // return dispatch => 
    {
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
                store.dispatch({ type: reduxSuccessType, payload: data });
            })
            .catch((err) =>
            {
                console.error("getDatabaseData error: " + err);
                store.dispatch({ type: reduxFailType });
            });
    };
}