import store from "../store";

// Get
export const getApiExample = async (url, reduxSuccessType = "", reduxFailType = "", reduxLoadingType = "") =>
{
    store.dispatch({ type: reduxLoadingType });
    let data = [];

    console.log("getApiExample for table \"" + url + "\"");

    fetch(url)
        .then(response => response.json())
        .then(data =>
        {
            console.log("getApiExample for \"" + url + "\" result: ");
            console.log(data);

            store.dispatch({ type: reduxSuccessType, payload: data });
        })
        .catch((err) =>
        {
            console.error("getApiExample error: " + err);
            store.dispatch({ type: reduxFailType });
        });

    return data;
}