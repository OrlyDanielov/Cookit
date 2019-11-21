//*******************************************************************************************
// GLOBAL VARAIBLES
//*******************************************************************************************
//var PROFILES = null;
//var COUNT_PROFILE = 1;

var ARRY_CITY = null;
var ARRY_REGION = null;

var ID_PROFILE_VIEW = JSON.parse(sessionStorage.getItem("ID_PROFILE_VIEW"));//בהתחלה שווה לצז פרופיל לתצוגה ןאחר כך מכניס לתוכו את כל המידע של הפרופיל
var PROFILE_VIEW = null;
var PROFILE_FOLLOW_BY_LOGIN_USER = JSON.parse(sessionStorage.getItem("PROFILE_FOLLOW_BY_LOGIN_USER"));//null;

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
    else
        GetRegion();
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
    else
        GetProfileFollowByUser();
}

function SuccessGetRegion(arry_region) {
    sessionStorage.setItem("ARRY_REGION", JSON.stringify(arry_region));
    ARRY_REGION = arry_region;

    GetProfileFollowByUser();
}

function FailGetRegion() {
    console.log("שגיאה במשיכת נתוני מחוזות מהשרת.");
    alert('שגיאה במשיכת נתוני מחוזות מהשרת.');
}

//*******************************************************************************************
// GetProfileFollowByUser
//*******************************************************************************************
function GetProfileFollowByUser()
//מביא את רשימת הפרופילים במשתמש עוקב אחריהם
{
    if (PROFILE_FOLLOW_BY_LOGIN_USER == null) {
        GlobalAjax("/api/Followers/GetProfileFollowByUser/" + LOGIN_USER.id, "GET", "", SuccessGetProfileFollowByUser, FailGetProfileFollowByUser);
    }
    else if (PROFILE_FOLLOW_BY_LOGIN_USER.length == 0) {
        GlobalAjax("/api/Followers/GetProfileFollowByUser/" + LOGIN_USER.id, "GET", "", SuccessGetProfileFollowByUser, FailGetProfileFollowByUser);
    }
    else {
        GetProfileInformation();
    }
}

function SuccessGetProfileFollowByUser(data) {
    sessionStorage.setItem("PROFILE_FOLLOW_BY_LOGIN_USER", JSON.stringify(data));
    PROFILE_FOLLOW_BY_LOGIN_USER = data;

    GetProfileInformation();
}

function FailGetProfileFollowByUser() {
    console.log(" אין פרופילים נעקבים!.");
    //alert(" אין פרופילים פעילים!.");
}
//*******************************************************************************************
// GetProfileByProfileId
//*******************************************************************************************
function GetProfileInformation() {
    if (ID_PROFILE_VIEW == null)
        console.log("שגיאה במשיגת נתוני פרופיל!");
    else
        GlobalAjax("/api/Profile/GetProfileByProfileId/" + ID_PROFILE_VIEW, "GET", "", SuccessGetAllProfiles, FailGetAllProfiles);
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
    //כפתור מעקב
    var btn = document.getElementById("btn_follow");
    if (IfFollowThisProfile(PROFILE_VIEW.id))//אם פרופיל זה במעקב
    {
        btn.value = "הסר מעקב";//סטאטוס מעקב
        btn.setAttribute("onClick", "RemoveFollowProfile_Btn(this.id)");
    }
    else {//לא במעקב
        btn.value = "עקוב";//סטאטוס מעקב
        btn.setAttribute("onClick", "AddFollowProfile_Btn(this.id)");
    }

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


//*******************************************************************************************
// If Follow This Profile
//*******************************************************************************************
function IfFollowThisProfile(_id_profile)
// אם הפרופיל נמצא ברשימת המערב של המשתמש  - מחזיר אמת. אחרת - מחזיר שקר.
{
    if (PROFILE_FOLLOW_BY_LOGIN_USER != null)//אם יש פרופילים במעקב
    {
        for (var i = 0; i < PROFILE_FOLLOW_BY_LOGIN_USER.length; i++) {
            if (PROFILE_FOLLOW_BY_LOGIN_USER[i].profile_id == _id_profile)
                return true;
        }
    }
    return false;
}
//*******************************************************************************************
// AddFollowProfile_Btn
//*******************************************************************************************
function AddFollowProfile_Btn()
//מוסיף מעקב אחרי הפרופיל
{
    //var _id_profile = _id_btn.split("_")[2];
    var new_follow = {
        user_id: LOGIN_USER.id,
        profile_id: PROFILE_VIEW.id
    };
    PROFILE_FOLLOW_BY_LOGIN_USER.push(new_follow);
    sessionStorage.setItem("PROFILE_FOLLOW_BY_LOGIN_USER", JSON.stringify(PROFILE_FOLLOW_BY_LOGIN_USER));
    GlobalAjax("/api/Followers/AddNewFollow/", "POST", new_follow, SuccessAddNewFollow, FailAddNewFollow);
}

function SuccessAddNewFollow() {
    console.log("הפרופיל נוסף למעקב בהצלחה!.");
    //שינוי כפתור המעקב
    var btn_profile = document.getElementById("btn_follow" );
    btn_profile.value = "הסר מעקב";//סטאטוס מעקב
    btn_profile.setAttribute("onClick", "RemoveFollowProfile_Btn(this.id)");
    alert("הפרופיל נוסף למעקב בהצלחה!.");
}

function FailAddNewFollow() {
    console.log("שגיאה!. אי אפשר להוסיף מעקב אחרי הפרופיל כעת.");
    alert("שגיאה!. אי אפשר להוסיף מעקב אחרי הפרופיל כעת.");
}
//*******************************************************************************************
// RemoveFollowProfile_Btn
//*******************************************************************************************
function RemoveFollowProfile_Btn()
//מסיר מעקב אחרי הפרופיל
{
    //var _id_profile = _id_btn.split("_")[2];
    var _follow = {
        user_id: LOGIN_USER.id,
        profile_id: PROFILE_VIEW.id
    };
    var index = PROFILE_FOLLOW_BY_LOGIN_USER.indexOf(_follow);
    PROFILE_FOLLOW_BY_LOGIN_USER.splice(index, 1);
    sessionStorage.setItem("PROFILE_FOLLOW_BY_LOGIN_USER", JSON.stringify(PROFILE_FOLLOW_BY_LOGIN_USER));
    GlobalAjax("/api/Followers/RemoveFollow/", "DELETE", _follow, SuccessRemoveFollow, FailRemoveFollow);
}


function SuccessRemoveFollow() {
    console.log("הפרופיל הוסר ממעקב בהצלחה!.");
    //שינוי כפתור המעקב
    var btn_profile = document.getElementById("btn_follow");
    btn_profile.value = "עקוב";//סטאטוס מעקב
    btn_profile.setAttribute("onClick", "AddFollowProfile_Btn(this.id)");
    alert("הפרופיל הוסר ממעקב בהצלחה!.");
}

function FailRemoveFollow() {
    console.log("שגיאה!. אי אפשר להסיר מעקב אחרי הפרופיל כעת.");
    alert("שגיאה!. אי אפשר להסיר מעקב אחרי הפרופיל כעת.");
}