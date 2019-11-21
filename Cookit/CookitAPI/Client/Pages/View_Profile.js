//*******************************************************************************************
// GLOBAL VARAIBLES
//*******************************************************************************************
//var PROFILES = null;
//var COUNT_PROFILE = 1;

var ARRY_CITY = null;
var ARRY_REGION = null;

var PROFILE_VIEW = 14;//בהתחלה שווה לצז פרופיל לתצוגה ןאחר כך מכניס לתוכו את כל המידע של הפרופיל

var LOGIN_USER = JSON.parse(sessionStorage.getItem("Login_User"));

//*******************************************************************************************
// PAGE LOAD
//*******************************************************************************************
$(document).ready(function () {
    GetCity();
   
});
//*******************************************************************************************
// GET CITY
//*******************************************************************************************
function GetCity()
//הפונקציה מביאה את רשימת הערים ממסד הנתונים
{
    if (ARRY_CITY == null)
    // כדי לקורא רק פעם אחת
    {
        GlobalAjax("/api/City/GetAllCities", "GET", "", SuccessCity, FailCity);
    }
}

function SuccessCity(arry_city) {
    sessionStorage.setItem("ARRY_CITY", JSON.stringify(arry_city));
    ARRY_CITY = arry_city;

    GetRegion();
}

function FailCity() {
    console.log("שגיאה במשיכת נתוני הערים מהשרת.");
    alert('שגיאה במשיכת נתוני הערים מהשרת.');
}
//*******************************************************************************************
// GET REGION
//*******************************************************************************************
function GetRegion() {
    if (ARRY_REGION == null) {
        GlobalAjax("/api/Region/GetAllRegion", "GET", "", SuccessGetRegion, FailGetRegion);
    }
}

function SuccessGetRegion(arry_region) {
    sessionStorage.setItem("ARRY_REGION", JSON.stringify(arry_region));
    ARRY_REGION = arry_region;

    GetProfileInformation();

}

function FailGetRegion() {
    console.log("שגיאה במשיכת נתוני מחוזות מהשרת.");
    alert('שגיאה במשיכת נתוני מחוזות מהשרת.');
}
//*******************************************************************************************
// GetProfileByProfileId
//*******************************************************************************************
function GetProfileInformation() {
    GlobalAjax("/api/Profile/GetProfileByProfileId/" + PROFILE_VIEW, "GET", "", SuccessGetAllProfiles, FailGetAllProfiles);
}

function SuccessGetAllProfiles(data) {
    PROFILE_VIEW = data;
    sessionStorage.setItem("PROFILE_VIEW", JSON.stringify(data));
    //show the profiles dinamicaly
    ShowProfileInformation();
}

function FailGetAllProfiles() {
    console.log("שגיאה במשיגת נתוני פרופיל!");
    alert("שגיאה במשיגת נתוני פרופיל!"); 
}
//*******************************************************************************************
// ShowProfileInformation
//*******************************************************************************************
function ShowProfileInformation() {
    //שם
    document.getElementById("profile_name").innerHTML = PROFILE_VIEW.name;
    //תיאור
    document.getElementById("profile_description").innerHTML = PROFILE_VIEW.description;
    //עיר
    console.log(ConvertId2Value(ARRY_CITY, PROFILE_VIEW.id_city));
    document.getElementById("profile_city").innerHTML = ConvertId2Value(ARRY_CITY, PROFILE_VIEW.id_city);


}

//*******************************************************************************************
// CONVERT ID 2 VALUE
//*******************************************************************************************
function ConvertId2Value(_list, _id)
//ממיר את התז של המידע לערכי מחרוזת
{
    for (var x in _list) {
        var values = Object.values(_list[x]);
        var id = values[0];//id
        var val = values[1]; // value
        if (id == _id)
            return val;
    }
    return null;
}