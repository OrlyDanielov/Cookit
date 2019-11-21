//*******************************************************************************************
// GLOBAL VARAIBLES
//*******************************************************************************************
var PROFILES = null;
var COUNT_PROFILE = 1;

var ARRY_CITY = null;
var ARRY_REGION = null;

var LOGIN_USER = JSON.parse(sessionStorage.getItem("Login_User"));
var PROFILE_FOLLOW_BY_LOGIN_USER = null;// new Array();

//*******************************************************************************************
// PAGE LOAD
//*******************************************************************************************
$(document).ready(function () {
    GetCity();
   //tooltip
    //$('[data-toggle="tooltip"]').tooltip();
});
//*******************************************************************************************
// GET CITY
//*******************************************************************************************
function GetCity()
//הפונקציה מביאה את רשימת הערים ממסד הנתונים
{
    if (ARRY_CITY == null)
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
    //else if (PROFILE_FOLLOW_BY_LOGIN_USER.length == 0) {
    //    GlobalAjax("/api/Followers/GetProfileFollowByUser/" + LOGIN_USER.id, "GET", "", SuccessGetProfileFollowByUser, FailGetProfileFollowByUser);
    //}
}

function SuccessGetProfileFollowByUser(data) {
    sessionStorage.setItem("PROFILE_FOLLOW_BY_LOGIN_USER", JSON.stringify(data));
    PROFILE_FOLLOW_BY_LOGIN_USER = data;

    GetAllProfiles();
}

function FailGetProfileFollowByUser() {
    console.log(" אין פרופילים נעקבים!.");
    //alert(" אין פרופילים פעילים!.");
}
//*******************************************************************************************
// GetAllProfiles
//*******************************************************************************************
function GetAllProfiles() {
    GlobalAjax("/api/Profile/GetAllActiveProfiles", "GET", "", SuccessGetAllProfiles, FailGetAllProfiles);
}

function SuccessGetAllProfiles(data) {
    PROFILES = data;
    sessionStorage.setItem("PROFILES", JSON.stringify(data));
    //show the profiles dinamicaly
    ShowProfiles();
}

function FailGetAllProfiles() {
    console.log(" אין פרופילים פעילים!.");
    alert(" אין פרופילים פעילים!.");

    var alert2user = document.createElement('div');
    alert2user.style["textAlign"] = "center";
    alert2user.style["verticalAlign"] = "middle";
    alert2user.innerHTML = "אין פרופילים!";  
    document.getElementById("profiles_form").appendChild(alert2user);
}
//*******************************************************************************************
// Show Profiles
//*******************************************************************************************
function ShowProfiles() {
    for (var i = 0; i < PROFILES.length; i++) {
        AddProfile(PROFILES[i],i+1);
    }
}
function AddProfile(_profile, _index) {
    //div
    var div = document.createElement('div');
    div.className = "col-md-4 ";
    //toltip
    /*
    var toltip_span = document.createElement('span');
    toltip_span.className = "tooltiptext";
    toltip_span.innerHTML = "הקלק על הפרופיל כדי לצפות בו!";
    div.appendChild(toltip_span);
    */
    //div
    var prof_div = document.createElement('div');
    prof_div.id = _profile.id;
    prof_div.className = "card profile-card-3  ";
    prof_div.style["backgroundColor"] = "white";
    prof_div.style["padding"] = "10px";
    prof_div.setAttribute("onClick", "ShowProfileData(this.id)");
    prof_div.setAttribute("data-toggle", "tooltip");
    prof_div.setAttribute("title", "הקלק כדי לצפות בפרופיל!");
    //profile img div
    var prof_img_div = document.createElement("div");
    prof_img_div.className = "profile-thumb-block ";
    //Profile img
    var prof_img = document.createElement("img");
    prof_img.className = "profile ";
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
    //prof_city.innerHTML = ConvertId2Value(ARRY_REGION, _profile.id_region);
    //prof_city.innerHTML += " " + ConvertId2Value(ARRY_CITY, _profile.id_city);
    prof_city.innerHTML =ConvertId2Value(ARRY_CITY, _profile.id_city);
    prof_city.style["display"] = "block";
    prof_name_div.appendChild(prof_city);
    //profile 
    //status BUTTON
    var prof_follow_btn = document.createElement("input");
    prof_follow_btn.type = "button";
    prof_follow_btn.id ="btn_follow_"+ _profile.id;
    if (IfFollowThisProfile(_profile.id))//אם פרופיל זה במעקב
    {
        prof_follow_btn.value = "הסר מעקב";//סטאטוס מעקב
        prof_follow_btn.setAttribute("onClick", "RemoveFollowProfile_Btn(this.id)");
    }
    else {//לא במעקב
        prof_follow_btn.value = "עקוב";//סטאטוס מעקב
        prof_follow_btn.setAttribute("onClick", "AddFollowProfile_Btn(this.id)");
    }
    prof_follow_btn.className = "btn btn-group";
    prof_name_div.appendChild(prof_follow_btn);

    prof_div.appendChild(prof_name_div);
//הוספת השלב לתצוגה
    div.appendChild(prof_div);
    if (_index % 3 == 1) {
        //create new row
        var row = document.createElement("div");
        row.className = "row";
        row.id = "row_" + Math.ceil(_index / 3); // עיגול למעלה

        row.appendChild(div);
        document.getElementById("profiles_form").appendChild(row);
    }
    else {
        console.log(Math.ceil(_index / 3));
        document.getElementById("row_" + Math.ceil(_index / 3)).appendChild(div);
    }
    console.log("profile " + COUNT_PROFILE);
    COUNT_PROFILE += 1;
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
    if (PROFILE_FOLLOW_BY_LOGIN_USER != null )//אם יש פרופילים במעקב
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
function AddFollowProfile_Btn(_id_btn)
//מוסיף מעקב אחרי הפרופיל
{
    var _id_profile = _id_btn.split("_")[2];
    var new_follow = {
        user_id: LOGIN_USER.id,
        profile_id: _id_profile
    };
    PROFILE_FOLLOW_BY_LOGIN_USER.push(new_follow);
    sessionStorage.setItem("PROFILE_FOLLOW_BY_LOGIN_USER", JSON.stringify(PROFILE_FOLLOW_BY_LOGIN_USER));
    GlobalAjax("/api/Followers/AddNewFollow/", "POST", new_follow, SuccessAddNewFollow, FailAddNewFollow);
}

function SuccessAddNewFollow(_id_profile) {
    console.log("הפרופיל נוסף למעקב בהצלחה!.");
    //שינוי כפתור המעקב
    var btn_profile = document.getElementById("btn_follow_" + _id_profile);
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
function RemoveFollowProfile_Btn(_id_btn)
//מסיר מעקב אחרי הפרופיל
{
    var _id_profile = _id_btn.split("_")[2];
    var _follow = {
        user_id: LOGIN_USER.id,
        profile_id: _id_profile
    };
    var index = PROFILE_FOLLOW_BY_LOGIN_USER.indexOf(_follow);
    PROFILE_FOLLOW_BY_LOGIN_USER.splice(index, 1);
    sessionStorage.setItem("PROFILE_FOLLOW_BY_LOGIN_USER", JSON.stringify(PROFILE_FOLLOW_BY_LOGIN_USER));
    GlobalAjax("/api/Followers/RemoveFollow/", "DELETE", _follow, SuccessRemoveFollow, FailRemoveFollow);
}


function SuccessRemoveFollow(_id_profile) {
    console.log("הפרופיל הוסר ממעקב בהצלחה!.");
    //שינוי כפתור המעקב
    var btn_profile = document.getElementById("btn_follow_" + _id_profile);
    btn_profile.value = "עקוב";//סטאטוס מעקב
    btn_profile.setAttribute("onClick", "AddFollowProfile_Btn(this.id)");
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
    var ID_PROFILE_VIEW = _id_profile;
    sessionStorage.setItem("ID_PROFILE_VIEW", JSON.stringify(ID_PROFILE_VIEW));
    window.location.replace("View_Profile.html");

}