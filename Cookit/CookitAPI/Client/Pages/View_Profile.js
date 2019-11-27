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
//פונקציות מתכון
var USER_LIKE = null;
var USER_FAVORITE = null;

var PROFILE_RECIPES = new Array();
var PROFILE_RECIPES_DISPLAY = new Array();
var COUNT_RECIPES = 1;
var COUNT_NAME_RECIPES = 1;

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


    GetUserLike();//מביא את הלייקים של מהשתמש
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


//*******************************************************************************************
// GET USER LIKE
//*******************************************************************************************
function GetUserLike() {
    var user_id = LOGIN_USER.id;
    GlobalAjax("/api/Like/GetLikeByUserId/" + user_id, "GET", "", SuccessGetLikeByUserId, FailGetLikeByUserId);
}

function SuccessGetLikeByUserId(data) {
    USER_LIKE = data;
    sessionStorage.setItem("USER_LIKE", JSON.stringify(USER_LIKE));
    //מביאת את המתכונים המועדפים
    GetUserFavorite();

}

function FailGetLikeByUserId() {
    console.log("אין לייק של מתשמ");
    //מביאת את המתכונים המועדפים
    GetUserFavorite();
}
//*******************************************************************************************
// Is Login User Like Recipe
//*******************************************************************************************
function IsLoginUserLikeRecipe(_recipe_id)
//מחזיר אמת אם המשתמש עשה לייק למתכון
{
    for (i = 0; i < USER_LIKE.length; i++) {
        if (USER_LIKE[i].id_recipe == _recipe_id)
            return true;
    }
    return false;
}

//*******************************************************************************************
// Is Login User favorite Recipe
//*******************************************************************************************
function IsLoginUserFavoriteRecipe(_recipe_id)
//מחזיר אמת אם המשתמש עשה לייק למתכון
{
    for (i = 0; i < USER_FAVORITE.length; i++) {
        if (USER_FAVORITE[i].id_recipe == _recipe_id)
            return true;
    }
    return false;
}

//*******************************************************************************************
// GET  FAVORITE
//*******************************************************************************************
function GetUserFavorite() {
    var user_id = LOGIN_USER.id;
    GlobalAjax("/api/Favorite/GetFavoriteByUserId/" + user_id, "GET", "", SuccessGetFavoriteByUserId, FailGetFavoriteByUserId);
}

function SuccessGetFavoriteByUserId(data) {
    USER_FAVORITE = data;
    sessionStorage.setItem("USER_FAVORITE", JSON.stringify(USER_FAVORITE));
    //ShowFavorite();
    //מביא את כל המתכונים
    GetProfileRecipes();
}

function FailGetFavoriteByUserId() {
    console.log("מתכון זה לא במועדפים של המשתמש");
    //ShowFavorite();
    //מביא את כל המתכונים
    GetProfileRecipes();
}

//*******************************************************************************************
// GET all RECIPE 
//*******************************************************************************************
function GetProfileRecipes() {
    GlobalAjax("/api/Recipe/GetRecipesByUserId/" + PROFILE_VIEW.user_id, "GET", "", SuccessGetUserRecipes, FailGetUserRecipes);
}

function SuccessGetUserRecipes(data) {
    console.log("משיכת נתוני מתכון בוצע בהצלחה!.");
    PROFILE_RECIPES = data;
    sessionStorage.setItem("PROFILE_RECIPES", JSON.stringify(data));
    COUNT_RECIPES = data.length;
    for (var i = 0; i < COUNT_RECIPES; i++) {
        PROFILE_RECIPES_DISPLAY.push({
            recp_id: PROFILE_RECIPES[i].recp_id,
            user_id: PROFILE_RECIPES[i].user_id,
            recp_name: PROFILE_RECIPES[i].recp_name,
            recp_dish_type: PROFILE_RECIPES[i].recp_dish_type,
            recp_dish_category: PROFILE_RECIPES[i].recp_dish_category,
            recp_food_type: PROFILE_RECIPES[i].recp_food_type,
            recp_kitchen_type: PROFILE_RECIPES[i].recp_kitchen_type,
            recp_level: PROFILE_RECIPES[i].recp_level,
            recp_total_time: PROFILE_RECIPES[i].recp_total_time,
            recp_work_time: PROFILE_RECIPES[i].recp_work_time,
            recp_steps: PROFILE_RECIPES[i].recp_steps,
            recp_holidays: null,
            recp_food_labels: null,
            recp_owner_name: PROFILE_VIEW.name,
            login_user_favorite: false,
            login_user_like: false,
            recp_count_like: null
        });
    }
    //הכנסת הלייקים
    for (var h = 0; h < PROFILE_RECIPES_DISPLAY.length; h++) {
        var flag = false;
        for (var i = 0; i < USER_LIKE.length && (!flag); i++) {
            if (USER_LIKE[i].id_recipe == PROFILE_RECIPES_DISPLAY[h].recp_id) {
                flag = true;
                PROFILE_RECIPES_DISPLAY[h].login_user_like = true;
            }
        }
    }
    //הכנסת המועדפים
    for (var a = 0; a < PROFILE_RECIPES_DISPLAY.length; a++) {
        var flag_a = false;
        for (var b = 0; b < USER_FAVORITE.length && (!flag_a); b++) {
            if (USER_FAVORITE[b].id_recipe == PROFILE_RECIPES_DISPLAY[a].recp_id) {
                PROFILE_RECIPES_DISPLAY[a].login_user_favorite = true;
                flag_a = true;
            }
        }
    }
    //הצגת כל המתכונים
    ShowRecipes();
}

function FailGetUserRecipes(data) {
    console.log("error! can't get recipe information.");
    console.log(data);
    alert("שגיאה במשיכת נתוני מתכון!, אנא נסה שנית מאוחד יותר.");
}

//*******************************************************************************************
// Show Recipes
//*******************************************************************************************
function ShowRecipes() {
    document.getElementById("profile_recipes").innerHTML = "";
    COUNT_NAME_RECIPES = 1;
    for (var i = 0; i < PROFILE_RECIPES_DISPLAY.length; i++) {
        CountLikeOfRecipe(PROFILE_RECIPES_DISPLAY[i], PROFILE_VIEW.name);
    }
}

//*******************************************************************************************
// Get number of like of recipe
//*******************************************************************************************
function CountLikeOfRecipe(_recipe, _name) {
    GlobalAjax("/api/Like/GetCountLikeOfRecipe/" + _recipe.recp_id, "GET", "",
        function (data) {
            console.log("מספר לייקים " + data);
            _recipe.recp_count_like = data;
            AddRecipe(_recipe);
        },
        function () {
            console.log("שגיאה! לא מצליח להביא את מספר הלייקים של המתכון");
            AddRecipe(_recipe);
        });
}
//*******************************************************************************************
// Add Recipe
//*******************************************************************************************
function AddRecipe(_recipe) {
    //div
    var div = document.createElement('div');
    div.className = "col-md-4 ";
    //div
    var recipe_div = document.createElement('div');
    recipe_div.id = _recipe.recp_id;
    recipe_div.className = "card profile-card-3 ";
    recipe_div.style["backgroundColor"] = "white";
    recipe_div.style["padding"] = "10px";
    recipe_div.style[""] = "10px";
    recipe_div.setAttribute("data-toggle", "tooltip");
    recipe_div.setAttribute("title", "הקלק על התמונה כדי לצפות במתכון!");
    //recipe img div
    var recipe_img_div = document.createElement("div");
    recipe_img_div.className = "profile-thumb-block ";
    //recipe img
    var recipe_img = document.createElement("img");
    recipe_img.id = "img_recipe_" + _recipe.recp_id;
    recipe_img.className = "profile shrink recipe_onhover_effect";
    recipe_img.alt = " תמונת מתכון " + _recipe.recp_name;
    recipe_img.src = "/Client/Images/Recipes_pic/chokolate cake.jpg";
    recipe_img.style["width"] = "100%";
    recipe_img.style["height"] = "50%";
    recipe_img.style["marginTop"] = "5px";
    recipe_img.setAttribute("onClick", "ShowRecipeData(this.id)");
    recipe_img_div.appendChild(recipe_img);
    recipe_div.appendChild(recipe_img_div);
    //recipe name div
    var recipe_name_div = document.createElement("div");
    recipe_name_div.className = "card-content ";
    //recipe name
    var recipe_name = document.createElement("span");
    recipe_name.style["display"] = "block";
    recipe_name.style["font-weight"] = "bold";
    recipe_name.innerHTML = _recipe.recp_name;
    recipe_name.className = "thicker";
    recipe_name_div.appendChild(recipe_name);
    //recipe user\profile 
    var recipe_owner = document.createElement("span");
    recipe_owner.innerHTML = _recipe.recp_owner_name;
    recipe_owner.style["display"] = "block";
    recipe_name_div.appendChild(recipe_owner);

    recipe_div.appendChild(recipe_name_div);
    //recipe like div   
    var recipe_div_like_favorite = document.createElement("div");
    recipe_div_like_favorite.className = "row";
    recipe_div.appendChild(recipe_div_like_favorite);
    //מספר לייקים נוכחי
    var div_like_count = document.createElement("div");
    div_like_count.className = "col";
    recipe_div_like_favorite.appendChild(div_like_count);

    var recipe_like_count = document.createElement("span");
    recipe_like_count.id = "like_count_" + _recipe.recp_id;
    recipe_like_count.style["display"] = "block";
    recipe_like_count.innerHTML = "לייקים " + _recipe.recp_count_like;//+ מסםר הלייקים
    div_like_count.appendChild(recipe_like_count);
    //לייק
    var div_like = document.createElement("div");
    div_like.className = "col";
    recipe_div_like_favorite.appendChild(div_like);

    var recipe_like = document.createElement("i");
    recipe_like.id = "like_recipe_" + _recipe.recp_id;
    //לבדוק האם כבר נמצא ברשימת הלייקים של המשתמש או לא ולסמן בהתאם
    //if (IsLoginUserLikeRecipe(_recipe.recp_id)) {
    if (_recipe.login_user_like == true) {
        recipe_like.className = "fa fa-heart";
        recipe_like.setAttribute("title", "הקלק על הסימן כדי להסיר לייק מהמתכון!.");
        recipe_like.setAttribute("onClick", "RemoveRecipeLike_Btn(this.id)");
    }
    else {
        recipe_like.className = "fa fa-heart-o";
        recipe_like.setAttribute("title", "הקלק על הסימן כדי להוסיף לייק למתכון!.");
        recipe_like.setAttribute("onClick", "AddRecipeLike_Btn(this.id)");
    }
    //recipe_like.style["font-size"] = "28px";
    recipe_like.style["color"] = "red";
    recipe_like.setAttribute("data-toggle", "tooltip");
    recipe_like.setAttribute("data-placement", "top");
    div_like.appendChild(recipe_like);
    //מועדפים
    var div_favorite = document.createElement("div");
    div_favorite.className = "col";
    recipe_div_like_favorite.appendChild(div_favorite);

    var recipe_favorite = document.createElement("i");
    recipe_favorite.id = "favorite_recipe_" + _recipe.recp_id;
    //לבדוק האם כבר נמצא ברשימת הלייקים של המשתמש או לא ולסמן בהתאם
    //if (IsLoginUserFavoriteRecipe(_recipe.recp_id)) {
    if (_recipe.login_user_favorite == true) {
        recipe_favorite.className = "fa fa-bookmark";
        recipe_favorite.setAttribute("title", "הקלק על הסימן כדי להסיר את המתכון למועדפים!.");
        recipe_favorite.setAttribute("onClick", "RemoveRecipeFavorite_Btn(this.id)");
    }
    else {
        recipe_favorite.className = "fa fa-bookmark-o";
        recipe_favorite.setAttribute("title", "הקלק על הסימן כדי להוסיף את המתכון למועדפים!.");
        recipe_favorite.setAttribute("onClick", "AddRecipeFavorite_Btn(this.id)");
    }
    ////recipe_favorite.style["font-size"] = "28px";
    recipe_favorite.style["color"] = "black";
    recipe_favorite.setAttribute("data-toggle", "tooltip");
    recipe_favorite.setAttribute("data-placement", "top");
    div_favorite.appendChild(recipe_favorite);
    //הוספת השלב לתצוגה
    div.appendChild(recipe_div);
    console.log(COUNT_NAME_RECIPES % 3);
    if (COUNT_NAME_RECIPES % 3 == 1) {
        //create new row
        var row = document.createElement("div");
        row.className = "row";
        console.log(Math.ceil(COUNT_NAME_RECIPES / 3));
        row.id = "row_" + Math.ceil(COUNT_NAME_RECIPES / 3); // עיגול למעלה

        row.appendChild(div);
        document.getElementById("profile_recipes").appendChild(row);
    }
    else {
        console.log(Math.ceil(COUNT_NAME_RECIPES / 3));
        document.getElementById("row_" + Math.ceil(COUNT_NAME_RECIPES / 3)).appendChild(div);
    }
    console.log("recipe " + COUNT_NAME_RECIPES);
    COUNT_NAME_RECIPES += 1;
}