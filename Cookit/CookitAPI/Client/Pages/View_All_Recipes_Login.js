//*******************************************************************************************
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
var COUNT_NAME_RECIPES = 1;
var ARRY_RECIPES_DISPLAY = new Array();
var RECIPE_INGRIDIANTS = new Array();
var RECIPE_HOLIDAYS = new Array();
var RECIPE_FOOD_LABLES = new Array();
//*******************************************************************************************
// PAGE LOAD
//*******************************************************************************************
$(document).ready(function () {
    // להביא נתונים סטטים
      //GetUserLike();
    GetDifficultyLevel();
    
});

//*******************************************************************************************
// GET DIFFICULTY LEVEL
//*******************************************************************************************
// פונקציה מביאה את כל דרגות הקושי של מתכון
function GetDifficultyLevel() {
    GlobalAjax("/api/DifficultyLevel/GetAll", "GET", "", SuccessDifficultyLevel, FailDifficultyLevel);
}

function SuccessDifficultyLevel(arry_difficulty_level) {
    ARRY_DIFFICULTY_LEVEL = arry_difficulty_level;
    sessionStorage.setItem("ARRY_DIFFICULTY_LEVEL", JSON.stringify(arry_difficulty_level));
    ShowDifficultyLevel(ARRY_DIFFICULTY_LEVEL);

    GetDishType();
}

function FailDifficultyLevel() {
    console.log("שגיאה במשיכת נתוני רמות קושי מהשרת.");
    alert('שגיאה במשיכת נתוני רמות קושי מהשרת.');

    GetDishType();
}
//*******************************************************************************************
// Show Difficulty Level in search bar
//*******************************************************************************************
function ShowDifficultyLevel(_list_diff_level) {
    document.getElementById("search_difficulty_level_option").innerHTML = ""; // ניקוי לפי דחיפה
    for (var i = 0; i < _list_diff_level.length; i++) {
        AddDifficultylevel(_list_diff_level[i]);
    }
    document.getElementById("search_difficulty_level_option").reload;
}
function AddDifficultylevel(_diff_level) {
    //li
    var li = document.createElement('li');
    li.value = _diff_level.id;
    li.innerHTML = _diff_level.difficulty_level;
    //input
    var input = document.createElement('input');
    input.type = "checkbox";
    input.value = _diff_level.id;
    input.name = "difficulty_level_option";

    li.appendChild(input);

    document.getElementById("search_difficulty_level_option").appendChild(li);
}

//*******************************************************************************************
// GET DISH TYPE
//*******************************************************************************************
// פונקציה מביאה את כל סוגי המנות
function GetDishType() {
    GlobalAjax("/api/DishType", "GET", "", SuccessDishType, FailDishType);
}

function SuccessDishType(arry_dish_type) {
    ARRY_DISH_TYPE = arry_dish_type;
    sessionStorage.setItem("ARRY_DISH_TYPE", JSON.stringify(arry_dish_type));
    ShowDishType(ARRY_DISH_TYPE);

    GetDishCategory();
}
function FailDishType() {
    console.log("שגיאה במשיכת נתוני מאפייני מנה מהשרת.");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');

    GetDishCategory();
}

//*******************************************************************************************
// Show DishType in search bar
//*******************************************************************************************
function ShowDishType(_dish_type) {
    document.getElementById("search_dish_type_option").innerHTML = ""; // ניקוי לפי דחיפה
    for (var i = 0; i < _dish_type.length; i++) {
        AddDishType(_dish_type[i]);
    }
    document.getElementById("search_dish_type_option").reload;
}
function AddDishType(_diff_level) {
    //li
    var li = document.createElement('li');
    li.value = _diff_level.id;
    li.innerHTML = _diff_level.dish_type;
    //input
    var input = document.createElement('input');
    input.type = "checkbox";
    input.value = _diff_level.id;
    input.name = "dish_type_option";

    li.appendChild(input);

    document.getElementById("search_dish_type_option").appendChild(li);
}

//*******************************************************************************************
//  GET DISH CATEGORY
//*******************************************************************************************
// פונקציה מביאה את כל מאפייני המנות
function GetDishCategory() {
    GlobalAjax("/api/DishCategoty", "GET", "", SuccessDishCategory, FailDishCategory);
}

//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בהצלחה בשרת
function SuccessDishCategory(arry_dish_category) {
    ARRY_DISH_CATEGORY = arry_dish_category;
    sessionStorage.setItem("ARRY_DISH_CATEGORY", JSON.stringify(arry_dish_category));
    ShowDishCategory(ARRY_DISH_CATEGORY);

    GetFoodType();
}

//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בכישלון בשרת
function FailDishCategory() {
    console.log("שגיאה במשיכת נתוני מאפייני מנה מהשרת.");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');

    GetFoodType();
}

//*******************************************************************************************
//  ShowDishCategory in search bar
//*******************************************************************************************
function ShowDishCategory(_dish_category) {
    document.getElementById("search_dish_category_option").innerHTML = ""; // ניקוי לפי דחיפה
    for (var i = 0; i < _dish_category.length; i++) {
        AddDishCategory(_dish_category[i]);
    }
    document.getElementById("search_dish_category_option").reload;
}
function AddDishCategory(_diff_category) {
    //li
    var li = document.createElement('li');
    li.value = _diff_category.id;
    li.innerHTML = _diff_category.dish_category;
    //input
    var input = document.createElement('input');
    input.type = "checkbox";
    input.value = _diff_category.id;
    input.name = "kitchen_type_option";

    li.appendChild(input);

    document.getElementById("search_kitchen_type_option").appendChild(li);
}

//*******************************************************************************************
//GET FOOD TYPE
//*******************************************************************************************
// פונקציה מביאה את כל סוגי האוכל
function GetFoodType() {
    GlobalAjax("/api/FoodType/GetAll", "GET", "", SuccessFoodType, FailFoodType);
}

function SuccessFoodType(arry_food_type) {
    ARRY_FOOD_TYPE = arry_food_type;
    sessionStorage.setItem("ARRY_FOOD_TYPE", JSON.stringify(arry_food_type));
    ShowFoodType(ARRY_FOOD_TYPE);

    GetKitchenType();
}

function FailFoodType() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');

    GetKitchenType();
}
//*******************************************************************************************
//  ShowFoodType in search bar
//*******************************************************************************************
function ShowFoodType(_food_type) {
    document.getElementById("search_food_type_option").innerHTML = ""; // ניקוי לפי דחיפה
    for (var i = 0; i < _food_type.length; i++) {
        AddFoodType(_food_type[i]);
    }
    document.getElementById("search_food_type_option").reload;
}
function AddFoodType(_food_type) {
    //li
    var li = document.createElement('li');
    li.value = _food_type.id;
    li.innerHTML = _food_type.food_type;
    //input
    var input = document.createElement('input');
    input.type = "checkbox";
    input.value = _food_type.id;
    input.name = "kitchen_type_option";

    li.appendChild(input);

    document.getElementById("search_kitchen_type_option").appendChild(li);
}

//*******************************************************************************************
// GET KITCHEN TYPE
//*******************************************************************************************
// פונקציה מביאה את כל סוגי המטבחים
function GetKitchenType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני kitchenType
    GlobalAjax("/api/KitchenType", "GET", "", SuccessKitchenType, FailKitchenType);
}

function SuccessKitchenType(arry_kitchen_type) {
    ARRY_KITCHEN_TYPE = arry_kitchen_type;
    sessionStorage.setItem("ARRY_KITCHEN_TYPE", JSON.stringify(arry_kitchen_type));
    ShowKitchenType(ARRY_KITCHEN_TYPE);

    GetUserLike();
}

function FailKitchenType() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');

    GetUserLike();
}

//*******************************************************************************************
//  ShowKitchenType in search bar
//*******************************************************************************************
function ShowKitchenType(_kitchen_type) {
    document.getElementById("search_kitchen_type_option").innerHTML = ""; // ניקוי לפי דחיפה
    for (var i = 0; i < _kitchen_type.length; i++) {
        AddKitchenType(_kitchen_type[i]);
    }
    document.getElementById("search_kitchen_type_option").reload;
}
function AddKitchenType(_kitchen_type) {
    //li
    var li = document.createElement('li');
    li.value = _kitchen_type.id;
    li.innerHTML = _kitchen_type.kitchen_type;
    //input
    var input = document.createElement('input');
    input.type = "checkbox";
    input.value = _kitchen_type.id;
    input.name = "kitchen_type_option";

    li.appendChild(input);

    document.getElementById("search_kitchen_type_option").appendChild(li);
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
    COUNT_RECIPES = data.length;
    for (var i = 0; i < COUNT_RECIPES; i++) {
        ARRY_RECIPES_DISPLAY.push({
            recp_id: ARRY_RECIPES[i].recp_id,
            user_id: ARRY_RECIPES[i].user_id,
            recp_name: ARRY_RECIPES[i].recp_name,
            recp_dish_type: ARRY_RECIPES[i].recp_dish_type,
            recp_dish_category: ARRY_RECIPES[i].recp_dish_category,
            recp_food_type: ARRY_RECIPES[i].recp_food_type,
            recp_kitchen_type: ARRY_RECIPES[i].recp_kitchen_type,
            recp_level: ARRY_RECIPES[i].recp_level,
            recp_total_time: ARRY_RECIPES[i].recp_total_time,
            recp_work_time: ARRY_RECIPES[i].recp_work_time,
            recp_steps: ARRY_RECIPES[i].recp_steps,
            recp_owner_name: null,
            login_user_favorite: false,
            login_user_like: false,
            recp_count_like: null
        });
    }
        //הכנסת הלייקים
        for (var h = 0; h < ARRY_RECIPES_DISPLAY.length; h++) {
            var flag = false;
            for (var i = 0; i < USER_LIKE.length && (!flag); i++) {
                if (USER_LIKE[i].id_recipe == ARRY_RECIPES_DISPLAY[h].recp_id) {
                    flag = true;
                    ARRY_RECIPES_DISPLAY[h].login_user_like = true;
                }
            }            
        }   
        //הכנסת המועדפים
        for (var a = 0; a < ARRY_RECIPES_DISPLAY.length; a++) {
            var flag_a = false;
            for (var b = 0; b < USER_FAVORITE.length && (!flag_a); b++) {
                if (USER_FAVORITE[b].id_recipe == ARRY_RECIPES_DISPLAY[a].recp_id) {
                    ARRY_RECIPES_DISPLAY[a].login_user_favorite = true;
                    flag_a = true;
                }
            }
        }    
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
    document.getElementById("recipes_form").innerHTML = "";
    COUNT_NAME_RECIPES = 1;
    for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
        GetProfileName(ARRY_RECIPES_DISPLAY[i].user_id, ARRY_RECIPES_DISPLAY[i]);
    }
}

//*******************************************************************************************
// IS USER HAS PROFILE
//*******************************************************************************************
function GetProfileName(_user_id, _recipe) {
    GlobalAjax("/api/Profile/GetProfileByUserId/" + _user_id, "GET", "",
        function (data) { 
            console.log("שם פרופיל " + data.name);
            _recipe.recp_owner_name = data.name;
            CountLikeOfRecipe(_recipe, data.name);
},
        function () {
            console.log("לא מצא את הפרופיל, מחפפש אחר שם משתמש");
            GetFullUserNameById(_user_id, _recipe);
        });
}
//*******************************************************************************************
// Get Full User NameBy Id
//*******************************************************************************************
function GetFullUserNameById(_user_id, _recipe) {
    GlobalAjax("/api/User/GetUserFullNameByID/" + _user_id, "GET", "",
        function (data) {
            console.log("שם משתמש " + data);
            _recipe.recp_owner_name = data;
            CountLikeOfRecipe(_recipe, data);
        }, function () {
            console.log("בעיה במשיגת שם יוצר מתכון!");
            CountLikeOfRecipe(_recipe, null);
        });
}
//*******************************************************************************************
// Get number of like of recipe
//*******************************************************************************************
function CountLikeOfRecipe(_recipe,_name) {
    GlobalAjax("/api/Like/GetCountLikeOfRecipe/" + _recipe.recp_id, "GET", "",
        function (data) {
            console.log("מספר לייקים " + data);
            _recipe.recp_count_like = data;
            AddRecipe(_recipe); },
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
        document.getElementById("recipes_form").appendChild(row);
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
    for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
        if (ARRY_RECIPES_DISPLAY[i].recp_id == _recipe_id)
            ARRY_RECIPES_DISPLAY[i].login_user_favorite = true;
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
    for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
        if (ARRY_RECIPES_DISPLAY[i].recp_id == _recipe_id)
            ARRY_RECIPES_DISPLAY[i].login_user_favorite = false;
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
    for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
        if (ARRY_RECIPES_DISPLAY[i].recp_id == _recipe_id) {
            ARRY_RECIPES_DISPLAY[i].login_user_like = true;
            ARRY_RECIPES_DISPLAY[i].recp_count_like ++;
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
    for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
        if (ARRY_RECIPES_DISPLAY[i].recp_id == _recipe_id) {
            ARRY_RECIPES_DISPLAY[i].login_user_like = false;
            ARRY_RECIPES_DISPLAY[i].recp_count_like--;
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
//*******************************************************************************************
// SearchRecipeByName
//*******************************************************************************************
function SearchRecipeByName()
//מחפש מתכונים לפי שם
{
    var txt_search_name = document.getElementById("txt_search_recipe_by_name");
    if (txt_search_name.value == "") {
        ShowSelectedRecipes(ARRY_RECIPES_DISPLAY);
        alert("אנא הכנס שם מתכון לחיפוש!");
    }
    else {
        var search_recipes = GetRecipeByName(txt_search_name.value); // מקבל את רשימת הפרופילים התואמים
        if (search_recipes.length == 0)//אם אין אף תוצאת חיםוש מתאימה
        {
            document.getElementById("recipes_form").innerHTML = "";
            alert("אין מתכונים מתאימים לחיפוש!");
        }
        else
            ShowSelectedRecipes(search_recipes);
    }
}

//*******************************************************************************************
// GetRecipeByName
//*******************************************************************************************
function GetRecipeByName(recipe_name)
//מחזיר פרופיל לפי שם. יכול להיות רשימה של פרופילים
{
    var list_recipes = new Array();
    for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
        console.log(ARRY_RECIPES_DISPLAY[i].recp_name.indexOf(recipe_name));
        if (ARRY_RECIPES_DISPLAY[i].recp_name.indexOf(recipe_name) >= 0) // התאמה לכל או כל השם
            list_recipes.push(ARRY_RECIPES_DISPLAY[i]);
    }
    return list_recipes;
}

//*******************************************************************************************
// SearchRecipeByDifficultyLevel
//*******************************************************************************************
function SearchRecipeByDifficultyLevel()
//חיפוש מתכון לפי רמת קושי
{
    //מקבל את רשימת הערכים
    var diff_level = new Array();
    var list_diff_level = document.getElementsByName('difficulty_level_option');
    for (var j = 0; j < list_diff_level.length; j++) {
        if (list_diff_level[j].checked == true)
            diff_level.push(list_diff_level[j].value);
    }
    // אם לא נבחרה אף עיר
    if (diff_level.length == 0) 
    {
        ShowSelectedRecipes(ARRY_RECIPES_DISPLAY);
        alert("אנא בחר רמת קושי לחיפוש מתכון!");
    }
    else {
        var search_recipes = GetRecipesByDiificultyLevel(diff_level);
        // אם אין אף פרופיל מתאים לחחפוש
        if (search_recipes.length == 0) 
        {
            document.getElementById("recipes_form").innerHTML = "";
            alert("אין מתכונים מתאימים לחיפוש!");
        }
        else
            ShowSelectedRecipes(search_recipes);
    }
}

//*******************************************************************************************
// GetRecipesByDiificultyLevel
//*******************************************************************************************
function GetRecipesByDiificultyLevel(diff_level)
//מחזיר רשימת מתכונים לפי רמת קושי שנבחרה
{
    var list_recipes = new Array();
    for (var h = 0; h < diff_level.length; h++) {
        for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
            console.log(ARRY_RECIPES_DISPLAY[i].recp_level == diff_level[h]);
            if (ARRY_RECIPES_DISPLAY[i].recp_level == diff_level[h])
                list_recipes.push(ARRY_RECIPES_DISPLAY[i]);
        }
    }
    return list_recipes;
}

//*******************************************************************************************
// SearchRecipeByDishType
//*******************************************************************************************
function SearchRecipeByDishType()
//חיפוש מתכון לפי רמת קושי
{
    //מקבל את רשימת הערכים
    var dish_type = new Array();
    var list_dish_type = document.getElementsByName('dish_type_option');
    for (var j = 0; j < list_dish_type.length; j++) {
        if (list_dish_type[j].checked == true)
            dish_type.push(list_dish_type[j].value);
    }
    // אם לא נבחרה אף עיר
    if (dish_type.length == 0) {
        ShowSelectedRecipes(ARRY_RECIPES_DISPLAY);
        alert("אנא בחר סוג מנה לחיפוש מתכון!");
    }
    else {
        var search_recipes = GetRecipesByDishType(dish_type);
        // אם אין אף פרופיל מתאים לחחפוש
        if (search_recipes.length == 0) {
            document.getElementById("recipes_form").innerHTML = "";
            alert("אין מתכונים מתאימים לחיפוש!");
        }
        else
            ShowSelectedRecipes(search_recipes);
    }
}

//*******************************************************************************************
// GetRecipesByDiificultyLevel
//*******************************************************************************************
function GetRecipesByDishType(dish_type)
//מחזיר רשימת מתכונים לפי רמת קושי שנבחרה
{
    var list_recipes = new Array();
    for (var h = 0; h < dish_type.length; h++) {
        for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
            console.log(ARRY_RECIPES_DISPLAY[i].recp_dish_type == dish_type[h]);
            if (ARRY_RECIPES_DISPLAY[i].recp_dish_type == dish_type[h])
                list_recipes.push(ARRY_RECIPES_DISPLAY[i]);
        }
    }
    return list_recipes;
}

//*******************************************************************************************
// SearchRecipeByDishCategory
//*******************************************************************************************
function SearchRecipeByDishCategory()
//חיפוש מתכון לפי רמת קושי
{
    //מקבל את רשימת הערכים
    var dish_category = new Array();
    var list_dish_category = document.getElementsByName('dish_category_option');
    for (var j = 0; j < list_dish_category.length; j++) {
        if (list_dish_category[j].checked == true)
            dish_category.push(list_dish_category[j].value);
    }
    // אם לא נבחרה אף עיר
    if (dish_category.length == 0) {
        ShowSelectedRecipes(ARRY_RECIPES_DISPLAY);
        alert("אנא בחר מאפיין מנה לחיפוש מתכון!");
    }
    else {
        var search_recipes = GetRecipesByDishCategory(dish_category);
        // אם אין אף פרופיל מתאים לחחפוש
        if (search_recipes.length == 0) {
            document.getElementById("recipes_form").innerHTML = "";
            alert("אין מתכונים מתאימים לחיפוש!");
        }
        else
            ShowSelectedRecipes(search_recipes);
    }
}

//*******************************************************************************************
// GetRecipesByDiificultyLevel
//*******************************************************************************************
function GetRecipesByDishCategory(dish_category)
//מחזיר רשימת מתכונים לפי רמת קושי שנבחרה
{
    var list_recipes = new Array();
    for (var h = 0; h < dish_category.length; h++) {
        for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
            if (ARRY_RECIPES_DISPLAY[i].recp_dish_category == dish_category[h])
                list_recipes.push(ARRY_RECIPES_DISPLAY[i]);
        }
    }
    return list_recipes;
}

//*******************************************************************************************
// SearchRecipeByFoodType
//*******************************************************************************************
function SearchRecipeByFoodType()
{
    //מקבל את רשימת הערכים
    var food_type = new Array();
    var list_food_type = document.getElementsByName('food_type_option');
    for (var j = 0; j < list_food_type.length; j++) {
        if (list_food_type[j].checked == true)
            food_type.push(list_food_type[j].value);
    }
    // אם לא נבחרה אף עיר
    if (food_type.length == 0) {
        ShowSelectedRecipes(ARRY_RECIPES_DISPLAY);
        alert("אנא בחר סוג אוכל לחיפוש מתכון!");
    }
    else {
        var search_recipes = GetRecipesByFoodType(food_type);
        // אם אין אף פרופיל מתאים לחחפוש
        if (search_recipes.length == 0) {
            document.getElementById("recipes_form").innerHTML = "";
            alert("אין מתכונים מתאימים לחיפוש!");
        }
        else
            ShowSelectedRecipes(search_recipes);
    }
}

//*******************************************************************************************
// GetRecipesByFoodType
//*******************************************************************************************
function GetRecipesByFoodType(food_type)
//מחזיר רשימת מתכונים לפי רמת קושי שנבחרה
{
    var list_recipes = new Array();
    for (var h = 0; h < food_type.length; h++) {
        for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
            if (ARRY_RECIPES_DISPLAY[i].recp_food_type == food_type[h])
                list_recipes.push(ARRY_RECIPES_DISPLAY[i]);
        }
    }
    return list_recipes;
}

//*******************************************************************************************
// SearchRecipeByKitchenType
//*******************************************************************************************
function SearchRecipeByKitchenType() {
    //מקבל את רשימת הערכים
    var kitchen_type = new Array();
    var list_kitchen_type = document.getElementsByName('kitchen_type_option');
    for (var j = 0; j < list_kitchen_type.length; j++) {
        if (list_kitchen_type[j].checked == true)
            kitchen_type.push(list_kitchen_type[j].value);
    }
    // אם לא נבחרה אף עיר
    if (kitchen_type.length == 0) {
        ShowSelectedRecipes(ARRY_RECIPES_DISPLAY);
        alert("אנא בחר סגנון מטבח לחיפוש מתכון!");
    }
    else {
        var search_recipes = GetRecipesByKitchenType(kitchen_type);
        // אם אין אף פרופיל מתאים לחחפוש
        if (search_recipes.length == 0) {
            document.getElementById("recipes_form").innerHTML = "";
            alert("אין מתכונים מתאימים לחיפוש!");
        }
        else
            ShowSelectedRecipes(search_recipes);
    }
}

//*******************************************************************************************
// GetRecipesByKitchenType
//*******************************************************************************************
function GetRecipesByKitchenType(kitchen_type)
//מחזיר רשימת מתכונים לפי רמת קושי שנבחרה
{
    var list_recipes = new Array();
    for (var h = 0; h < kitchen_type.length; h++) {
        for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
            if (ARRY_RECIPES_DISPLAY[i].recp_kitchen_type == kitchen_type[h])
                list_recipes.push(ARRY_RECIPES_DISPLAY[i]);
        }
    }
    return list_recipes;
}
//*******************************************************************************************
// ShowSelectedRecipes
//*******************************************************************************************
function ShowSelectedRecipes(_list_recipes)
//מציג את הפרופילים הנבחרים
{
    document.getElementById("recipes_form").innerHTML = "";
   // תצוגת הפרופילים המבוקשים
    COUNT_NAME_RECIPES = 1;
    for (var i = 0; i < _list_recipes.length; i++) {
        AddRecipe(_list_recipes[i]);
    }
}