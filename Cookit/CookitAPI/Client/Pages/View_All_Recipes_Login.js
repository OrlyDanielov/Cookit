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
var RECIPE_LIKE = null;
var RECIPE_FAVORITE = null;
var RECIPE_COMMENTS = null;
var COUNT_COMMENT = 0;
var NEW_USER_COMMENT = null;
var RECIPE_DIFF_LEVEL_RATING = null;
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
    GetDishType();
    GetDishCategory();
    GetFoodType();
    GetKitchenType();
    GetDifficultyLevel();
    GetIngridiants();
    GetMesurments();
    GetHoliday();
    GetFoodLable();
    //מביא את כל המתכונים
    GetAllRecipes();
});

//*******************************************************************************************
// GET DISH TYPE
//*******************************************************************************************
// פונקציה מביאה את כל סוגי המנות
function GetDishType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני dishType
    GlobalAjax("/api/DishType", "GET", "", SuccessDishType, FailDishType);
}

function SuccessDishType(arry_dish_type) {
    ARRY_DISH_TYPE = arry_dish_type;
    sessionStorage.setItem("Dish_Type", JSON.stringify(arry_dish_type));
}

function FailDishType() {
    console.log("שגיאה במשיכת נתוני מאפייני מנה מהשרת.");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');
}
//*******************************************************************************************
//  GET DISH CATEGORY
//*******************************************************************************************
// פונקציה מביאה את כל מאפייני המנות
function GetDishCategory() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני dishCategoty
    GlobalAjax("/api/DishCategoty", "GET", "", SuccessDishCategory, FailDishCategory);
}

//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בהצלחה בשרת
function SuccessDishCategory(arry_dish_category) {
    ARRY_DISH_CATEGORY = arry_dish_category;
    sessionStorage.setItem("Dish_category", JSON.stringify(arry_dish_category));
}

//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בכישלון בשרת
function FailDishCategory() {
    console.log("שגיאה במשיכת נתוני מאפייני מנה מהשרת.");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');
}
//*******************************************************************************************
//GET FOOD TYPE
//*******************************************************************************************
// פונקציה מביאה את כל סוגי האוכל
function GetFoodType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני foodType
    GlobalAjax("/api/FoodType/GetAll", "GET", "", SuccessFoodType, FailFoodType);
}

function SuccessFoodType(arry_food_type) {
    ARRY_FOOD_TYPE = arry_food_type;
    sessionStorage.setItem("Food_Type", JSON.stringify(arry_food_type));
}

function FailFoodType() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
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
    sessionStorage.setItem("Kitchen_Type", JSON.stringify(arry_kitchen_type));
}

function FailKitchenType() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
}
//*******************************************************************************************
// GET DIFFICULTY LEVEL
//*******************************************************************************************
// פונקציה מביאה את כל דרגות הקושי של מתכון
function GetDifficultyLevel() {
    GlobalAjax("/api/DifficultyLevel/GetAll", "GET", "", SuccessDifficultyLevel, FailDifficultyLevel);
}

function SuccessDifficultyLevel(arry_difficulty_level) {
    ARRY_DIFFICULTY_LEVEL = arry_difficulty_level;
    sessionStorage.setItem("Difficulty_Level", JSON.stringify(arry_difficulty_level));
}

function FailDifficultyLevel() {
    console.log("שגיאה במשיכת נתוני רמות קושי מהשרת.");
    alert('שגיאה במשיכת נתוני רמות קושי מהשרת.');
}
//*******************************************************************************************
// GET INGRIDIANTS
//*******************************************************************************************
// פונקציה מביאה את כל המצרכים של מתכון
function GetIngridiants() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני Ingridiants
    GlobalAjax("/api/Ingridiants", "GET", "", SuccessIngridiants, FailIngridiants);
}

function SuccessIngridiants(arry_ingridiants) {
    ARRY_INGRIDIANTS = arry_ingridiants;
    sessionStorage.setItem("Ingridiants", JSON.stringify(arry_ingridiants));
}

function FailIngridiants() {
    console.log("שגיאה במשיכת נתוני מצרכים מהשרת.");
    alert('שגיאה במשיכת נתוני מצרכים מהשרת.');
}
//*******************************************************************************************
//  GET MESURMENTS
//*******************************************************************************************

// פונקציה מביאה את כל אופני המדידה של מתכון
function GetMesurments() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני Mesurments
    GlobalAjax("/api/Mesurments", "GET", "", SuccessMesurments, FailMesurments);
}

function SuccessMesurments(arry_Mesurments) {
    ARRY_MESURMENTS = arry_Mesurments;
    sessionStorage.setItem("Mesurments", JSON.stringify(arry_Mesurments));
}

function FailMesurments() {
    console.log("שגיאה במשיכת נתוני אופן המדידה מהשרת.");
    alert('שגיאה במשיכת נתוני אופן המדידה מהשרת.');
}
//*******************************************************************************************
//  GET HOLIDAY
//*******************************************************************************************
function GetHoliday() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני Mesurments
    GlobalAjax("/api/Holiday/GetAll", "GET", "", SuccessHoliday, FailHoliday);
}

function SuccessHoliday(arry_Holidays) {
    ARRY_HOLIDAYS = arry_Holidays;
    sessionStorage.setItem("Holidays", JSON.stringify(arry_Holidays));
}

function FailHoliday() {
    console.log("שגיאה במשיכת נתוני חגים מהשרת.");
    alert('שגיאה במשיכת נתוני חגים מהשרת.');
}

//*******************************************************************************************
//  GET FOOD LABLE
//*******************************************************************************************
function GetFoodLable() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני Mesurments
    GlobalAjax("/api/FoodLable/GetAll", "GET", "", SuccessFoodLable, FailFoodLable);
}

function SuccessFoodLable(arry_FoodLabe) {
    ARRY_FOOD_LABLE = arry_FoodLabe;
    sessionStorage.setItem("Food_Lables", JSON.stringify(arry_FoodLabe));
}

function FailFoodLable() {
    console.log("שגיאה במשיכת נתוני תווית מהשרת.");
    alert('שגיאה במשיכת נתוני תוויות מהשרת.');
}

//*******************************************************************************************
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
    recipe_div.className = "card profile-card-3  ";
    recipe_div.style["backgroundColor"] = "white";
    recipe_div.style["padding"] = "10px";
    recipe_div.setAttribute("data-toggle", "tooltip");
    recipe_div.setAttribute("title", "הקלק על התמונה כדי לצפות במתכון!");
    //recipe img div
    var recipe_img_div = document.createElement("div");
    recipe_img_div.className = "profile-thumb-block ";
    //recipe img
    var recipe_img = document.createElement("img");
    recipe_img.id = "img_recipe_" + _recipe.recp_id;
    recipe_img.className = "profile shrink";
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
    recipe_name_div.className = "card-content";
    //recipe name
    var recipe_name = document.createElement("span");
    recipe_name.style["display"] = "block";
    recipe_name.style["font-weight"] = "bold";
    recipe_name.innerHTML = _recipe.recp_name;
    recipe_name.className = "thicker";
    recipe_name_div.appendChild(recipe_name);
    /*
    var recipe_name = document.createElement("h4");
    recipe_name.innerHTML = _recipe.recp_name;
    recipe_name_div.appendChild(recipe_name);
    recipe_div.appendChild(recipe_name_div);
    */
    //recipe user\profile 
    var recipe_owner = document.createElement("span");
    recipe_owner.innerHTML = _name;
    recipe_owner.style["display"] = "block";
    recipe_name_div.appendChild(recipe_owner);

    recipe_div.appendChild(recipe_name_div);
//לייק
    //מועדפים
    /*
    //profile city and region
    var prof_city = document.createElement("span");
    prof_city.innerHTML = ConvertId2Value(ARRY_CITY, _profile.id_city);
    prof_city.style["display"] = "block";
    recipe_name_div.appendChild(prof_city);
    */
    /*
    //FOLLOW BUTTON
    var prof_follow_btn = document.createElement("input");
    prof_follow_btn.type = "button";
    prof_follow_btn.id = "btn_follow_" + _recipe.id;
    if (IfFollowThisProfile(_recipe.id))//אם פרופיל זה במעקב
    {
        prof_follow_btn.value = "הסר מעקב";//סטאטוס מעקב
        prof_follow_btn.setAttribute("onClick", "RemoveFollowProfile_Btn(this.id)");
    }
    else {//לא במעקב
        prof_follow_btn.value = "עקוב";//סטאטוס מעקב
        prof_follow_btn.setAttribute("onClick", "AddFollowProfile_Btn(this.id)");
    }
    prof_follow_btn.className = "btn btn-group";
    recipe_name_div.appendChild(prof_follow_btn);

    recipe_div.appendChild(recipe_name_div);
    */
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