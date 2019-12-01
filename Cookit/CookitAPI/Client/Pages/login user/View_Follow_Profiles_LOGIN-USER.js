//*******************************************************************************************
// GLOBAL VARAIBLES
//*******************************************************************************************
var FOLLOWS_PROFILES = null;
var FOLLOWS_PROFILES_DISPLAY = new Array();
var COUNT_PROFILE = 1;
var COUNT_NAME_PROFILE = 1;

var ARRY_CITY = null;
var ARRY_REGION = null;

var LOGIN_USER = JSON.parse(sessionStorage.getItem("Login_User"));
//var PROFILE_FOLLOW_BY_LOGIN_USER = null;
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
{
    if (ARRY_CITY == null) {
        GlobalAjax("/api/City/GetAllCities", "GET", "", SuccessCity, FailCity);
    }
}

function SuccessCity(arry_city) {
    sessionStorage.setItem("ARRY_CITY", JSON.stringify(arry_city));
    ARRY_CITY = arry_city;
    //ShowCity(ARRY_CITY);

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
    //ShowRegion(ARRY_REGION);

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
    GlobalAjax("/api/Profile/GetFollowsProfilesByUserId/" + LOGIN_USER.id, "GET", "", SuccessGetProfileFollowByUser, FailGetProfileFollowByUser);
}

function SuccessGetProfileFollowByUser(data) {
    FOLLOWS_PROFILES = data;
    sessionStorage.setItem("FOLLOWS_PROFILES", JSON.stringify(FOLLOWS_PROFILES));
    if (data.length == 0) {
        console.log(" אין פרופילים נעקבים!.");
        document.getElementById("follows_profiles").innerHTML = "אין פרופילים נעקבים.";
    }
    else {
        for (var i = 0; i < FOLLOWS_PROFILES.length; i++) {
            FOLLOWS_PROFILES_DISPLAY.push({
                id: FOLLOWS_PROFILES[i].id,
                user_id: FOLLOWS_PROFILES[i].user_id,
                type: FOLLOWS_PROFILES[i].type,
                name: FOLLOWS_PROFILES[i].name,
                description: FOLLOWS_PROFILES[i].description,
                id_city: FOLLOWS_PROFILES[i].id_city,
                id_region: FOLLOWS_PROFILES[i].id_region,
                status: FOLLOWS_PROFILES[i].status,
                count_follow: 0
            });
        }
        ShowProfiles();
    }
}
function FailGetProfileFollowByUser() {
    console.log(" שגיאה במשיכת פרופילים מהשרת !.");
    alert(" שגיאה במשיכת פרופילים מהשרת !.");
}
//*******************************************************************************************
// Show Profiles
//*******************************************************************************************
function ShowProfiles() {
    COUNT_NAME_PROFILE = 1;
    for (var i = 0; i < FOLLOWS_PROFILES_DISPLAY.length; i++) {
        GetProfileCountFollows(FOLLOWS_PROFILES_DISPLAY[i]);
        //AddProfile(PROFILE_VIEW_DISPLAY[i]);
    }
}
function AddProfile(_profile) {
    //div
    var div = document.createElement('div');
    div.className = "col-md-4 ";
    //div
    var prof_div = document.createElement('div');
    prof_div.id = _profile.id;
    prof_div.className = "card profile-card-3  ";
    prof_div.style["backgroundColor"] = "white";
    prof_div.style["padding"] = "10px";
    prof_div.setAttribute("data-toggle", "tooltip");
    prof_div.setAttribute("title", "הקלק על התמונה כדי לצפות בפרופיל!");
    //profile img div
    var prof_img_div = document.createElement("div");
    prof_img_div.className = "profile-thumb-block ";
    //Profile img
    var prof_img = document.createElement("img");
    prof_img.id = "img_profile_" + _profile.id;
    prof_img.className = "profile shrink";
    prof_img.alt = " תמונת פרופיל " + _profile.name;
    prof_img.src = "/Client/Images/Profiles_pic//profile.jpg";
    prof_img.style["width"] = "30%";
    prof_img.style["height"] = "30%";
    prof_img.style["border-radius"] = "50%";
    prof_img.style["marginTop"] = "20px";
    prof_img.setAttribute("onClick", "ShowProfileData(this.id)");
    prof_img_div.appendChild(prof_img);
    prof_div.appendChild(prof_img_div);
    //profile name div
    var prof_name_div = document.createElement("div");
    prof_name_div.className = "card-content";
    //profile name
    var prof_name = document.createElement("h2");
    prof_name.innerHTML = _profile.name;
    prof_name_div.appendChild(prof_name);
    prof_div.appendChild(prof_name_div);
    //Profile description 
    var prof_description = document.createElement("span");
    prof_description.innerHTML = _profile.description;
    prof_description.style["display"] = "block";
    prof_name_div.appendChild(prof_description);
    //profile city and region
    var prof_city = document.createElement("span");
    prof_city.innerHTML = ConvertId2Value(ARRY_CITY, _profile.id_city);
    prof_city.style["display"] = "block";
    prof_name_div.appendChild(prof_city);
    //profile 
    //FOLLOW BUTTON
    var div_function = document.createElement("div");
    div_function.className = "row";
    var div_count_follow = document.createElement("div");
    div_count_follow.className = "col";
    var sapn_count_follow = document.createElement("span");
    sapn_count_follow.id = "follow_count_" + _profile.id;
    sapn_count_follow.innerHTML = "עוקבים " + _profile.count_follow;
    var div_btn_follow = document.createElement("div");
    div_btn_follow.className = "col";
    var prof_follow_btn = document.createElement("input");
    prof_follow_btn.type = "button";
    prof_follow_btn.id = "btn_follow_" + _profile.id;
    div_function.appendChild(div_count_follow);
    div_function.appendChild(div_btn_follow);
    div_count_follow.appendChild(sapn_count_follow);
    div_btn_follow.appendChild(prof_follow_btn);
    //if (IfFollowThisProfile(_profile.id))//אם פרופיל זה במעקב
    //{
        prof_follow_btn.value = "הסר מעקב";//סטאטוס מעקב
        prof_follow_btn.setAttribute("onClick", "RemoveFollowProfile_Btn(this.id)");
    //}
    //else {//לא במעקב
    //    prof_follow_btn.value = "עקוב";//סטאטוס מעקב
    //    prof_follow_btn.setAttribute("onClick", "AddFollowProfile_Btn(this.id)");
    //}
    prof_follow_btn.className = "btn btn-group";
    prof_name_div.appendChild(div_function);

    prof_div.appendChild(prof_name_div);
    //הוספת השלב לתצוגה
    div.appendChild(prof_div);
    if (COUNT_NAME_PROFILE % 3 == 1) {
        //create new row
        var row = document.createElement("div");
        row.className = "row";
        row.id = "row_" + Math.ceil(COUNT_NAME_PROFILE / 3); // עיגול למעלה

        row.appendChild(div);
        document.getElementById("follows_profiles").appendChild(row);
    }
    else {
        console.log(Math.ceil(COUNT_NAME_PROFILE / 3));
        document.getElementById("row_" + Math.ceil(COUNT_NAME_PROFILE / 3)).appendChild(div);
    }
    console.log("profile " + COUNT_NAME_PROFILE);
    COUNT_NAME_PROFILE += 1;
}
//*******************************************************************************************
// GetProfileCountFollows
//*******************************************************************************************
function GetProfileCountFollows(current_profile) {
    GlobalAjax("/api/Followers/GetProfileFollowByProfileId/" + current_profile.id, "GET", "",
        function (data) {
            current_profile.count_follow = data.length;
            AddProfile(current_profile);
        }
        , FailGetProfileCountFollows);
}

function FailGetProfileCountFollows() {
    console.log("שגיאה לא מצליח להביא את המשתמשים העוקבים של הפרופיל");
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
/*
function IfFollowThisProfile(_id_profile)
// אם הפרופיל נמצא ברשימת המערב של המשתמש  - מחזיר אמת. אחרת - מחזיר שקר.
{
    if (FOLLOWS_PROFILES_DISPLAY != null)//אם יש פרופילים במעקב
    {
        for (var i = 0; i < FOLLOWS_PROFILES_DISPLAY.length; i++) {
            if (FOLLOWS_PROFILES_DISPLAY[i].profile_id == _id_profile)
                return true;
        }
    }
    return false;
}
*/
//*******************************************************************************************
// AddFollowProfile_Btn
//*******************************************************************************************
/*
function AddFollowProfile_Btn(_id_btn)
//מוסיף מעקב אחרי הפרופיל
{
    var _id_profile = _id_btn.split("_")[2];
    var new_follow = {
        user_id: LOGIN_USER.id,
        profile_id: _id_profile
    };
    FOLLOWS_PROFILES.push(new_follow);
    FOLLOWS_PROFILES_DISPLAY.push(new_follow);
    sessionStorage.setItem("FOLLOWS_PROFILES", JSON.stringify(FOLLOWS_PROFILES));
    GlobalAjax("/api/Followers/AddNewFollow/", "POST", new_follow, SuccessAddNewFollow, FailAddNewFollow);
}

function SuccessAddNewFollow(_id_profile) {
    console.log("הפרופיל נוסף למעקב בהצלחה!.");
    //שינוי כפתור המעקב
    var btn_profile = document.getElementById("btn_follow_" + _id_profile);
    btn_profile.value = "הסר מעקב";//סטאטוס מעקב
    btn_profile.setAttribute("onClick", "RemoveFollowProfile_Btn(this.id)");
    var current_profile;
    for (var i = 0; i < PROFILE_VIEW_DISPLAY.length; i++) {
        if (PROFILE_VIEW_DISPLAY[i].id == _id_profile)
            current_profile = PROFILE_VIEW_DISPLAY[i];
    }
    current_profile.count_follow++;
    document.getElementById("follow_count_" + _id_profile).innerHTML = "";
    document.getElementById("follow_count_" + _id_profile).innerHTML = "עוקבים " + current_profile.count_follow;

    alert("הפרופיל נוסף למעקב בהצלחה!.");
}

function FailAddNewFollow() {
    console.log("שגיאה!. אי אפשר להוסיף מעקב אחרי הפרופיל כעת.");
    alert("שגיאה!. אי אפשר להוסיף מעקב אחרי הפרופיל כעת.");
}
*/
//*******************************************************************************************
// RemoveFollowProfile_Btn
//*******************************************************************************************
function RemoveFollowProfile_Btn(_id_btn)
//מסיר מעקב אחרי הפרופיל
{
    var _id_profile = _id_btn.split("_")[2];
    var _follow = {
        user_id: LOGIN_USER.id,
        profile_id: _id_profile
    };
    var index = FOLLOWS_PROFILES_DISPLAY.indexOf(_follow);
    FOLLOWS_PROFILES_DISPLAY.splice(index, 1);
    FOLLOWS_PROFILES.splice(index, 1);
    sessionStorage.setItem("FOLLOWS_PROFILES", JSON.stringify(FOLLOWS_PROFILES));
    GlobalAjax("/api/Followers/RemoveFollow/", "DELETE", _follow, SuccessRemoveFollow, FailRemoveFollow);
}


function SuccessRemoveFollow(_id_profile) {
    console.log("הפרופיל הוסר ממעקב בהצלחה!.");
    document.getElementById("follows_profiles").innerHTML = "";
    if (FOLLOWS_PROFILES_DISPLAY.length == 0)
        document.getElementById("follows_profiles").innerHTML = " אין פרופילים נעקבים!.";
    else {
        COUNT_NAME_PROFILE = 1;
        for (var i = 0; i < FOLLOWS_PROFILES_DISPLAY.length; i++) {
            AddProfile(FOLLOWS_PROFILES_DISPLAY[i]);
        }
    }
    /*
        //שינוי כפתור המעקב
var btn_profile = document.getElementById("btn_follow_" + _id_profile);
    btn_profile.value = "עקוב";//סטאטוס מעקב
    btn_profile.setAttribute("onClick", "AddFollowProfile_Btn(this.id)");
    var current_profile;
    for (var i = 0; i < PROFILE_VIEW_DISPLAY.length; i++) {
        if (PROFILE_VIEW_DISPLAY[i].id == _id_profile)
            current_profile = PROFILE_VIEW_DISPLAY[i];
    }
    current_profile.count_follow--;
    document.getElementById("follow_count_" + _id_profile).innerHTML = "";
    document.getElementById("follow_count_" + _id_profile).innerHTML = "עוקבים " + current_profile.count_follow;
    */
    alert("הפרופיל הוסר ממעקב בהצלחה!.");
}

function FailRemoveFollow() {
    console.log("שגיאה!. אי אפשר להסיר מעקב אחרי הפרופיל כעת.");
    alert("שגיאה!. אי אפשר להסיר מעקב אחרי הפרופיל כעת.");
}
//*******************************************************************************************
// ShowProfileData
//*******************************************************************************************
function ShowProfileData(_id_profile)
//מעביר את המשתמש לדף של פרטי הפורפיל בלבד
{
    var ID_PROFILE_VIEW = _id_profile.split("_")[2];//id
    sessionStorage.setItem("ID_PROFILE_VIEW", JSON.stringify(ID_PROFILE_VIEW));
    window.location.replace("View_Profile_LOGIN-USER.html");
}

