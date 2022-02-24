///////////////////////////////////////////
//// CHANGABLE -> YOU CAN CHANGE THIS ////
///////////////////////////////////////////
//---------------------------------------------------------------------------------------------


//## Your Google Project Client Id
//## Look likes : 2505655402022-1n1g0qs5ehaas67g12n6lt6q57ash745.apps.googleusercontent.com
const CLIENT_ID = "PUT YOU CLIENT ID HERE";
//## Your Google Project Client Secret Code
//## Look likes : GOCXDF-_GIPlMSdviuwL02mB-tnHGybh123
const CLIENT_SECRET = "PUT YOUR SECRETE CODE HERE";
//## Your redirect (server) url. 
//## If google oauth success then redirect to this URL
const REDIRECT_URI = "http://localhost:3000/";
// Here you can select fields of data to get in json format.
const GET_FIELDS = "names,emailAddresses,phoneNumbers";


module.exports = {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    GET_FIELDS,
}