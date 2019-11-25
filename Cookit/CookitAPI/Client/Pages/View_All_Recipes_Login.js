﻿//*******************************************************************************************
// GLOBAL VARAIBLES
////*******************************************************************************************
var LOGIN_USER = JSON.parse(sessionStorage.getItem("Login_User"));
//הקטגוריות
var ARRY_DISH_TYPE = new Array();
var ARRY_DISH_CATEGORY = new Array();
var ARRY_FOOD_TYPE = new Array();
var ARRY_KITCHEN_TYPE = new Array();
var ARRY_DIFFICULTY_LEVEL = new Array();
var ARRY_INGRIDIANTS = new Array();
var ARRY_MESURMENTS = new Array();
var ARRY_HOLIDAYS = new Array();
var ARRY_FOOD_LABLE = new Array();
//פונקציות מתכון
var USER_LIKE = null;
var USER_FAVORITE = null;
// פרטי המתכון
var ARRY_RECIPES;
var COUNT_RECIPES = 1;
var RECIPE_INGRIDIANTS = new Array();
var RECIPE_HOLIDAYS = new Array();
var RECIPE_FOOD_LABLES = new Array();
//*******************************************************************************************
// PAGE LOAD
//*******************************************************************************************
$(document).ready(function () {
    // להביא נתונים סטטים
      GetUserLike();
    //מביא את כל המתכונים
    //GetAllRecipes();
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
    sessionStorage.setItem("USER_LIKE",JSON.stringify(USER_LIKE));
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
    GetAllRecipes();
}

function FailGetFavoriteByUserId() {
    console.log("מתכון זה לא במועדפים של המשתמש");
    //ShowFavorite();
    //מביא את כל המתכונים
    GetAllRecipes();
}

//*******************************************************************************************
// GET  FAVORITE
//*******************************************************************************************
function GetFavorite() {
    var user_id = LOGIN_USER.id;
    var recipe_id = RECIPE_INFORMATION.recp_id;
    GlobalAjax("/api/Favorite/GetFavoriteByUserIdAndRecipeId/" + user_id + "/" + recipe_id, "GET", "", SuccessGetFavoriteByUserIdAndRecipeId, FailGetFavoriteByUserIdAndRecipeId);
}

function SuccessGetFavoriteByUserIdAndRecipeId(data) {
    RECIPE_FAVORITE = data;
    ShowFavorite();
    //מביא את תגובות המתכון
    GetRecipeComments();
}

function FailGetFavoriteByUserIdAndRecipeId() {
    console.log("מתכון זה לא במועדפים של המשתמש");
    ShowFavorite();
    //מביא את תגובות המתכון
    GetRecipeComments();
}
// GET all RECIPE 
//*******************************************************************************************
function GetAllRecipes()
{
    GlobalAjax("/api/Recipe/GetAllRecipes", "GET", "", SuccessGetAllRecipes, FailGetAllRecipes);
}

function SuccessGetAllRecipes(data) {
    console.log("משיכת נתוני מתכון בוצע בהצלחה!.");
    sessionStorage.setItem("ARRY_RECIPES", JSON.stringify(data));
    ARRY_RECIPES = data;
    //הצגת כל המתכונים
    ShowRecipes();
}

function FailGetAllRecipes(data) {
    console.log("error! can't get recipe information.");
    console.log(data);
    alert("שגיאה במשיכת נתוני מתכון!, אנא נסה שנית מאוחד יותר.");
}

//*******************************************************************************************
// Show Recipes
//*******************************************************************************************
function ShowRecipes() {
    for (var i = 0; i < ARRY_RECIPES.length; i++) {
        GetProfileName(ARRY_RECIPES[i].user_id ,ARRY_RECIPES[i],i + 1);
    }
}

//*******************************************************************************************
// IS USER HAS PROFILE
//*******************************************************************************************
function GetProfileName(_user_id, _recipe, _index) {
    GlobalAjax("/api/Profile/GetProfileByUserId/" + _user_id, "GET", "", function (data) { console.log("שם פרופיל " + data.name); AddRecipe(_recipe, data.name, _index); }, function () { console.log("לא מצא את הפרופיל, מחפפש אחר שם משתמש"); GetFullUserNameById(_user_id, _recipe, _index); });
}
//*******************************************************************************************
// Get Full User NameBy Id
//*******************************************************************************************
function GetFullUserNameById(_user_id, _recipe, _index) {
    GlobalAjax("/api/User/GetUserFullNameByID/" + _user_id, "GET", "", function (data) { console.log("שם משתמש " + data); AddRecipe(_recipe, data, _index); }, function () { console.log("בעיה במשיגת שם יוצר מתכון!"); });
}
//*******************************************************************************************
// Add Recipe
//*******************************************************************************************

function AddRecipe(_recipe, _name,_index) {
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
    recipe_owner.innerHTML = _name;
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
    recipe_like_count.innerHTML = "לייקים "+0;//+ מסםר הלייקים
    div_like_count.appendChild(recipe_like_count);
    //לייק
    var div_like = document.createElement("div");
    div_like.className = "col";
    recipe_div_like_favorite.appendChild(div_like);

    var recipe_like = document.createElement("i");
    recipe_like.id = "like_recipe_" + _recipe.recp_id; 
    //לבדוק האם כבר נמצא ברשימת הלייקים של המשתמש או לא ולסמן בהתאם
    if (IsLoginUserLikeRecipe(_recipe.recp_id)) {
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
    if (IsLoginUserFavoriteRecipe(_recipe.recp_id)) {
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
    // console.log(_index % 3);
    console.log(COUNT_RECIPES % 3);
    if (COUNT_RECIPES % 3 == 1) { //if (_index % 3 == 1) {
        //create new row
        var row = document.createElement("div");
        row.className = "row";
        console.log(Math.ceil(COUNT_RECIPES / 3));//console.log(Math.ceil(_index / 3));
        row.id = "row_" + Math.ceil(COUNT_RECIPES / 3); // עיגול למעלה//row.id = "row_" + Math.ceil(_index / 3); // עיגול למעלה

        row.appendChild(div);
        document.getElementById("recipes_form").appendChild(row);

    }
    else {
        console.log(Math.ceil(COUNT_RECIPES / 3));//console.log(Math.ceil(_index / 3));
        document.getElementById("row_" + Math.ceil(COUNT_RECIPES / 3)).appendChild(div);//.appendChild(div);// document.getElementById("row_" + Math.ceil(_index / 3)).prepend(div);//.appendChild(div);
    }
    console.log("recipe " + COUNT_RECIPES);
    COUNT_RECIPES += 1;
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
    sessionStorage.setItem("USER_LIKE",JSON.stringify(USER_LIKE));
    GlobalAjax("/api/Like/AddNewLike", "POST", new_like, SuccessAddNewLike, FailAddNewLike);
}
function SuccessAddNewLike(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_like = document.getElementById("like_recipe_" + data.id_recipe);
    btn_like.className = "fa fa-heart";
    btn_like.setAttribute("title", "הקלק על הסימן כדי להסיר לייק מהמתכון!.");
    btn_like.setAttribute("onClick", "RemoveRecipeLike_Btn(this.id)");
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
    sessionStorage.setItem("USER_LIKE",JSON.stringify(USER_LIKE));
    GlobalAjax("/api/Like/DeleteLike", "DELETE", _like, SuccessRemoveLike, FailRemoveLike);
}
function SuccessRemoveLike(data) {
    //שינוי תצוגת כפתור הלייק של המתכון
    var btn_like = document.getElementById("like_recipe_" + data.id_recipe);
    btn_like.className = "fa fa-heart-o";
    btn_like.setAttribute("title", "הקלק על הסימן כדי להוסיף לייק מהמתכון!.");
    btn_like.setAttribute("onClick", "AddRecipeLike_Btn(this.id)");
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