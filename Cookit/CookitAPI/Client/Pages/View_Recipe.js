//*******************************************************************************************
// globals variables
//*******************************************************************************************
//המתשמש המחובר
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

//מונה מספר מצרכים
var COUNT_INGRIDIANTS = 0;
var NAME_INGRIDIANTS = 0;

//פונקציות מתכון
var RECIPE_LIKE = null;
var RECIPE_FAVORITE = null;



//תז המתכון החדש
//var ID_RECIPE = null;
sessionStorage.setItem("RECIPE_NAME", JSON.stringify("עוגת שוקולד עשירה"));
var RECIPE_NAME = JSON.parse(sessionStorage.getItem("RECIPE_NAME"));
// פרטי המתכון
var RECIPE_INFORMATION;
var RECIPE_INFORMATION_DISPLAY;

var RECIPE_INGRIDIANTS = new Array();
var RECIPE_HOLIDAYS = new Array();
var RECIPE_FOOD_LABLES = new Array();
//*******************************************************************************************
// page load
//*******************************************************************************************
// הפונקציה קוראת בתחילת הקריאה לדף
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
    //להביא את נתוני המתכון המבוקש
    GetRecipeImformation();
    //מציג את נתוני המתכון רק כאשר מצליח לבקש מהשרת את כל הפרטים
});
//*******************************************************************************************
// INIT DATA INTO DROP DOWN LIST
//*******************************************************************************************
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function EnterData2DDList(arry, ddList) {
    for (i in arry) {
        $("#" + ddList).append(AddOption(arry[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption(item) {
    var values = Object.values(item);//Object.keys(item);
    var x = values[0];
    var y = values[1];
    return '<option value="' + x + '">' + y + '</option>';
}

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
    EnterData2DDList(arry_dish_type, "select_dish_type");
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
    EnterData2DDList(arry_dish_category, "select_dish_category");
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
    EnterData2DDList(arry_food_type, "select_food_type");
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
    EnterData2DDList(arry_kitchen_type, "select_kitchen_type");
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
    EnterData2DDList(arry_difficulty_level, "select_difficulty_level");
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
    EnterData2DDList(arry_ingridiants, "select_ingridiant_name_1");
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
    EnterData2DDList(arry_Mesurments, "select_mesurment_1");
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
    EnterData2DDList(arry_Holidays, "select_holiday");
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
    EnterData2DDList(arry_FoodLabe, "select_food_lable");
}

function FailFoodLable() {
    console.log("שגיאה במשיכת נתוני תווית מהשרת.");
    alert('שגיאה במשיכת נתוני תוויות מהשרת.');
}

//*******************************************************************************************
// GET RECIPE INFORMATION
//*******************************************************************************************
function GetRecipeImformation()
//מביא את נתוני המתכון של המתשמש מהשרת
{
    GlobalAjax("/api/Recipe/GetRecpByUserIdAndRecpName/" + LOGIN_USER.id + "/" + RECIPE_NAME, "GET", "", SuccessGetRecipeImformation, FailGetRecipeImformation);
}

function SuccessGetRecipeImformation(data) {
    console.log("משיכת נתוני מתכון בוצע בהצלחה!.");
    sessionStorage.setItem("Current_Recipe", JSON.stringify(data));
    RECIPE_INFORMATION = data;//JSON.stringify(data);
    sessionStorage.setItem("RECIPE_INFORMATION", RECIPE_INFORMATION);
    // מביא את המצרכים של המתכון
    GetRecipeIgridiants();
}

function FailGetRecipeImformation(data) {
    console.log("error! can't get recipe information.");
    console.log(data);
    alert("שגיאה במשיכת נתוני מתכון!, אנא נסה שנית מאוחד יותר.");
}

//*******************************************************************************************
// GET RECIPE INGRIDINATS
//*******************************************************************************************
function GetRecipeIgridiants()
//מביא את המצרכים של המתכון המבוקש
{
    GlobalAjax("/api/IngridiantForRecp/GetIngridiantsByRecpId/" + RECIPE_INFORMATION.recp_id, "GET", "", SuccessRecipeIgridiants, FailRecipeIgridiants);
}

function SuccessRecipeIgridiants(data) {
    console.log("משיכת נתוני מצרכי מתכון בוצע בהצלחה!.");
    sessionStorage.setItem("RECIPE_INGRIDIANTS", JSON.stringify(data));
    RECIPE_INGRIDIANTS = data;
    COUNT_INGRIDIANTS = RECIPE_INGRIDIANTS.length;
    console.log(COUNT_INGRIDIANTS);
   
    //מביא את החגים של המתכון
    GetRecipeHolidays();
}

function FailRecipeIgridiants(data) {
    console.log("error! can't get ingridiants recipe information.");
    console.log(data);
    alert("שגיאה במשיכת נתוני מצרכי מתכון!, אנא נסה שנית מאוחד יותר.");
}
//*******************************************************************************************
// GET RECIPE HOLIDAYS
//*******************************************************************************************

function GetRecipeHolidays()
//מביא את המצרכים של המתכון המבוקש
{
    GlobalAjax("/api/HolidaysForRecpController/GetHolidaysByRecpId/" + RECIPE_INFORMATION.recp_id, "GET", "", SuccessGetRecipeHolidays, FailGetRecipeHolidays);
    }

function SuccessGetRecipeHolidays(data) {
    console.log("משיכת נתוני חגי מתכון בוצע בהצלחה!.");
    sessionStorage.setItem("RECIPE_HOLIDAYS", JSON.stringify(data));
    RECIPE_HOLIDAYS = data;
    //מביא את התוויות של המתכון
    GetRecipeFoodLables();
}

function FailGetRecipeHolidays(data) {
    console.log("error! can't get holidays recipe information.");
    console.log(data);
    alert("שגיאה במשיכת חגי מתכון!, אנא נסה שנית מאוחד יותר.");
}
//*******************************************************************************************
// GET RECIPE FOOD LABLES
//*******************************************************************************************

function GetRecipeFoodLables()
//מביא את המצרכים של המתכון המבוקש
{
    GlobalAjax("/api/FoodLabelsForRecp/GetFoodLablesByRecpId/" + RECIPE_INFORMATION.recp_id, "GET", "", SuccessGetRecipeFoodLables, FailGetRecipeFoodLables);
}

function SuccessGetRecipeFoodLables(data) {
    console.log("משיכת נתוני תוויות מתכון בוצע בהצלחה!.");
    sessionStorage.setItem("RECIPE_FOOD_LABLES", JSON.stringify(data));
    RECIPE_FOOD_LABLES = data;
    // להציג פרטי מתכון
    ViewRecipeInformation();
}

function FailGetRecipeFoodLables(data) {
    console.log("error! can't get food lables recipe information.");
    console.log(data);
    alert("שגיאה במשיכת תוויות מתכון!, אנא נסה שנית מאוחד יותר.");
}

//*******************************************************************************************
// CONVERT ID 2 VALUE
//*******************************************************************************************
function ConvertId2Value(_list,_id)
//ממיר את התז של המידע לערכי מחרוזת
{
    for (var x in _list) {
        var values = Object.values(_list[x]);//Object.keys(item);
        var id = values[0];//id
        var val = values[1]; // value
        if (id == _id)
            return val;
    }
    return null;
}

function ConvertId2MultipelValue(_list, _id_arry,_id)
//מטפל בחגים ותוויות
{
    var val = ConvertId2Value(_list, _id_arry[0][_id]);
    for (var i = 1; i < _id_arry.length; i++) {
        val = val + ", " + ConvertId2Value(_list, _id_arry[i][_id]);
    }
    return val;
}

//*******************************************************************************************
// VIEW RECIPE INFORMATION
//*******************************************************************************************
function GetRecipeInforamtionForDisplay()
//עובר על המתכון וממיר את התז לערכים
{
    RECIPE_INFORMATION_DISPLAY = {
        recp_name: RECIPE_INFORMATION.recp_name,
        recp_dish_type: ConvertId2Value(ARRY_DISH_TYPE, RECIPE_INFORMATION.recp_dish_type),
        recp_dish_category: ConvertId2Value(ARRY_DISH_CATEGORY, RECIPE_INFORMATION.recp_dish_category),
        recp_food_type: ConvertId2Value(ARRY_FOOD_TYPE, RECIPE_INFORMATION.recp_food_type),
        recp_kitchen_type: ConvertId2Value(ARRY_KITCHEN_TYPE, RECIPE_INFORMATION.recp_kitchen_type),
        recp_level: ConvertId2Value(ARRY_DIFFICULTY_LEVEL, RECIPE_INFORMATION.recp_level),
        recp_total_time: RECIPE_INFORMATION.recp_total_time,
        recp_work_time: RECIPE_INFORMATION.recp_work_time,
        recp_steps: RECIPE_INFORMATION.recp_steps,
        recp_holidays: ConvertId2MultipelValue(ARRY_HOLIDAYS, RECIPE_HOLIDAYS,"id_holiday"),
        recp_food_labels: ConvertId2MultipelValue(ARRY_FOOD_LABLE, RECIPE_FOOD_LABLES,"id_food_lable")
    };
}

function ViewRecipeInformation()
//מציג את המידע של המתכון
{
    GetRecipeInforamtionForDisplay();

    document.getElementById("recipe_name").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_name;
    document.getElementById("recipe_difficulty_level").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_level;
    document.getElementById("recipe_total_time").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_total_time;
    document.getElementById("recipe_work_time").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_work_time;
    document.getElementById("recipe_dish_type").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_dish_type;
    document.getElementById("recipe_dish_category").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_dish_category;
    document.getElementById("recipe_food_type").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_food_type;
    document.getElementById("recipe_kitchen_type").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_kitchen_type;
    document.getElementById("recipe_preparation_steps").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_steps;
    document.getElementById("recipe_holidays").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_holidays;
    document.getElementById("recipe_food_labels").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_food_labels;

    //צריך להציג את כל המצרכים
    ViewIngridiants();
}
//*******************************************************************************************
// VIEW RECIPE INGRIDIANTS
//*******************************************************************************************
function ViewIngridiants()//מציג את נתוני המצרכים
{
    for (var i = 0; i < COUNT_INGRIDIANTS; i++) {//מוסיף מצרכים כמספר המצרכים במתגון
        var _ing = {
            id_ingridiants: ConvertId2Value(ARRY_INGRIDIANTS, RECIPE_INGRIDIANTS[i].id_ingridiants),
            id_mesurment: ConvertId2Value(ARRY_MESURMENTS, RECIPE_INGRIDIANTS[i].id_mesurment),
            amount:RECIPE_INGRIDIANTS[i].amount
        };
        AddIngridinats(_ing);//מוסיף שורות למצרכים כמספר המצרכים שבמתכון
    }

    //מציג את הנתוני הפונקציות של המתכון
    GetLike();
}

function AddIngridinats(_ing)
//מוסיף שורות למצרכים כמספר המצרכים שבמתכון
{
    NAME_INGRIDIANTS = NAME_INGRIDIANTS + 1;
    var new_ingridiant = document.createElement('div');
    new_ingridiant.id = "ingridiant_" + NAME_INGRIDIANTS;
    new_ingridiant.className = "form-row text2rigth";
    new_ingridiant.innerHTML = _ing.id_mesurment+ " " + _ing.id_ingridiants  + " " +_ing.amount ;
    if (NAME_INGRIDIANTS % 2 == 0)
        new_ingridiant.style["background-color"] = "#cccccc";
    /*
    var span_ingridiant = document.createElement("span");
    span_ingridiant.innerHTML = _ing.amount+" "+_ing.id_mesurment + " " + _ing.id_ingridiants;
    span_ingridiant.className = "text2rigth";

    new_ingridiant.appendChild(span_ingridiant);
    */
    document.getElementById("recipe_ingridiants").appendChild(new_ingridiant);      
}

//*******************************************************************************************
// GET AND SHOW LIKE
//*******************************************************************************************
function GetLike() {
    var user_id = RECIPE_INFORMATION.user_id;
    var recipe_id = RECIPE_INFORMATION.recp_id;
    GlobalAjax("/api/Like/GetLikeByUserIdAndRecipeId/"+ user_id + "/" + recipe_id, "GET", "", SuccessGetLikeByUserIdAndRecipeId, FailAddGetLikeByUserIdAndRecipeId);
}

function SuccessGetLikeByUserIdAndRecipeId(data) {
    RECIPE_LIKE = data;
    ToggelLikeIcon();
    //מביא את נתוני השמירת מתכון כמועדף
    GetFavorite();
}

function FailAddGetLikeByUserIdAndRecipeId() {
    console.log("אין לייק של מתשמ");
}
//*******************************************************************************************
// ADD REMOVE LIKE
//*******************************************************************************************
function AddRemoveLike()
//הוספת /הסרת לייק למתכון
{
    if (RECIPE_LIKE == null) //הוספת לייק בפעם הראשונה
        AddNewLike();
    else// חידוש לייק מבוטל או ביטול לייק קיים
        UpdateExsistLike();
}

//*******************************************************************************************
// ADD NEW LIKE
//*******************************************************************************************
function AddNewLike()
//הוספת לייק חדש
{
    var new_like = {
        id_recipe : RECIPE_INFORMATION.recp_id,
        id_user: RECIPE_INFORMATION.user_id,
        status: true,
        date_like: new Date()//Date.getDate()
    };
    RECIPE_LIKE = new_like;
    GlobalAjax("/api/Like/AddNewLike", "POST", new_like,SuccessAddNewLike, FailAddNewLike);
}
function SuccessAddNewLike(data) {
    console.log("הלייק נוסף בהצלחה");
    alert("הלייק התווסף למתכון בהצלחה!.");
    ToggelLikeIcon();
}

function FailAddNewLike() {
    console.log("הוספת לייק נכשלה");
    alert("הוספת לייק נכשלה");
}

//*******************************************************************************************
// UPDATE EXSIST LIKE
//*******************************************************************************************
function UpdateExsistLike()
//ביטול לייק קיים או חידש לייק מבוטל
{
    if (RECIPE_LIKE.status == true)
        RECIPE_LIKE.status = false;
    else
        RECIPE_LIKE.status = true;
    RECIPE_LIKE.date_like = new Date();
    GlobalAjax("/api/Like/UpdateLike", "PUT", RECIPE_LIKE, SuccessUpdateExsistLike, FailUpdateExsistLike);
}

function SuccessUpdateExsistLike() {
    console.log("עדכון לייק בוצע בהצלחה!.");
    ToggelLikeIcon();
    if (RECIPE_LIKE.status == true)//אם יש לייק
        alert("לייק התווסף!.");
    else
        alert("לייק בוטל!.");
}

function FailUpdateExsistLike() {
    console.log("עדכון לייק נכשלה");
    alert("עדכון לייק נכשלה");
}

//*******************************************************************************************
// TOGGEL LIKE ICON
//*******************************************************************************************
function ToggelLikeIcon()
//משנה את סימון איקון הלייק לפי הסטאוטס שלו
{
    var like_icon = $("#recipe_like");
    if (RECIPE_LIKE.status == true)//אם יש לייק
    {
        console.log("יש לייק");
        //alert("לייק התווסף!.");
        if (like_icon.hasClass("fa-heart-o"))
            like_icon.removeClass("fa-heart-o");
        like_icon.addClass("fa-heart");
    }
    else {
        console.log("לייק מבוטל");
        //alert("לייק בוטל!.");
        if (like_icon.hasClass("fa-heart"))
            like_icon.removeClass("fa-heart");
        like_icon.addClass("fa-heart-o");
    }
}

//*******************************************************************************************
// GET AND SHOW FAVORITE RECIPE
//*******************************************************************************************
function GetFavorite() {
    var user_id = RECIPE_INFORMATION.user_id;
    var recipe_id = RECIPE_INFORMATION.recp_id;
    GlobalAjax("/api/Favorite/GetFavoriteByUserIdAndRecipeId/" + user_id + "/" + recipe_id, "GET", "", SuccessGetFavorite, FailGetFavorite);
}

function SuccessGetFavorite(data) {
    RECIPE_FAVORITE = data;
    ToggelFavoriteIcon();
    //מביא את נתוני השמירת מתכון כמועדף
}

function FailGetFavorite() {
    console.log("מתכון זה לא שמור כמועדף אצל המשתמש");
}
//*******************************************************************************************
// ADD REMOVE FAVORITE RECIPE
//*******************************************************************************************
function AddRemoveFavoriteRecipe()
//הוספת /הסרת מתכון למועדפים
{
    if (RECIPE_FAVORITE == null) //הוספה למועדפים בפעם הראשונה
        AddNewFavorite();
    else// חידוש למועדפים מבוטל או ביטול כמועדף קיים
        UpdateExsistFavorite();
}

//*******************************************************************************************
// ADD NEW FAVORITE
//*******************************************************************************************
function AddNewFavorite()
//הוספת כמועדף חדש
{
    var new_favorite = {
        id_recipe: RECIPE_INFORMATION.recp_id,
        id_user: RECIPE_INFORMATION.user_id,
        status: true
    };
    RECIPE_FAVORITE = new_favorite;
    GlobalAjax("/api/Favorite/AddNewFavorite", "POST", new_favorite, SuccessAddNewFavorite, FailAddNewFavorite);
}
function SuccessAddNewFavorite(data) {
    console.log("המתכון נוסף למועדפים בהצלחה");
    alert("המתכון נוסף למועדפים בהצלחה");
    ToggelFavoriteIcon();
}

function FailAddNewFavorite() {
    console.log("הוספת לייק נכשלה");
    alert("הוספת לייק נכשלה");
}

//*******************************************************************************************
// UPDATE EXSIST FAVORITE
//*******************************************************************************************
function UpdateExsistFavorite()
//ביטול לייק קיים או חידש לייק מבוטל
{
    if (RECIPE_FAVORITE.status == true)
        RECIPE_FAVORITE.status = false;
    else
        RECIPE_FAVORITE.status = true;
    GlobalAjax("/api/Favorite/UpdateFavorite", "PUT", RECIPE_FAVORITE, SuccessUpdateExsistFavorite, FailUpdateExsistFavorite);
}

function SuccessUpdateExsistFavorite() {
    console.log("עדכון מתכון כמועדף בוצע בהצלחה!.");
    ToggelFavoriteIcon();
    if (RECIPE_FAVORITE.status == true)//אם יש 
                alert("המתכון נשמר שמעודף!.");
else
                alert("המתכון הוסר מהמועדפים!.");
}

function FailUpdateExsistFavorite() {
    console.log("עדכון מתכון כמועדף נכשלה");
    alert("עדכון מתכון כמועדף נכשלה");
}

//*******************************************************************************************
// TOGGEL FAVORITE ICON
//*******************************************************************************************
function ToggelFavoriteIcon()
//משנה את סימון איקון הלייק לפי הסטאוטס שלו
{
    var favorite_icon = $("#recipe_favorite");
    if (RECIPE_FAVORITE.status == true)//אם יש 
    {
        console.log("שמור כמועדף");
        //alert("המתכון נשמר שמעודף!.");
        if (favorite_icon.hasClass("fa-bookmark-o"))
            favorite_icon.removeClass("fa-bookmark-o");
        favorite_icon.addClass("fa-bookmark");
    }
    else {
        console.log("כמועדף מבוטל");
        //alert("המתכון הוסר מהמועדפים!.");
        if (favorite_icon.hasClass("fa-bookmark"))
            favorite_icon.removeClass("fa-bookmark");
        favorite_icon.addClass("fa-bookmark-o");
    }
}