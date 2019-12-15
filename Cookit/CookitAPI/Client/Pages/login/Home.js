//*******************************************************************************************
// GLOBAL VARAIBLES
////*******************************************************************************************
var LOGIN_USER = JSON.parse(sessionStorage.getItem("Login_User"));
//פונקציות מתכון
var USER_LIKE = null;
var USER_FAVORITE = null;
// פרטי המתכון של פרופילים נעקבים שלי
var ARRY_RECIPES_OF_FOLLOW_PROFILE;
var ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY = new Array();
var COUNT_RECIPES_OF_FOLLOW_PROFILE = 1;
var COUNT_NAME_RECIPES_OF_FOLLOW_PROFILE = 1;
//פרטי מתכונים מומלצים
var ARRY_RECOMMENDED_RECIPES;
var ARRY_RECOMMENDED_RECIPES_DISPLAY = new Array();
var COUNT_RECOMMENDED_RECIPES = 1;
var COUNT_NAME_RECOMMENDED_RECIPES = 1;
//פרטי פרופילים מומלצים
var ARRY_RECOMMENDED_PROFILES;
var ARRY_RECOMMENDED_PROFILES_DISPLAY = new Array();
var COUNT_RECOMMENDED_PROFILES = 1;
var COUNT_NAME_RECOMMENDED_PROFILES = 1;
var PROFILE_FOLLOW_BY_LOGIN_USER = null;
var ARRY_CITY;
var ARRY_REGION;
//*******************************************************************************************
// PAGE LOAD
//*******************************************************************************************
$(document).ready(function () {
    // להביא נתונים סטטים
    GetUserLike();
});

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
// GET  FAVORITE
//*******************************************************************************************
function GetUserFavorite() {
    var user_id = LOGIN_USER.id;
    GlobalAjax("/api/Favorite/GetFavoriteByUserId/" + user_id, "GET", "", SuccessGetFavoriteByUserId, FailGetFavoriteByUserId);
}

function SuccessGetFavoriteByUserId(data) {
    USER_FAVORITE = data;
    sessionStorage.setItem("USER_FAVORITE", JSON.stringify(USER_FAVORITE));
    //מביא את כל המתכונים
    GetRecipesOfFollowProfiles();
}

function FailGetFavoriteByUserId() {
    console.log("מתכון זה לא במועדפים של המשתמש");
    //מביא את כל המתכונים
    GetRecipesOfFollowProfiles();
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
// GET all RECIPE 
//*******************************************************************************************
function GetRecipesOfFollowProfiles() {
    //מביא את המתכונים של הפרופילים שאני עוקב אחריהם
    GlobalAjax("/api/Recipe/GetRecipesOfFollowProfiles/" + Login_User.id, "GET", "", SuccessGetRecipesOfFollowProfiles, FailGetRecipesOfFollowProfiles);
}

function SuccessGetRecipesOfFollowProfiles(data) {
    console.log("משיכת מתכוני פרופילים נעקבים בוצע בהצלחה!.");
    ARRY_RECIPES_OF_FOLLOW_PROFILE = data;
    sessionStorage.setItem("ARRY_RECIPES_OF_FOLLOW_PROFILE", JSON.stringify(ARRY_RECIPES_OF_FOLLOW_PROFILE));
    COUNT_RECIPES_OF_FOLLOW_PROFILE = data.length;
    for (var i = 0; i < COUNT_RECIPES_OF_FOLLOW_PROFILE; i++) {
        ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY.push({
            recp_id: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_id,
            user_id: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].user_id,
            recp_name: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_name,
            recp_dish_type: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_dish_type,
            recp_dish_category: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_dish_category,
            recp_food_type: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_food_type,
            recp_kitchen_type: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_kitchen_type,
            recp_level: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_level,
            recp_total_time: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_total_time,
            recp_work_time: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_work_time,
            recp_steps: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].recp_steps,            
            login_user_favorite: false,
            login_user_like: false,
            recp_count_like: null,
            img_path: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].img_path,
            img_name: ARRY_RECIPES_OF_FOLLOW_PROFILE[i].img_name
        });
    }
    //הכנסת הלייקים
    for (var h = 0; h < ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY.length; h++) {
        var flag = false;
        for (var i = 0; i < USER_LIKE.length && (!flag); i++) {
            if (USER_LIKE[i].id_recipe == ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[h].recp_id) {
                flag = true;
                ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[h].login_user_like = true;
            }
        }
    }
    //הכנסת המועדפים
    for (var a = 0; a < ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY.length; a++) {
        var flag_a = false;
        for (var b = 0; b < USER_FAVORITE.length && (!flag_a); b++) {
            if (USER_FAVORITE[b].id_recipe == ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[a].recp_id) {
                ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[a].login_user_favorite = true;
                flag_a = true;
            }
        }
    }
    //הצגת כל המתכונים
    ShowRecipes();
}

function FailGetRecipesOfFollowProfiles(data) {
    console.log("שגיאה במשיכת מתכוני פרופילים נעקבים.");
    alert("שגיאה במשיכת מתכוני פרופילים נעקבים.");
}
//*******************************************************************************************
// Show Recipes
//*******************************************************************************************
function ShowRecipes() {
    document.getElementById("form_profiles_follow_recipes").innerHTML = "";
    COUNT_NAME_RECIPES_OF_FOLLOW_PROFILE = 1;
    if (COUNT_RECIPES_OF_FOLLOW_PROFILE == 0) {
        document.getElementById("form_profiles_follow_recipes").innerHTML = "אין מתכונים";
        document.getElementById("form_profiles_follow_recipes").style["height"] = "50px";
    }
    else {
        //שינוי התצוגה כך שיהיה נגלל
        document.getElementById("form_profiles_follow_recipes").style["height"] = "300px";
        document.getElementById("form_profiles_follow_recipes").style["overflowY"] = "scroll";
        document.getElementById("form_profiles_follow_recipes").style["overflowX"] = "hidden";
 //מציג את המתכונים
        for (var i = 0; i < ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY.length; i++) {
            GetProfileName(ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].user_id, ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i], "form_profiles_follow_recipes");//, COUNT_NAME_RECIPES_OF_FOLLOW_PROFILE);
        }
    }

    //מביא את המתכונים המומלצים
    GetRecommendedRecipes();
}

//*******************************************************************************************
// IS USER HAS PROFILE
//*******************************************************************************************
function GetProfileName(_user_id, _recipe, _form) {//, _count) {
    GlobalAjax("/api/Profile/GetProfileByUserId/" + _user_id, "GET", "",
        function (data) {
            console.log("שם פרופיל " + data.name);
            _recipe.recp_owner_name = data.name;
            CountLikeOfRecipe(_recipe, _form);//, _count);//, data.name,);
        },
        function () {
            console.log("לא מצא את הפרופיל, מחפפש אחר שם משתמש");
            GetFullUserNameById(_user_id, _recipe, _form);//, _count);
        });
}
//*******************************************************************************************
// Get Full User NameBy Id
//*******************************************************************************************
function GetFullUserNameById(_user_id, _recipe, _form) {//, _count) {
    GlobalAjax("/api/User/GetUserFullNameByID/" + _user_id, "GET", "",
        function (data) {
            console.log("שם משתמש " + data);
            _recipe.recp_owner_name = data;
            CountLikeOfRecipe(_recipe, _form);//, _count);//, data);
        }, function () {
            console.log("בעיה במשיגת שם יוצר מתכון!");
            CountLikeOfRecipe(_recipe, _form);//, _count);//, null);
        });
}
//*******************************************************************************************
// Get number of like of recipe
//*******************************************************************************************
function CountLikeOfRecipe(_recipe, _form) {//, _count) {//, _name) {
    GlobalAjax("/api/Like/GetCountLikeOfRecipe/" + _recipe.recp_id, "GET", "",
        function (data) {
            console.log("מספר לייקים " + data);
            _recipe.recp_count_like = data;
            AddRecipe(_recipe, _form);//, _count);
        },
        function () {
            console.log("שגיאה! לא מצליח להביא את מספר הלייקים של המתכון");
            AddRecipe(_recipe, _form);//, _count);
        });
}
//*******************************************************************************************
// Add Recipe
//*******************************************************************************************
function AddRecipe(_recipe, _form) {//,_count) {
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
    recipe_img.alt = "סליחה, התמונה אינה זמינה כעת";//" תמונת מתכון " + _recipe.recp_name;
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
    recipe_like_count.className = "like_count_" + _recipe.recp_id;
    recipe_like_count.style["display"] = "block";
    recipe_like_count.innerHTML = "לייקים " + _recipe.recp_count_like;//+ מסםר הלייקים
    div_like_count.appendChild(recipe_like_count);
    //לייק
    var div_like = document.createElement("div");
    div_like.className = "col";
    recipe_div_like_favorite.appendChild(div_like);

    var recipe_like = document.createElement("i");
    recipe_like.id = "like_recipe_" + _recipe.recp_id;
    recipe_like.className = "like_recipe_" + _recipe.recp_id;
    //לבדוק האם כבר נמצא ברשימת הלייקים של המשתמש או לא ולסמן בהתאם
    //if (IsLoginUserLikeRecipe(_recipe.recp_id)) {
    if (_recipe.login_user_like == true) {
        recipe_like.className += " fa fa-heart";
        recipe_like.setAttribute("title", "הקלק על הסימן כדי להסיר לייק מהמתכון!.");
        recipe_like.setAttribute("onClick", "RemoveRecipeLike_Btn(this.id)");
    }
    else {
        recipe_like.className += " fa fa-heart-o";
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
        recipe_favorite.className = "favorite_recipe_" + _recipe.recp_id;
//לבדוק האם כבר נמצא ברשימת הלייקים של המשתמש או לא ולסמן בהתאם
        //if (IsLoginUserFavoriteRecipe(_recipe.recp_id)) {
        if (_recipe.login_user_favorite == true) {
            recipe_favorite.className += " fa fa-bookmark";
            recipe_favorite.setAttribute("title", "הקלק על הסימן כדי להסיר את המתכון למועדפים!.");
            recipe_favorite.setAttribute("onClick", "RemoveRecipeFavorite_Btn(this.id)");
        }
        else {
            recipe_favorite.className += " fa fa-bookmark-o";
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
    var _count;
    if (_form == "form_recommended_recipes")
        _count = COUNT_NAME_RECOMMENDED_RECIPES;
    else
        _count = COUNT_NAME_RECIPES_OF_FOLLOW_PROFILE;
    var row_number = Math.ceil(_count / 3);
    if (_count % 3 == 1) {  //אם מתחיל שורה חדשה
        //create new row
        var row = document.createElement("div");
        row.className = "row";
        console.log(Math.ceil(_count / 3));
        row.id = "row_" + row_number;// עיגול למעלה

        row.appendChild(div);
        document.getElementById(_form).appendChild(row);
    }
    else {
        console.log(Math.ceil(_count / 3)); 
        var f = document.getElementById(_form).children[row_number-1];//[((_count % 3) - 1)];
        f.appendChild(div);
        //document.getElementById("row_" + Math.ceil(_count / 3))[0].appendChild(div);  //document.getElementById("row_" + Math.ceil(COUNT_NAME_RECIPES_OF_FOLLOW_PROFILE / 3)).appendChild(div);
    }
    _count += 1;  
    if (_form == "form_recommended_recipes")
        COUNT_NAME_RECOMMENDED_RECIPES+=1;
    else
       COUNT_NAME_RECIPES_OF_FOLLOW_PROFILE+=1;
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
        for (var i = 0; i < ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY.length; i++) {
            if (ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].recp_id == _recipe_id)
                ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].login_user_favorite = true;
        }
        for (var i = 0; i < ARRY_RECOMMENDED_RECIPES_DISPLAY.length; i++) {
            if (ARRY_RECOMMENDED_RECIPES_DISPLAY[i].recp_id == _recipe_id)
                ARRY_RECOMMENDED_RECIPES_DISPLAY[i].login_user_favorite = true;
        }
    GlobalAjax("/api/Favorite/AddNewFavorite", "POST", new_favorite, SuccessAddNewFavorite, FailAddNewFavorite);
}
function SuccessAddNewFavorite(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_favorite = document.getElementsByClassName("favorite_recipe_" + data.id_recipe);
    for (var i = 0; i < btn_favorite.length; i++) {
        btn_favorite[i].className = "favorite_recipe_" + data.id_recipe + " fa fa-bookmark";
        btn_favorite[i].setAttribute("title", "הקלק על הסימן כדי להסיר את המתכון למועדפים!.");
        btn_favorite[i].setAttribute("onClick", "RemoveRecipeFavorite_Btn(this.id)");
    }
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
        for (var i = 0; i < ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY.length; i++) {
            if (ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].recp_id == _recipe_id)
                ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].login_user_favorite = false;
        }
        for (var i = 0; i < ARRY_RECOMMENDED_RECIPES_DISPLAY.length; i++) {
            if (ARRY_RECOMMENDED_RECIPES_DISPLAY[i].recp_id == _recipe_id)
                ARRY_RECOMMENDED_RECIPES_DISPLAY[i].login_user_favorite = false;
        }
    GlobalAjax("/api/Favorite/DeleteFavorite", "DELETE", _favorite, SuccessRemoveFavorite, FailRemoveFavorite);
}
function SuccessRemoveFavorite(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_favorite = document.getElementsByClassName("favorite_recipe_" + data.id_recipe);
    for (var i = 0; i < btn_favorite.length; i++) {
        btn_favorite[i].className = "favorite_recipe_" + data.id_recipe + " fa fa-bookmark-o";
        btn_favorite[i].setAttribute("title", "הקלק על הסימן כדי להוסיף את המתכון למועדפים !.");
        btn_favorite[i].setAttribute("onClick", "AddRecipeFavorite_Btn(this.id)");
    }
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
    for (var i = 0; i < ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY.length; i++) {
        if (ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].recp_id == _recipe_id) {
            ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].login_user_like = true;
            ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].recp_count_like++;
        }
    }
    for (var i = 0; i < ARRY_RECOMMENDED_RECIPES_DISPLAY.length; i++) {
        if (ARRY_RECOMMENDED_RECIPES_DISPLAY[i].recp_id == _recipe_id) {
            ARRY_RECOMMENDED_RECIPES_DISPLAY[i].login_user_like = true;
            ARRY_RECOMMENDED_RECIPES_DISPLAY[i].recp_count_like++;
        }
    }
    GlobalAjax("/api/Like/AddNewLike", "POST", new_like, SuccessAddNewLike, FailAddNewLike);
}
function SuccessAddNewLike(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_like = document.getElementsByClassName("like_recipe_" + data.id_recipe);
    for (var i = 0; i < btn_like.length; i++) {
        btn_like[i].className = "like_recipe_" + data.id_recipe + " fa fa-heart";
        btn_like[i].setAttribute("title", "הקלק על הסימן כדי להסיר לייק מהמתכון!.");
        btn_like[i].setAttribute("onClick", "RemoveRecipeLike_Btn(this.id)");
    }
    //שינוי מספר הלייקים למתכון
    var like_count_alert = document.getElementsByName("like_count_" + data.id_recipe);
    var count_like;
    for (var i = 0; i < like_count_alert.length; i++) {
        count_like = like_count_alert[i].innerHTML.split(" ")[1];
        count_like++;
        like_count_alert[i].innerHTML = "";
        like_count_alert[i].innerHTML = "לייקים " + count_like;
    }
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
    for (var i = 0; i < ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY.length; i++) {
        if (ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].recp_id == _recipe_id) {
            ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].login_user_like = false;
            ARRY_RECIPES_OF_FOLLOW_PROFILE_DISPLAY[i].recp_count_like--;
        }
    }
    for (var i = 0; i < ARRY_RECOMMENDED_RECIPES_DISPLAY.length; i++) {
        if (ARRY_RECOMMENDED_RECIPES_DISPLAY[i].recp_id == _recipe_id) {
            ARRY_RECOMMENDED_RECIPES_DISPLAY[i].login_user_like = false;
            ARRY_RECOMMENDED_RECIPES_DISPLAY[i].recp_count_like--;
        }
    }
    GlobalAjax("/api/Like/DeleteLike", "DELETE", _like, SuccessRemoveLike, FailRemoveLike);
}
function SuccessRemoveLike(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
     var btn_like = document.getElementsByClassName("like_recipe_" + data.id_recipe);
    for (var i = 0; i < btn_like.length; i++) {
        btn_like[i].className = "like_recipe_" + data.id_recipe + " fa fa-heart-o";
        btn_like[i].setAttribute("title", "הקלק על הסימן כדי להוסיף לייק מהמתכון!.");
        btn_like[i].setAttribute("onClick", "AddRecipeLike_Btn(this.id)");
    }
    //שינוי מספר הלייקים למתכון
    var like_count_alert = document.getElementsByName("like_count_" + data.id_recipe);
    var count_like;
    for (var i = 0; i < like_count_alert.length; i++) {
        count_like = like_count_alert[i].innerHTML.split(" ")[1];
        count_like--;
        like_count_alert[i].innerHTML = "";
        like_count_alert[i].innerHTML = "לייקים " + count_like;
    }
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
//*******************************************************************************************
//*******************************************************************************************
// מתכונים מומלצים
//*******************************************************************************************
//*******************************************************************************************

//*******************************************************************************************
// GET RECOMMENDED RECIPS
//*******************************************************************************************
function GetRecommendedRecipes() {
    //מביא את המתכונים המומלצים- כאלה שמספר הלייקים שלהם מ 10
    GlobalAjax("/api/Recipe/GetRecommendedRecipes", "GET", "", SuccessGetRecommendedRecipes, FailGetRecommendedRecipes);
}

function SuccessGetRecommendedRecipes(data) {
    console.log("משיכת מתכונים מומלצים בוצע בהצלחה");
    ARRY_RECOMMENDED_RECIPES = data;
    sessionStorage.setItem("ARRY_RECOMMENDED_RECIPES", JSON.stringify(ARRY_RECOMMENDED_RECIPES));
    COUNT_RECOMMENDED_RECIPES = data.length;
    for (var i = 0; i < COUNT_RECOMMENDED_RECIPES; i++) {
        ARRY_RECOMMENDED_RECIPES_DISPLAY.push({
            recp_id: ARRY_RECOMMENDED_RECIPES[i].recp_id,
            user_id: ARRY_RECOMMENDED_RECIPES[i].user_id,
            recp_name: ARRY_RECOMMENDED_RECIPES[i].recp_name,
            recp_dish_type: ARRY_RECOMMENDED_RECIPES[i].recp_dish_type,
            recp_dish_category: ARRY_RECOMMENDED_RECIPES[i].recp_dish_category,
            recp_food_type: ARRY_RECOMMENDED_RECIPES[i].recp_food_type,
            recp_kitchen_type: ARRY_RECOMMENDED_RECIPES[i].recp_kitchen_type,
            recp_level: ARRY_RECOMMENDED_RECIPES[i].recp_level,
            recp_total_time: ARRY_RECOMMENDED_RECIPES[i].recp_total_time,
            recp_work_time: ARRY_RECOMMENDED_RECIPES[i].recp_work_time,
            recp_steps: ARRY_RECOMMENDED_RECIPES[i].recp_steps,
            login_user_favorite: false,
            login_user_like: false,
            recp_count_like: null,
            img_path: ARRY_RECOMMENDED_RECIPES[i].img_path,
            img_name: ARRY_RECOMMENDED_RECIPES[i].img_name
        });
    }
    //הכנסת הלייקים
    for (var h = 0; h < ARRY_RECOMMENDED_RECIPES_DISPLAY.length; h++) {
        var flag = false;
        for (var i = 0; i < USER_LIKE.length && (!flag); i++) {
            if (USER_LIKE[i].id_recipe == ARRY_RECOMMENDED_RECIPES_DISPLAY[h].recp_id) {
                flag = true;
                ARRY_RECOMMENDED_RECIPES_DISPLAY[h].login_user_like = true;
            }
        }
    }
    //הכנסת המועדפים
    for (var a = 0; a < ARRY_RECOMMENDED_RECIPES_DISPLAY.length; a++) {
        var flag_a = false;
        for (var b = 0; b < USER_FAVORITE.length && (!flag_a); b++) {
            if (USER_FAVORITE[b].id_recipe == ARRY_RECOMMENDED_RECIPES_DISPLAY[a].recp_id) {
                ARRY_RECOMMENDED_RECIPES_DISPLAY[a].login_user_favorite = true;
                flag_a = true;
            }
        }
    }
    //הצגת כל המתכונים
    ShowRecommendedRecipes();
}

function FailGetRecommendedRecipes(data) {
    console.log("שגיאה במשיכת נתוני מתכונים מומלצים");
    alert("שגיאה במשיכת נתוני מתכונים מומלצים");
}

//*******************************************************************************************
// ShowRecommendedRecipes
//*******************************************************************************************
function ShowRecommendedRecipes() {
    document.getElementById("form_recommended_recipes").innerHTML = "";
    COUNT_NAME_RECOMMENDED_RECIPES = 1;
    if (COUNT_RECOMMENDED_RECIPES == 0) {
        document.getElementById("form_recommended_recipes").innerHTML = "אין מתכונים";
        document.getElementById("form_recommended_recipes").style["height"] = "50px";
    }
    else {
        //שינוי התצוגה כך שיהיה נגלל
        document.getElementById("form_recommended_recipes").style["height"] = "300px";
        document.getElementById("form_recommended_recipes").style["overflowY"] = "scroll";
        document.getElementById("form_recommended_recipes").style["overflowX"] = "hidden";
        //מציג את המתכונים
        for (var i = 0; i < ARRY_RECOMMENDED_RECIPES_DISPLAY.length; i++) {
            GetProfileName(ARRY_RECOMMENDED_RECIPES_DISPLAY[i].user_id, ARRY_RECOMMENDED_RECIPES_DISPLAY[i], "form_recommended_recipes", COUNT_NAME_RECOMMENDED_RECIPES);
        }
    }

    //מביא את הפרופילים המומלצים
    GetCity();
}
//*******************************************************************************************
//*******************************************************************************************
// פרופילים מומלצים
//*******************************************************************************************
//*******************************************************************************************

//*******************************************************************************************
// GET CITY
//*******************************************************************************************
function GetCity()
//הפונקציה מביאה את רשימת הערים ממסד הנתונים
{
        GlobalAjax("/api/City/GetAllCities", "GET", "", SuccessCity, FailCity);
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
        GlobalAjax("/api/Region/GetAllRegion", "GET", "", SuccessGetRegion, FailGetRegion);
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
        GlobalAjax("/api/Followers/GetProfileFollowByUser/" + LOGIN_USER.id, "GET", "", SuccessGetProfileFollowByUser, FailGetProfileFollowByUser);
    
}

function SuccessGetProfileFollowByUser(data) {
    sessionStorage.setItem("PROFILE_FOLLOW_BY_LOGIN_USER", JSON.stringify(data));
    PROFILE_FOLLOW_BY_LOGIN_USER = data;

    GetRecommendedProfiles();
}

function FailGetProfileFollowByUser() {
    console.log(" אין פרופילים נעקבים!.");
    //alert(" אין פרופילים פעילים!.");
}
//*******************************************************************************************
// GetRecommendedProfiles
//*******************************************************************************************
function GetRecommendedProfiles() {
    GlobalAjax("/api/Profile/GetRecommendedProfiles", "GET", "", SuccessGetAllProfiles, FailGetAllProfiles);
}

function SuccessGetAllProfiles(data) {
    ARRY_RECOMMENDED_PROFILES = data;
    sessionStorage.setItem("ARRY_RECOMMENDED_PROFILES", JSON.stringify(data));
    COUNT_RECOMMENDED_PROFILES = ARRY_RECOMMENDED_PROFILES.length;
    for (var i = 0; i < ARRY_RECOMMENDED_PROFILES.length; i++) {
        ARRY_RECOMMENDED_PROFILES_DISPLAY.push({
            id: ARRY_RECOMMENDED_PROFILES[i].id,
            user_id: ARRY_RECOMMENDED_PROFILES[i].user_id,
            type: ARRY_RECOMMENDED_PROFILES[i].type,
            name: ARRY_RECOMMENDED_PROFILES[i].name,
            description: ARRY_RECOMMENDED_PROFILES[i].description,
            id_city: ARRY_RECOMMENDED_PROFILES[i].id_city,
            id_region: ARRY_RECOMMENDED_PROFILES[i].id_region,
            status: ARRY_RECOMMENDED_PROFILES[i].status,
            count_follow: 0,
            img_path: ARRY_RECOMMENDED_PROFILES[i].img_path,
            img_name: ARRY_RECOMMENDED_PROFILES[i].img_name
        });
    }
    //show the profiles dinamicaly
    ShowProfiles();
}

function FailGetAllProfiles() {
    console.log("שגיאה בהבאת פרופילים מומלצים!.");
    alert("שגיאה בהבאת פרופילים מומלצים!.");
}
//*******************************************************************************************
// Show Profiles
//*******************************************************************************************
function ShowProfiles() {
    COUNT_NAME_RECOMMENDED_PROFILES = 1;
    var login_id;
    var profile_id;
    if (COUNT_RECOMMENDED_PROFILES == 0) {
        document.getElementById("form_recommended_profiles").innerHTML = "אין פרופילים";
        document.getElementById("form_recommended_profiles").style["height"] = "50px";
    }
    else {
        document.getElementById("form_recommended_profiles").style["height"] = "300px";
        document.getElementById("form_recommended_profiles").style["overflowY"] = "scroll";
        document.getElementById("form_recommended_profiles").style["overflowX"] = "hidden";

        for (var i = 0; i < ARRY_RECOMMENDED_PROFILES_DISPLAY.length; i++) {
            login_id = LOGIN_USER.id;
            profile_id = ARRY_RECOMMENDED_PROFILES_DISPLAY[i].user_id;
            if (profile_id == login_id) //אם המשתמש המחובר זה הפרופיל
            {
                ARRY_RECOMMENDED_PROFILES_DISPLAY.splice(i, 1); //לא להציג אתו
                i--;
            }
            else
                GetProfileCountFollows(ARRY_RECOMMENDED_PROFILES_DISPLAY[i]);
        }
    }
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
// AddProfile
//*******************************************************************************************
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
    prof_img.alt = "סליחה, התמונה לא זמינה כעת";///" תמונת פרופיל " + _profile.name;
    prof_img.src = _profile.img_path;
    prof_img.style["width"] = "150px";//"30%";
    prof_img.style["height"] = "200px";//"30%";
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
    if (COUNT_NAME_RECOMMENDED_PROFILES % 3 == 1) {
        //create new row
        var row = document.createElement("div");
        row.className = "row";
        row.id = "profile_row_" + Math.ceil(COUNT_NAME_RECOMMENDED_PROFILES / 3); // עיגול למעלה

        row.appendChild(div);
        document.getElementById("form_recommended_profiles").appendChild(row);
    }
    else {
        document.getElementById("profile_row_" + Math.ceil(COUNT_NAME_RECOMMENDED_PROFILES / 3)).appendChild(div);
    }
    COUNT_NAME_RECOMMENDED_PROFILES += 1;
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
    for (var i = 0; i < ARRY_RECOMMENDED_PROFILES_DISPLAY.length; i++) {
        if (ARRY_RECOMMENDED_PROFILES_DISPLAY[i].id == _id_profile)
            current_profile = ARRY_RECOMMENDED_PROFILES_DISPLAY[i];
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
    for (var i = 0; i < ARRY_RECOMMENDED_PROFILES_DISPLAY.length; i++) {
        if (ARRY_RECOMMENDED_PROFILES_DISPLAY[i].id == _id_profile)
            current_profile = ARRY_RECOMMENDED_PROFILES_DISPLAY[i];
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