//*******************************************************************************************
// GLOBAL VARAIBLES
//*******************************************************************************************
var ARRY_CITY = null;
var ARRY_REGION = null;

var LOGIN_USER = JSON.parse(sessionStorage.getItem("Login_User"));
var LOGIN_PROFILE = JSON.parse(sessionStorage.getItem("Login_Profile"));
var PROFILE_VIEW_DISPLAY = {
    id: LOGIN_PROFILE.id,
    user_id: LOGIN_PROFILE.user_id,
    name: LOGIN_PROFILE.name,
    description: LOGIN_PROFILE.description,
    id_city: LOGIN_PROFILE.id_city,
    id_region: LOGIN_PROFILE.id_region,
    status: LOGIN_PROFILE.status,
    count_follow: 0,
    img_path: LOGIN_PROFILE.img_path,
    img_name: LOGIN_PROFILE.img_name
};
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
        //מביא את מספר העוקבים של הפרופיל
        GetProfileCountFollows();
}

function SuccessGetRegion(arry_region) {
    sessionStorage.setItem("ARRY_REGION", JSON.stringify(arry_region));
    ARRY_REGION = arry_region;

    //מביא את מספר העוקבים של הפרופיל
    GetProfileCountFollows();
}

function FailGetRegion() {
    console.log("שגיאה במשיכת נתוני מחוזות מהשרת.");
    alert('שגיאה במשיכת נתוני מחוזות מהשרת.');
}
//*******************************************************************************************
// GetProfileCountFollows
//*******************************************************************************************
function GetProfileCountFollows() {
    GlobalAjax("/api/Followers/GetProfileFollowByProfileId/" + LOGIN_PROFILE.id, "GET", "", SuccessGetProfileCountFollows, FailGetProfileCountFollows);
}

function SuccessGetProfileCountFollows(data) {
    PROFILE_VIEW_DISPLAY.count_follow = data.length;
    ShowCountFollowOfProfile();
    //מראה את פרטי הפרופיל
    ShowProfileInformation();

    GetUserLike();//מביא את הלייקים של מהשתמש
}

function FailGetProfileCountFollows() {
    console.log("שגיאה לא מצליח להביא את המשתמשים העוקבים של הפרופיל");
}

//*******************************************************************************************
// ShowCountFollowOfProfile
//*******************************************************************************************
function ShowCountFollowOfProfile() {
    var count_alert = document.getElementById("profile_follow_count");
    count_alert.innerHTML = "";
    count_alert.innerHTML = "עוקבים " + PROFILE_VIEW_DISPLAY.count_follow;
}

//*******************************************************************************************
// ShowProfileInformation
//*******************************************************************************************
function ShowProfileInformation() {
    //שם
    document.getElementById("profile_name").innerHTML = PROFILE_VIEW_DISPLAY.name;
    //תיאור
    document.getElementById("profile_description").innerHTML = PROFILE_VIEW_DISPLAY.description;
    //עיר
    console.log(ConvertId2Value(ARRY_CITY, PROFILE_VIEW_DISPLAY.id_city));
    document.getElementById("profile_city").innerHTML = ConvertId2Value(ARRY_CITY, PROFILE_VIEW_DISPLAY.id_city);
    //תמונה
    $("#profile_img").attr("src", PROFILE_VIEW_DISPLAY.img_path);
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
    //מביא את כל המתכונים
    GetProfileRecipes();
}
//*******************************************************************************************
// GET all RECIPE 
//*******************************************************************************************
function GetProfileRecipes() {
    GlobalAjax("/api/Recipe/GetRecipesByUserId/" + LOGIN_PROFILE.user_id, "GET", "", SuccessGetUserRecipes, FailGetUserRecipes);
}

function SuccessGetUserRecipes(data) {
    console.log("משיכת נתוני מתכון בוצע בהצלחה!.");
    PROFILE_RECIPES = data;
    sessionStorage.setItem("PROFILE_RECIPES", JSON.stringify(data));
    COUNT_RECIPES = data.length;
    if (COUNT_RECIPES == 0) {
        document.getElementById("profile_recipes").innerHTML = "אין מתכונים";
    }
    else {
        PROFILE_RECIPES_DISPLAY = new Array();
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
                recp_owner_name: LOGIN_PROFILE.name,
                login_user_favorite: false,
                login_user_like: false,
                recp_count_like: null,
                img_path: PROFILE_RECIPES[i].img_path,
                img_name: PROFILE_RECIPES[i].img_name
            });
        }
        console.log("PROFILE_RECIPES_DISPLAY.length = " + PROFILE_RECIPES_DISPLAY.length);
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
    if (PROFILE_RECIPES_DISPLAY.length == 0) //אם אין מתכונים
    {
        document.getElementById("profile_recipes").innerHTML = "אין מתכונים";
        document.getElementById("profile_recipes").style["height"] = "50px";
    }
    else {
        document.getElementById("profile_recipes").style["height"] = "300px";
        document.getElementById("profile_recipes").style["overflowY"] = "scroll";
        document.getElementById("profile_recipes").style["overflowX"] = "hidden";
        for (var i = 0; i < PROFILE_RECIPES_DISPLAY.length; i++) {
            CountLikeOfRecipe(PROFILE_RECIPES_DISPLAY[i]);
        }
    }
}
//*******************************************************************************************
// Get number of like of recipe
//*******************************************************************************************
function CountLikeOfRecipe(_recipe) {
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
    recipe_img.alt = "סליחה, התמונה לא זמינה כעת";//" תמונת מתכון " + _recipe.recp_name;
    recipe_img.src = _recipe.img_path;
    recipe_img.style["width"] = "300px";//"100%";
    recipe_img.style["height"] = "200px";//"50%";
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
    ///אם המתכון שייך למשתמש המחובר -  לא מאפשר לשמור למועדפים
    if (_recipe.user_id != LOGIN_USER.id) {
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
    }
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


//*******************************************************************************************
// RemoveRecipeFavorite_Btn
//*******************************************************************************************
function RemoveRecipeFavorite_Btn(id_btn_like)
//מסיר לייק של המשתמש המחובר למתכון
{
    var _id_recipe = id_btn_like.split("_")[2];
    RemoveFavorite(_id_recipe);
}
//*******************************************************************************************
// AddRecipeFavorite_Btn
//*******************************************************************************************
function AddRecipeFavorite_Btn(id_btn_like)
//מוסיף לייק של המשתמש המחובר למתכון
{
    var _id_recipe = id_btn_like.split("_")[2];
    AddNewFavorite(_id_recipe);
}

//*******************************************************************************************
// RemoveRecipeLike_Btn
//*******************************************************************************************
function RemoveRecipeLike_Btn(id_btn_like)
//מסיר לייק של המשתמש המחובר למתכון
{
    var _id_recipe = id_btn_like.split("_")[2];
    RemoveLike(_id_recipe);
}
//*******************************************************************************************
// AddRecipeLike_Btn
//*******************************************************************************************
function AddRecipeLike_Btn(id_btn_like)
//מוסיף לייק של המשתמש המחובר למתכון
{
    var _id_recipe = id_btn_like.split("_")[2];
    AddNewLike(_id_recipe);
}

//*******************************************************************************************
// ADD NEW LIKE
//*******************************************************************************************
function AddNewFavorite(_recipe_id)
//הוספת לייק חדש
{
    var new_favorite = {
        id_recipe: _recipe_id,
        id_user: LOGIN_USER.id
    };
    RECIPE_FAVORITE = new_favorite;
    for (var i = 0; i < PROFILE_RECIPES_DISPLAY.length; i++) {
        if (PROFILE_RECIPES_DISPLAY[i].recp_id == _recipe_id)
            PROFILE_RECIPES_DISPLAY[i].login_user_favorite = true;
    }
    GlobalAjax("/api/Favorite/AddNewFavorite", "POST", new_favorite, SuccessAddNewFavorite, FailAddNewFavorite);
}
function SuccessAddNewFavorite(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_favorite = document.getElementById("favorite_recipe_" + data.id_recipe);
    btn_favorite.className = "fa fa-bookmark";
    btn_favorite.setAttribute("title", "הקלק על הסימן כדי להסיר את המתכון למועדפים!.");
    btn_favorite.setAttribute("onClick", "RemoveRecipeFavorite_Btn(this.id)");
    //הודעת לייק
    console.log("המתגון הוסף למועדפים בהצלחה!.");
    alert("המתגון הוסף למועדפים בהצלחה!.");
}

function FailAddNewFavorite() {
    console.log("הוספת מתכון למועדים נכשלה");
    alert("הוספת מתכון למועדפים נכשלה");
}
//*******************************************************************************************
// RemoveFavorite
//*******************************************************************************************
function RemoveFavorite(_recipe_id)
//הוספת לייק חדש
{
    var _favorite = {
        id_recipe: _recipe_id,
        id_user: LOGIN_USER.id
    };
    var index = USER_FAVORITE.indexOf(_favorite);
    USER_FAVORITE.splice(index, 1);
    sessionStorage.setItem("USER_FAVORITE", JSON.stringify(USER_FAVORITE));
    for (var i = 0; i < PROFILE_RECIPES_DISPLAY.length; i++) {
        if (PROFILE_RECIPES_DISPLAY[i].recp_id == _recipe_id)
            PROFILE_RECIPES_DISPLAY[i].login_user_favorite = false;
    }
    GlobalAjax("/api/Favorite/DeleteFavorite", "DELETE", _favorite, SuccessRemoveFavorite, FailRemoveFavorite);
}
function SuccessRemoveFavorite(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_favorite = document.getElementById("favorite_recipe_" + data.id_recipe);
    btn_favorite.className = "fa fa-bookmark-o";
    btn_favorite.setAttribute("title", "הקלק על הסימן כדי להוסיף את המתכון למועדפים !.");
    btn_favorite.setAttribute("onClick", "AddRecipeFavorite_Btn(this.id)");
    //הודעת לייק
    console.log("המתכון הוסר מהמועדפים בהצלחה");
    alert("המתכון הוסר מהמועדפים בהצלחה");
}

function FailRemoveFavorite() {
    console.log("הסרת המתכון מהמועדפים נכשלה");
    alert("הסרת המתכון מהמועדפים נכשלה");
}
//*******************************************************************************************
// ADD NEW LIKE
//*******************************************************************************************
function AddNewLike(_recipe_id)
//הוספת לייק חדש
{
    var new_like = {
        id_recipe: _recipe_id,
        id_user: LOGIN_USER.id
    };
    USER_LIKE.push(new_like);
    sessionStorage.setItem("USER_LIKE", JSON.stringify(USER_LIKE));
    for (var i = 0; i < PROFILE_RECIPES_DISPLAY.length; i++) {
        if (PROFILE_RECIPES_DISPLAY[i].recp_id == _recipe_id) {
            PROFILE_RECIPES_DISPLAY[i].login_user_like = true;
            PROFILE_RECIPES_DISPLAY[i].recp_count_like++;
        }
    }
    GlobalAjax("/api/Like/AddNewLike", "POST", new_like, SuccessAddNewLike, FailAddNewLike);
}
function SuccessAddNewLike(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_like = document.getElementById("like_recipe_" + data.id_recipe);
    btn_like.className = "fa fa-heart";
    btn_like.setAttribute("title", "הקלק על הסימן כדי להסיר לייק מהמתכון!.");
    btn_like.setAttribute("onClick", "RemoveRecipeLike_Btn(this.id)");
    //שינוי מספר הלייקים למתכון
    var like_count_alert = document.getElementById("like_count_" + data.id_recipe);
    var count_like = like_count_alert.innerHTML.split(" ")[1];
    count_like++;
    like_count_alert.innerHTML = "";
    like_count_alert.innerHTML = "לייקים " + count_like;
    //הודעת לייק
    console.log("הלייק הוסף בהצלחה");
    alert("הלייק הוסף למתכון בהצלחה!.");
}

function FailAddNewLike() {
    console.log("הוספת לייק נכשלה");
    alert("הוספת לייק נכשלה");
}

//*******************************************************************************************
// Remove Like
//*******************************************************************************************
function RemoveLike(_recipe_id)
//הוספת לייק חדש
{
    var _like = {
        id_recipe: _recipe_id,
        id_user: LOGIN_USER.id
    };
    var index = USER_LIKE.indexOf(_like);
    USER_LIKE.splice(index, 1);
    sessionStorage.setItem("USER_LIKE", JSON.stringify(USER_LIKE));
    for (var i = 0; i < PROFILE_RECIPES_DISPLAY.length; i++) {
        if (PROFILE_RECIPES_DISPLAY[i].recp_id == _recipe_id) {
            PROFILE_RECIPES_DISPLAY[i].login_user_like = false;
            PROFILE_RECIPES_DISPLAY[i].recp_count_like--;
        }
    }
    GlobalAjax("/api/Like/DeleteLike", "DELETE", _like, SuccessRemoveLike, FailRemoveLike);
}
function SuccessRemoveLike(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_like = document.getElementById("like_recipe_" + data.id_recipe);
    btn_like.className = "fa fa-heart-o";
    btn_like.setAttribute("title", "הקלק על הסימן כדי להוסיף לייק מהמתכון!.");
    btn_like.setAttribute("onClick", "AddRecipeLike_Btn(this.id)");
    //שינוי מספר הלייקים למתכון
    var like_count_alert = document.getElementById("like_count_" + data.id_recipe);
    var count_like = like_count_alert.innerHTML.split(" ")[1];
    count_like--;
    like_count_alert.innerHTML = "";
    like_count_alert.innerHTML = "לייקים " + count_like;
    //הודעת לייק
    console.log("הלייק הוסר בהצלחה");
    alert("הלייק הוסר למתכון בהצלחה!.");
}

function FailRemoveLike() {
    console.log("הסרת לייק נכשלה");
    alert("הסרת לייק נכשלה");
}

//*******************************************************************************************
// ShowRecipeData
//*******************************************************************************************
function ShowRecipeData(_id_recpie)
//מעביר את המשתמש לדף של פרטי של במתכון בלבד
{
    var ID_RECPIE_VIEW = _id_recpie.split("_")[2];//id
    sessionStorage.setItem("ID_RECPIE_VIEW", JSON.stringify(ID_RECPIE_VIEW));
    window.location.replace("View_Recipe.html");
}
