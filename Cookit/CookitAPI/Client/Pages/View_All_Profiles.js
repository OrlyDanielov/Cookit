//*******************************************************************************************
// GLOBAL VARAIBLES
//*******************************************************************************************
var PROFILES = null;
var PROFILE_VIEW_DISPLAY = new Array();
var COUNT_PROFILE = 1;
var COUNT_NAME_PROFILE = 1;


var ARRY_CITY = null;
var ARRY_REGION = null;

var LOGIN_USER = JSON.parse(sessionStorage.getItem("Login_User"));
var PROFILE_FOLLOW_BY_LOGIN_USER = null;// new Array();

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
    {
        GlobalAjax("/api/City/GetAllCities", "GET", "", SuccessCity, FailCity);
    }
}

function SuccessCity(arry_city) {
    sessionStorage.setItem("ARRY_CITY", JSON.stringify(arry_city));
    ARRY_CITY = arry_city;
    ShowCity(ARRY_CITY);

    GetRegion();
    
}

function FailCity() {
    console.log("שגיאה במשיכת נתוני הערים מהשרת.");
    alert('שגיאה במשיכת נתוני הערים מהשרת.');
}
//*******************************************************************************************
// Show City in search bar
//*******************************************************************************************
function ShowCity(_list_city) {
    document.getElementById("search_city_option").innerHTML = ""; // ניקוי לפי דחיפה
    for (var i = 0; i < _list_city.length; i++) {
        AddCity(_list_city[i]);
    }
    document.getElementById("search_city_option").reload;
}
function AddCity(_city)
{
    //li
    var li = document.createElement('li');
    li.value = _city.id_city;
    li.innerHTML = _city.city_name;
    //input
    var input = document.createElement('input');
    input.type = "checkbox";
    input.value = _city.id_city;
    input.name = "city_option";

    li.appendChild(input);

    document.getElementById("search_city_option").appendChild(li);
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
    ShowRegion(ARRY_REGION);

    GetProfileFollowByUser();
}

function FailGetRegion() {
    console.log("שגיאה במשיכת נתוני מחוזות מהשרת.");
    alert('שגיאה במשיכת נתוני מחוזות מהשרת.');
}

//*******************************************************************************************
// Show Region in search bar
//*******************************************************************************************
function ShowRegion(_list_region) {
    document.getElementById("search_region_option").innerHTML = ""; // ניקוי לפי דחיפה
    for (var i = 0; i < _list_region.length; i++) {
        AddRegion(_list_region[i]);
    }
    document.getElementById("search_region_option").reload;
}
function AddRegion(_region) {
    //li
    var li = document.createElement('li');

    //input
    var input = document.createElement('input');
    input.type = "checkbox";
    input.value = _region.id;
    input.name = "region_option";

    li.value = _region.id;
    li.innerHTML = _region.region;
    li.appendChild(input);

    document.getElementById("search_region_option").appendChild(li);
}

//*******************************************************************************************
// ShowCityByRegion
//*******************************************************************************************
function ShowCityByRegion()
// מציג את הערים השייכות למחוז שנבחר
{
    //צומא את כל המחוזות שנבחרו
    var region = new Array();// = document.querySelectorAll("input[name='region_option']:checked").value;//, values = [];// $("input[name='region_option']:checked").val();
    var list_region = document.getElementsByName('region_option');
    for (var j = 0; j < list_region.length; j++) {
        if (list_region[j].checked == true)
            region.push(list_region[j].value);
    }
    //אם להציג את כל הערים
    if (region.length == 0)
        ShowCity(ARRY_CITY);
    else {
        //מציג את הערים של המחוזות שנבחרו
        var cities2region = new Array();
        for (var h = 0; h < region.length; h++) {
            for (var i = 0; i < ARRY_CITY.length; i++) {
                if (ARRY_CITY[i].id_region == region[h])
                    cities2region.push(ARRY_CITY[i]);
            }
        }
        ShowCity(cities2region);
    }
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
    for (var i = 0; i < PROFILES.length; i++) {
        PROFILE_VIEW_DISPLAY.push({
            id: PROFILES[i].id,
            user_id: PROFILES[i].user_id,
            type: PROFILES[i].type,
            name: PROFILES[i].name,
            description: PROFILES[i].description,
            id_city: PROFILES[i].id_city,
            id_region: PROFILES[i].id_region,
            status: PROFILES[i].status,
            count_follow: 0
        });
    }
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
    COUNT_NAME_PROFILE = 1;
    for (var i = 0; i < PROFILE_VIEW_DISPLAY.length; i++) {
        GetProfileCountFollows(PROFILE_VIEW_DISPLAY[i]);
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
    //prof_div.setAttribute("onClick", "ShowProfileData(this.id)");
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
    prof_city.innerHTML =ConvertId2Value(ARRY_CITY, _profile.id_city);
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
        document.getElementById("profiles_form").appendChild(row);
    }
    else {
        console.log(Math.ceil(COUNT_NAME_PROFILE / 3));
        document.getElementById("row_" + Math.ceil(COUNT_NAME_PROFILE / 3)).appendChild(div);
    }
    console.log("profile " + COUNT_NAME_PROFILE);
    COUNT_NAME_PROFILE += 1;
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
    var current_profile;
    for (var i = 0; i < PROFILE_VIEW_DISPLAY.length; i++) {
        if (PROFILE_VIEW_DISPLAY[i].id == _id_profile)
            current_profile = PROFILE_VIEW_DISPLAY[i];
    }
    current_profile.count_follow--;
    document.getElementById("follow_count_" + _id_profile).innerHTML = "";
    document.getElementById("follow_count_" + _id_profile).innerHTML = "עוקבים " + current_profile.count_follow;

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
    window.location.replace("View_Profile.html");

}

//*******************************************************************************************
// SearchProfileByCities
//*******************************************************************************************
function SearchProfileByCities()
//חיפוש פרופיל לפי ערים
{
    //מוצא את כל הערים שנבחרו
    var cities = new Array();
    var list_cities = document.getElementsByName('city_option');
    for (var j = 0; j < list_cities.length; j++) {
        if (list_cities[j].checked == true)
            cities.push(list_cities[j].value);
    }
    if (cities.length == 0) // אם לא נבחרה אף עיר
    {
        document.getElementById("profiles_form").innerHTML = "";
        ShowProfiles();
        alert("אנא בחר עיר לחיפוש פרופיל !");
    }
    else {
        var search_prof = GetProfileByCity(cities);
        if (search_prof.length == 0) // אם אין אף פרופיל מתאים לחחפוש
        {
            document.getElementById("profiles_form").innerHTML = "";
            alert("אין פרופילים מתאימים לחיפוש!");
        }
        else
            ShowSelectedProfiles(search_prof);
    }
}
//*******************************************************************************************
// SearchProfileByName
//*******************************************************************************************
function SearchProfileByName()
//חיפוש פרופיל לפי שם
{
    var txt_search_name = document.getElementById("txt_search_profile_by_name");
    if (txt_search_name.value == "") {
        //txt_search_name.className = "not_valid";
        document.getElementById("profiles_form").innerHTML = "";
        ShowProfiles();
        alert("אנא הכנס שם פרופיל לחיפוש!");
    }
    else {
        var search_prof = GetProfileByName(txt_search_name.value); // מקבל את רשימת הפרופילים התואמים
        if (search_prof.length == 0)//אם אין אף תוצאת חיםוש מתאימה
        {
            document.getElementById("profiles_form").innerHTML = "";
            alert("אין פרופילים מתאימים לחיפוש!");
        }
        else
            ShowSelectedProfiles(search_prof);
    }
}
//*******************************************************************************************
// GetProfileByName
//*******************************************************************************************
function GetProfileByName(prof_name)
//מחזיר פרופיל לפי שם. יכול להיות רשימה של פרופילים
{
    var list_profiles = new Array();
    for (var i = 0; i < PROFILES.length; i++) {
        console.log(PROFILES[i].name.indexOf(prof_name));
        if (PROFILES[i].name.indexOf(prof_name) >= 0) // התאמה לכל או כל השם
            list_profiles.push( PROFILES[i]);
    }
    return list_profiles;
}

//*******************************************************************************************
// GetProfileByCity
//*******************************************************************************************
function GetProfileByCity(cities)
//מחזיר פרופיל לפי עיר. יכול להיות רשימה של פרופילים
{
    var list_profiles = new Array();
    for (var h = 0; h < cities.length; h++) {
        for (var i = 0; i < PROFILES.length; i++) {
            console.log(PROFILES[i].id_city ==cities[h]);
            if (PROFILES[i].id_city == cities[h]) 
                list_profiles.push(PROFILES[i]);
        }
    }
    return list_profiles;
}
//*******************************************************************************************
// ShowSelectedProfiles
//*******************************************************************************************
function ShowSelectedProfiles(_list_profiles)
//מציג את הפרופילים הנבחרים
{
//ריקון התצוגה
    document.getElementById("profiles_form").innerHTML = "";
    // תצוגת הפרופילים המבוקשים
    for (var i = 0; i < _list_profiles.length; i++) {
        AddProfile(_list_profiles[i], i + 1);
    }
}
//*******************************************************************************************
// GetProfileCountFollows
//*******************************************************************************************
function GetProfileCountFollows(current_profile) {
    GlobalAjax("/api/Followers/GetProfileFollowByProfileId/" + current_profile.id , "GET", "",
        function (data) {
            current_profile.count_follow = data.length;
            AddProfile(current_profile);
        }
        , FailGetProfileCountFollows);
}

//function SuccessGetProfileCountFollows(data) {
//    PROFILE_VIEW_DISPLAY.count_follow = data.length;
//    //ShowCountFollowOfProfile();
//}

function FailGetProfileCountFollows() {
    console.log("שגיאה לא מצליח להביא את המשתמשים העוקבים של הפרופיל");
}