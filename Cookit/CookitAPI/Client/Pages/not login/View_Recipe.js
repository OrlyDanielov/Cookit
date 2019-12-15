//*******************************************************************************************
// globals variables
//*******************************************************************************************
//פונקציות מתכון
var RECIPE_LIKE = null;
var RECIPE_COMMENTS = null;
var COUNT_COMMENT = 0;
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
//מונה מספר שלבים באופן ההכנה
var COUNT_STEPS = 1;
var NAME_STEPS = 1;
//המתכון המבוקש
var ID_RECPIE_VIEW = JSON.parse(sessionStorage.getItem("ID_RECPIE_VIEW"));
// פרטי המתכון
var RECIPE_INFORMATION;
var RECIPE_INFORMATION_DISPLAY;
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
    if (ID_RECPIE_VIEW == null)
        alert("שגיאה במכישת נתוני המתכון המבוקש!.");
    else
        GlobalAjax("/api/Recipe/GetRecpByUserIdRecipe/" + ID_RECPIE_VIEW, "GET", "", SuccessGetRecipeImformation, FailGetRecipeImformation);
}

function SuccessGetRecipeImformation(data) {
    console.log("משיכת נתוני מתכון בוצע בהצלחה!.");
    sessionStorage.setItem("Current_Recipe", JSON.stringify(data));
    RECIPE_INFORMATION = data;
    sessionStorage.setItem("RECIPE_INFORMATION", JSON.stringify(RECIPE_INFORMATION));
    // מביא את המצרכים של המתכון
    GetRecipeIgridiants();
}

function FailGetRecipeImformation(data) {
    console.log("error! can't get recipe information.");
    console.log(data);
    alert("שגיאה במשיכת נתוני מתכון!, אנא נסה שנית מאוחד יותר.");
    // מביא את המצרכים של המתכון
    GetRecipeIgridiants();
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
    //מביא את החגים של המתכון
    GetRecipeHolidays();
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
    //מביא את התוויות של המתכון
    GetRecipeFoodLables();
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
    //מביא את הלייק למתכון 
    GetRecipeCountLike();
}

function FailGetRecipeFoodLables(data) {
    console.log("error! can't get food lables recipe information.");
    console.log(data);
    alert("שגיאה במשיכת תוויות מתכון!, אנא נסה שנית מאוחד יותר.");
    //מביא את הלייק למתכון 
    GetRecipeCountLike();
}
//*******************************************************************************************
// CONVERT ID 2 VALUE
//*******************************************************************************************
function ConvertId2Value(_list, _id)
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

function ConvertId2MultipelValue(_list, _id_arry, _id)
//מטפל בחגים ותוויות
{
    var val = ConvertId2Value(_list, _id_arry[0][_id]);
    for (var i = 1; i < _id_arry.length; i++) {
        val = val + ", " + ConvertId2Value(_list, _id_arry[i][_id]);
    }
    return val;
}

//*******************************************************************************************
// IS USER HAS PROFILE
//*******************************************************************************************
function GetProfileName() {
    var _user_id = RECIPE_INFORMATION.user_id;
    var _recipe = RECIPE_INFORMATION.recp_id;
    GlobalAjax("/api/Profile/GetProfileByUserId/" + _user_id, "GET", "", function (data) { console.log("שם פרופיל " + data.name); ViewRecipeInformation(data.name); }, function () { console.log("לא מצא את הפרופיל, מחפפש אחר שם משתמש"); GetFullUserNameById(); });
}
//*******************************************************************************************
// Get Full User NameBy Id
//*******************************************************************************************
function GetFullUserNameById() {
    var _user_id = RECIPE_INFORMATION.user_id;
    var _recipe = RECIPE_INFORMATION.recp_id;
    GlobalAjax("/api/User/GetUserFullNameByID/" + _user_id, "GET", "", function (data) { console.log("שם משתמש " + data); ViewRecipeInformation(data); }, function () { console.log("בעיה במשיגת שם יוצר מתכון!"); });
}

//*******************************************************************************************
// VIEW RECIPE INFORMATION
//*******************************************************************************************
function GetRecipeInforamtionForDisplay()
//עובר על המתכון וממיר את התז לערכים
{
    //זמן עבודה
    var work_time_arry = RECIPE_INFORMATION.recp_work_time.split(":");
    var work_time = "";
    if (work_time_arry[0] != 0 || work_time_arry[0] != 00)
        work_time += work_time_arry[0] + "שעות ";
    if (work_time_arry[1] != 0 || work_time_arry[1] != 00)
        work_time += work_time_arry[1] + "דקות ";   
    //זמן כולל
    var total_time_arry = RECIPE_INFORMATION.recp_total_time.split(":");
    var total_time = "";
    if (total_time_arry[0] != 0 || total_time_arry[0] != 00)
        total_time += total_time_arry[0] + "שעות ";
    if (total_time_arry[1] != 0 || total_time_arry[1] != 00)
        total_time += total_time_arry[1] + "דקות ";
  
    RECIPE_INFORMATION_DISPLAY = {
        recp_name: RECIPE_INFORMATION.recp_name,
        recp_dish_type: ConvertId2Value(ARRY_DISH_TYPE, RECIPE_INFORMATION.recp_dish_type),
        recp_dish_category: ConvertId2Value(ARRY_DISH_CATEGORY, RECIPE_INFORMATION.recp_dish_category),
        recp_food_type: ConvertId2Value(ARRY_FOOD_TYPE, RECIPE_INFORMATION.recp_food_type),
        recp_kitchen_type: ConvertId2Value(ARRY_KITCHEN_TYPE, RECIPE_INFORMATION.recp_kitchen_type),
        recp_level: ConvertId2Value(ARRY_DIFFICULTY_LEVEL, RECIPE_INFORMATION.recp_level),
        recp_total_time: total_time,//RECIPE_INFORMATION.recp_total_time,
        recp_work_time: work_time,//RECIPE_INFORMATION.recp_work_time,
        recp_steps: RECIPE_INFORMATION.recp_steps,
        recp_holidays: ConvertId2MultipelValue(ARRY_HOLIDAYS, RECIPE_HOLIDAYS, "id_holiday"),
        recp_food_labels: ConvertId2MultipelValue(ARRY_FOOD_LABLE, RECIPE_FOOD_LABLES, "id_food_lable"),
            img_path: RECIPE_INFORMATION.img_path,
        img_name: RECIPE_INFORMATION.img_name
    };
}

function ViewRecipeInformation(_recipe_owner_name)
//מציג את המידע של המתכון
{
    GetRecipeInforamtionForDisplay();

    document.getElementById("recipe_name").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_name;
    document.getElementById("recipe_owner").innerHTML = _recipe_owner_name;
    document.getElementById("recipe_difficulty_level").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_level;
    document.getElementById("recipe_total_time").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_total_time;
    document.getElementById("recipe_work_time").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_work_time;
    document.getElementById("recipe_dish_type").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_dish_type;
    document.getElementById("recipe_dish_category").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_dish_category;
    document.getElementById("recipe_food_type").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_food_type;
    document.getElementById("recipe_kitchen_type").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_kitchen_type;
    document.getElementById("recipe_holidays").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_holidays;
    document.getElementById("recipe_food_labels").innerHTML = RECIPE_INFORMATION_DISPLAY.recp_food_labels;
    var recp_img_path = RECIPE_INFORMATION.img_path;
    $("#recipe_picture").attr("src", recp_img_path); //מציג את שלבי ההכנה
    ViewPreparationSteps();
    //צריך להציג את כל המצרכים
    ViewIngridiants();
}

//*******************************************************************************************
// View Preparation Steps
//*******************************************************************************************
function ViewPreparationSteps() {
    var arry_steps = RECIPE_INFORMATION_DISPLAY.recp_steps.split("/n");
    for (var i = 0; i < arry_steps.length; i++) {
        AddPreparationStep(arry_steps[i], i + 1);
    }
}

function AddPreparationStep(step_txt, _index)
//מוסיף שורות למצרכים כמספר המצרכים שבמתכון
{
    COUNT_STEPS += 1;
    NAME_STEPS += 1;

    var new_step = document.createElement('div');
    new_step.id = "sp=tep" + NAME_STEPS;
    new_step.className = "form-row text2rigth";
    new_step.style["float"] = "right";
    new_step.innerHTML = " שלב" + _index + " :" + step_txt;
    //new_step.innerHTML = _index + ". " + step_txt;//+;
    if (NAME_STEPS % 2 == 0)
        new_step.style["background-color"] = "#cccccc";
    document.getElementById("recipe_preparation_steps").appendChild(new_step);
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
            amount: RECIPE_INGRIDIANTS[i].amount
        };
        AddIngridinats(_ing);//מוסיף שורות למצרכים כמספר המצרכים שבמתכון
    }
}

function AddIngridinats(_ing)
//מוסיף שורות למצרכים כמספר המצרכים שבמתכון
{
    NAME_INGRIDIANTS = NAME_INGRIDIANTS + 1;
    var new_ingridiant = document.createElement('div');
    new_ingridiant.id = "ingridiant_" + NAME_INGRIDIANTS;
    new_ingridiant.className = "form-row text2rigth";
    new_ingridiant.innerHTML = _ing.id_mesurment + " " + _ing.id_ingridiants + " " + _ing.amount;
    if (NAME_INGRIDIANTS % 2 == 0)
        new_ingridiant.style["background-color"] = "#cccccc";
    document.getElementById("recipe_ingridiants").appendChild(new_ingridiant);
}

//*******************************************************************************************
// GET RECIPE COMMENTS
//*******************************************************************************************
function GetRecipeComments() {
    var recipe_id = RECIPE_INFORMATION.recp_id;
    GlobalAjax("/api/Comment/GetCommentsByRecipeId/" + recipe_id, "GET", "", SuccessGetRecipeComments, FailGetRecipeComments);
}

function SuccessGetRecipeComments(data) {
    RECIPE_COMMENTS = data;
    sessionStorage.setItem("RECIPE_COMMENTS", JSON.stringify(RECIPE_COMMENTS));
    ShowRecipeComments();
    //מציג את המתכון
    GetProfileName();
}

function FailGetRecipeComments() {
    console.log("שגיאה! אי אפשר לקבל את התגובות של המתכון");
    alert("שגיאה! אי אפשר לקבל את התגובות של המתכון");

    //מציג את המתכון
    GetProfileName();
}

//*******************************************************************************************
// SHOW RECIPE COMMENTS
//*******************************************************************************************
function ShowRecipeComments() {
    if (RECIPE_COMMENTS.length == 0) {
        document.getElementById("comments").style["height"] = "50px";
        document.getElementById("comments").innerHTML = "אין תגובות";
    }
    else {
        document.getElementById("comments").style["height"] = "300px";
        document.getElementById("comments").style["overflowY"] = "scroll";
        document.getElementById("comments").style["overflowX"] = "hidden";

        for (var i = 0; i < RECIPE_COMMENTS.length; i++) {
            GetUserFullNameByID(RECIPE_COMMENTS[i], RECIPE_COMMENTS[i].user_id);
        }
    }
}

function AddComment(_comment, user_full_name) {
    COUNT_COMMENT += 1;
    COUNT_COMMENT += 1;
    var new_comment = document.createElement('div');
    new_comment.id = "comment_" + COUNT_COMMENT;
    new_comment.className = "form-row";
    new_comment.style["text-align"] = "right";
    //תגובה
    var comment_lbl = document.createElement("span");
    comment_lbl.for = _comment.id;
    comment_lbl.className = "col-form-label text2rigth";
    comment_lbl.style["width"] = "100%";
    comment_lbl.innerHTML = user_full_name + " " + _comment.comment_date;//ParseDate4Display(_comment.comment_date);
    new_comment.appendChild(comment_lbl);

    var comment_div = document.createElement("span");
    comment_div.className = "form-control text2rigth";
    comment_div.style["right"] = "0";
    comment_div.innerHTML = _comment.comment;
    comment_div.id = _comment.id;
    new_comment.appendChild(comment_div);
       
    document.getElementById("old_comment").appendChild(new_comment);
}
//*******************************************************************************************
// GET USER FULL NAME BY ID
//*******************************************************************************************
function GetUserFullNameByID(_comment, _user_id) {
    GlobalAjax("/api/User/GetUserFullNameByID/" + _user_id, "GET", "", function (data) { AddComment(_comment, data); }, FailGetUserFullNameByID);
}
function FailGetUserFullNameByID() {
    console.log("cant get the user full name!.");
}

//*******************************************************************************************
// GET  recipe count like
//*******************************************************************************************
function GetRecipeCountLike() {
    var recipe_id = RECIPE_INFORMATION.recp_id;
    GlobalAjax("/api/Like/GetCountLikeOfRecipe/" + recipe_id, "GET", "", SuccessGetRecipeCountLike, FailGetRecipeCountLike);
}

function SuccessGetRecipeCountLike(data) {
    //שינוי מספר הלייקים למתכון
    var like_count_alert = document.getElementById("recipe_like_count");
    like_count_alert.innerHTML = "לייקים " + data;
    //מביא את תגובות המתכון
    GetRecipeComments();
}

function FailGetRecipeCountLike() {
    console.log("שגיאה, לא מוצא לייקים של מתכון");
    //מיבא את תגובות המתכון
    GetRecipeComments();
}