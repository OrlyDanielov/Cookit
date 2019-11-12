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

//בדיקת תקינות
var RECIPE_VALIDATION = {
    recp_name: false,
    recp_dish_type: false,
    recp_dish_category: false,
    recp_food_type: false,
    recp_kitchen_type: false,
    recp_level: false,
    recp_total_time: false,
    recp_work_time: false,
    recp_steps: false,
    recp_food_lable: false,
    recp_holiday: false
};
var INGRIDIANTS_VALIDATION =//{
    [{
        ing_name: false,
        ing_amount: false,
        ing_mesurment: false
        //};
    }];
//מונה מספר מצרכים
var COUNT_INGRIDIANTS = 1;
var NAME_INGRIDIANTS = 1;

//תז המתכון החדש
//var ID_RECIPE = null;
sessionStorage.setItem("RECIPE_NAME", JSON.stringify("עוגת שוקולד עשירה"));
var RECIPE_NAME = JSON.parse(sessionStorage.getItem("RECIPE_NAME"));
// פרטי המתכון
var RECIPE_INFORMATION;
var RECIPE_INGRIDIANTS = new Array();
var RECIPE_HOLIDAYS = new Array();
var RECIPE_FOOD_LABLES = new Array();
//פרטים לעדכון
var UPDATE_INGRIDIANTS = new Array();
var NEW_INGRIDIANTS = new Array();
var DELETE_INGRIDIANTS = new Array();

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
    RECIPE_INFORMATION = data;
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
    for (var i = 0; i < COUNT_INGRIDIANTS; i++) {
        INGRIDIANTS_VALIDATION.push({
            ing_name: false,
            ing_amount: false,
            ing_mesurment: false
        });
    }
    console.log(INGRIDIANTS_VALIDATION);
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
// VIEW RECIPE INFORMATION
//*******************************************************************************************
function ViewRecipeInformation()
//מציג את המידע של המתכון
{
    $("#txt_name_recipe").val(RECIPE_INFORMATION.recp_name);
    $("#txt_total_time").val(RECIPE_INFORMATION.recp_total_time);
    $("#txt_work_time").val(RECIPE_INFORMATION.recp_work_time);
    $("#txt_preparation_steps").val(RECIPE_INFORMATION.recp_steps);
    ViewSelectOneOptInformation("select_difficulty_level", RECIPE_INFORMATION.recp_level);
    ViewSelectOneOptInformation("select_dish_type", RECIPE_INFORMATION.recp_dish_type);
    ViewSelectOneOptInformation("select_dish_category", RECIPE_INFORMATION.recp_dish_category);
    ViewSelectOneOptInformation("select_food_type", RECIPE_INFORMATION.recp_food_type);
    ViewSelectOneOptInformation("select_kitchen_type", RECIPE_INFORMATION.recp_kitchen_type);
    ViewSelectOneOptInformation("select_difficulty_level", RECIPE_INFORMATION.recp_level);
    ViewSelectMulyiOptInformation("select_holiday", RECIPE_HOLIDAYS, "id_holiday");
    ViewSelectMulyiOptInformation("select_food_lable", RECIPE_FOOD_LABLES, "id_food_lable");
    //צריך להציג את כל המצרכים
    ViewIngridiants();
}

function ViewSelectOneOptInformation(select_id, selected_value)
// מחפש את הערך המבוקש ברשימה והופך אותו לנחבר ע"מ שיראו אותו
{
    var slct_list = document.getElementById(select_id);
    var opt;
    for (var i = 0; i < slct_list.options.length; i++)
    {
        opt = slct_list.options[i];
        if (opt.value == selected_value)
            opt.selected=true;
    }
}

function ViewSelectMulyiOptInformation(select_id, selected_values,y)
// מחפש את הערך המבוקש ברשימה והופך אותו לנחבר ע"מ שיראו אותו
{
    var slct_list = document.getElementById(select_id);
    var opt,val;
    for (var x = 0; x < selected_values.length; x++) {
        val = selected_values[x];
        for (var i = 0; i < slct_list.options.length; i++) {
            opt = slct_list.options[i];
            if (opt.value == val[y])
                opt.selected = true;
        }
    }
}

//*******************************************************************************************
// VIEW RECIPE INGRIDIANTS
//*******************************************************************************************
function ViewIngridiants()//מציג את נתוני המצרכים
{
    for (var i = 1; i < COUNT_INGRIDIANTS; i++) {//מוסיף מצרכים כמספר המצרכים במתגון
        AddIngridinats();//מוסיף שורות למצרכים כמספר המצרכים שבמתכון
    }
    ViewRecipeIngridiants();//מציג את פרטי המצרכים שמתכון
}

function AddIngridinats()
//מוסיף שורות למצרכים כמספר המצרכים שבמתכון
{
    //COUNT_INGRIDIANTS = COUNT_INGRIDIANTS + 1;
    NAME_INGRIDIANTS = NAME_INGRIDIANTS + 1;
    var new_ingridiant = document.createElement('div');
    new_ingridiant.id = "ingridiant_" + NAME_INGRIDIANTS;
    new_ingridiant.className = "form-row";
    //כפתור הסרה
    var btn_div = document.createElement("div");
    btn_div.className = "col";

    var btn_remove = document.createElement("input");
    btn_remove.type = "button";
    btn_remove.id = "btn_remove_ingridiant_" + NAME_INGRIDIANTS;
    btn_remove.value = "הסר מצרך";
    btn_remove.className = "btn btn-group";
    btn_remove.disabled = true;
    btn_remove.setAttribute("onClick", "ButtonRemoveIngridiant(this.id)");


    btn_div.appendChild(btn_remove);
    new_ingridiant.appendChild(btn_div);
    //שם מצרך
    var name_div = document.createElement("div");
    name_div.className = "col";

    var name_lbl = document.createElement("label");
    name_lbl.for = "select_ingridiant_name_" + NAME_INGRIDIANTS;
    name_lbl.className = "col-sm-4 col-form-label";
    name_lbl.innerHTML = "שם מצרך";

    var name_select = document.createElement("select");
    name_select.id = "select_ingridiant_name_" + NAME_INGRIDIANTS;
    name_select.className = "form-control";
    name_select.disabled = true;

    var name_opt = document.createElement("option");
    name_opt.value = "";
    name_opt.selected = true;
    name_opt.disabled = true;
    name_opt.innerHTML = "שם מצרך";

    var name_feedback = document.createElement("div");
    name_feedback.id = "feedback_ingridiant_name_" + NAME_INGRIDIANTS;
    name_feedback.className = "not_valid_feedback";

    name_select.appendChild(name_opt);

    name_div.appendChild(name_lbl);
    name_div.appendChild(name_select);
    name_div.appendChild(name_feedback);
    new_ingridiant.appendChild(name_div);
    //כמות מצרך
    var count_div = document.createElement("div");
    count_div.className = "col";

    var count_lbl = document.createElement("label");
    count_lbl.for = "txt_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_lbl.className = "col-sm-4 col-form-label";
    count_lbl.innerHTML = "שם מצרך";

    var count_input = document.createElement("input");
    count_input.type = "number";
    count_input.id = "txt_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_input.className = "form-control text2rigth";
    count_input.min = "0";
    count_input.disabled = true;


    var count_feedback = document.createElement("div");
    count_feedback.id = "feedback_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_feedback.className = "not_valid_feedback";

    count_div.appendChild(count_lbl);
    count_div.appendChild(count_input);
    count_div.appendChild(count_feedback);
    new_ingridiant.appendChild(count_div);
    //אופן מדידה
    var mesurment_div = document.createElement("div");
    mesurment_div.className = "col";

    var mesurment_lbl = document.createElement("label");
    mesurment_lbl.for = "select_mesurment_" + NAME_INGRIDIANTS;
    mesurment_lbl.className = "col-sm-4 col-form-label";
    mesurment_lbl.innerHTML = "שם מצרך";

    var mesurment_select = document.createElement("select");
    mesurment_select.id = "select_mesurment_" + NAME_INGRIDIANTS;
    mesurment_select.className = "form-control";
    mesurment_select.disabled = true;

    var mesurment_opt = document.createElement("option");
    mesurment_opt.value = "";
    mesurment_opt.selected = true;
    mesurment_opt.disabled = true;
    mesurment_opt.innerHTML = "אופן מדידה";

    mesurment_select.appendChild(mesurment_opt);

    var mesurment_feedback = document.createElement("div");
    mesurment_feedback.id = "feedback_mesurment_" + NAME_INGRIDIANTS;
    mesurment_feedback.className = "not_valid_feedback";

    mesurment_div.appendChild(mesurment_lbl);
    mesurment_div.appendChild(mesurment_select);
    mesurment_div.appendChild(mesurment_feedback);
    new_ingridiant.appendChild(mesurment_div);

    var hr = document.createElement("hr");
    hr.class = "mb - 4";
    new_ingridiant.appendChild(hr);
    document.getElementById("recipe_ingridiants").insertBefore(new_ingridiant, document.getElementById("btn_add_ingridiant"));
    console.log("ingridiant " + COUNT_INGRIDIANTS);
    //מוסיף מידע לרשימות החדשות שיצרנו למצרך
    EnterData2DDList(ARRY_INGRIDIANTS, "select_ingridiant_name_" + NAME_INGRIDIANTS);
    EnterData2DDList(ARRY_MESURMENTS, "select_mesurment_" + NAME_INGRIDIANTS);
    //מוסיף אוביקט נוסף של ולידציה של מצרך לרשימה
    /*INGRIDIANTS_VALIDATION.push({
        ing_name: false,
        ing_amount: false,
        ing_mesurment: false
    });*/
}
function ViewRecipeIngridiants()
//מציג את נתוני המצרכים
{
    var all_ingridiants = document.getElementById("recipe_ingridiants").children;
    var ingridiants_data;
    var index;
    var ingridiants_inputs =
    {
        ing_name: $("#select_ingridiant_name_1"),
        ing_amount: $("#txt_ingridiant_amount_1"),
        ing_mesurment: $("#select_mesurment_1")
    };
    var names, temp, x;
    var g = 0; // index of recipe ingridiants
    for (var i = 1; i < all_ingridiants.length - 1; i++) {
        ingridiants_data = all_ingridiants[i].children;
        for (var h = 1; h <= 3; h++) {
            names = Object.keys(ingridiants_inputs);
            temp = (ingridiants_data[h]).children[1].id;
            x = names[h - 1];
            ingridiants_inputs[x] = $("#" + temp);
           if (h == 1)//שם מצרך
            {
                    ViewSelectOneOptInformation(temp, RECIPE_INGRIDIANTS[g].id_ingridiants);
            }
            else if (h == 2)//כמות
            {
                $("#" + temp).val(RECIPE_INGRIDIANTS[g].amount);

            }
            else//אופן מדידה
            {
                ViewSelectOneOptInformation(temp, RECIPE_INGRIDIANTS[g].id_mesurment);

            }
        }
        g++;
    }
}

//*******************************************************************************************
// EDIT - ENABLE THE INPUTS
//*******************************************************************************************
function Edit()
//מאפשר את הקלטים לצורך עריכה
{
    EditRecipeInformation();
    EditRecipeIngridiants();
    //משנה את כפתור העריכה לשמירה עבור השינויים
    $("#btnSave").prop('disabled', false);
}

function EditRecipeInformation()
//מאפשר את הקלטים של המתכון
{
    $("#select_difficulty_level").prop('disabled', false);
    $("#txt_name_recipe").prop('disabled', false);
    $("#select_dish_type").prop('disabled', false);
    $("#select_dish_category").prop('disabled', false);
    $("#select_food_type").prop('disabled', false);
    $("#select_kitchen_type").prop('disabled', false);
    $("#select_holiday").prop('disabled', false);
    $("#select_food_lable").prop('disabled', false);
    $("#txt_total_time").prop('disabled', false);
    $("#txt_work_time").prop('disabled', false);
    $("#txt_preparation_steps").prop('disabled', false);
}

function EditRecipeIngridiants()
//מאפשר את הקלטים של המצרכים
{
    var all_ingridiants = document.getElementById("recipe_ingridiants").children;
    var ingridiants_data;
    var index;
    var ingridiants_inputs =
    {
        ing_name: $("#select_ingridiant_name_1"),
        ing_amount: $("#txt_ingridiant_amount_1"),
        ing_mesurment: $("#select_mesurment_1"),
        btn_remove: $("#btn_remove_ingridiant_1")
    };
    var names, temp, x;
    for (var i = 1; i < all_ingridiants.length-1; i++) {
        ingridiants_data = all_ingridiants[i].children;
                   for (var h = 0; h <= 3; h++) {
                names = Object.keys(ingridiants_inputs);
                if (h == 0)//כפתור הסרת מצרך
                    temp = (ingridiants_data[h]).children[0].id;
                else
                    temp = (ingridiants_data[h]).children[1].id;
                x = names[h - 1];
                ingridiants_inputs[x] = $("#" + temp);
                ingridiants_inputs[x].prop('disabled', false);
            }
    }
    //כפתור הוספת מצרך
    $("#btn_add_ingridiant").prop('disabled', false);
}

//*******************************************************************************************
// CHECK FORM VALIDATION
//*******************************************************************************************

function CheckFormValidation() {
    CheckRecipeInputs();
    CheckIngridiantsInputs();
    if (Change_style_by_validation())
        UpdateRecipe();
        //console.log("הטופס תקין");
    else
        alert("אנא תקן את המקומות המסומנים");
}


//*******************************************************************************************
// CHECK RECIPE INPUTS
//*******************************************************************************************
function CheckRecipeInputs()
//בודק את הרשומות של המתכון
{
    var recipe_inputs = {        
        recp_name: $("#txt_name_recipe").val(),
        recp_dish_type: $("#select_dish_type").find(":selected").val(),
        recp_dish_category: $("#select_dish_category").find(":selected").val(),
        recp_food_type: $("#select_food_type").find(":selected").val(),
        recp_kitchen_type: $("#select_kitchen_type").find(":selected").val(),
        recp_level: $("#select_difficulty_level").find(":selected").val(),
        recp_total_time: $("#txt_total_time").val(),
        recp_work_time: $("#txt_work_time").val(),
        recp_steps: $("#txt_preparation_steps").val(),
        recp_food_lable: $("#select_food_lable").val(),
        recp_holiday: $("#select_holiday").val()
    };
    var recipe_feedback = {
        recp_name: document.getElementById("feedback_name_recipe"),
        recp_dish_type: document.getElementById("feedback_dish_type"),
        recp_dish_category: document.getElementById("feedback_dish_category"),
        recp_food_type: document.getElementById("feedback_food_type"),
        recp_kitchen_type: document.getElementById("feedback_kitchen_type"),
        recp_level: document.getElementById("feedback_difficulty_level"),
        recp_total_time: document.getElementById("feedback_total_time"),
        recp_work_time: document.getElementById("feedback_work_time"),
        recp_steps: document.getElementById("feedback_preparation_steps"),
        recp_food_lable: document.getElementById("feedback_food_lable"),
        recp_holiday: document.getElementById("feedback_holiday")
    };
    // recp_name
    if (recipe_inputs.recp_name == "") {
        RECIPE_VALIDATION.recp_name = false;
        recipe_feedback.recp_name.innerHTML = "אנא הכנס שם מתכון!";
    }
    else if (!(recipe_inputs.recp_name.length >= 2 && recipe_inputs.recp_name.length <= 60)) {
        RECIPE_VALIDATION.recp_name = false;
        recipe_feedback.recp_name.innerHTML = "אנא הכנס שם מתכון באורך 2 עד 60 תווים!";
    }
    else {
        RECIPE_VALIDATION.recp_name = true;
        recipe_feedback.recp_name.innerHTML = "";
    }
    // recp_dish_type
    if (recipe_inputs.recp_dish_type == "") {
        RECIPE_VALIDATION.recp_dish_type = false;
        recipe_feedback.recp_dish_type.innerHTML = "אנא בחר סוג מנה!";
    }
    else {
        RECIPE_VALIDATION.recp_dish_type = true;
        recipe_feedback.recp_dish_type.innerHTML = "";
    }
    // recp_dish_category
    if (recipe_inputs.recp_dish_category == "") {
        RECIPE_VALIDATION.recp_dish_category = false;
        recipe_feedback.recp_dish_category.innerHTML = "אנא בחר מאפיין מנה!";
    }
    else {
        RECIPE_VALIDATION.recp_dish_category = true;
        recipe_feedback.recp_dish_category.innerHTML = "";
    }
    // recp_food_type
    if (recipe_inputs.recp_food_type == "") {
        RECIPE_VALIDATION.recp_food_type = false;
        recipe_feedback.recp_food_type.innerHTML = "אנא בחר סוג אוכל!";
    }
    else {
        RECIPE_VALIDATION.recp_food_type = true;
        recipe_feedback.recp_food_type.innerHTML = "";
    }
    // recp_kitchen_type
    if (recipe_inputs.recp_kitchen_type == "") {
        RECIPE_VALIDATION.recp_kitchen_type = false;
        recipe_feedback.recp_kitchen_type.innerHTML = "אנא בחר סגנון מטבח!";
    }
    else {
        RECIPE_VALIDATION.recp_kitchen_type = true;
        recipe_feedback.recp_kitchen_type.innerHTML = "";
    }
    // recp_level
    if (recipe_inputs.recp_level == "") {
        RECIPE_VALIDATION.recp_level = false;
        recipe_feedback.recp_level.innerHTML = "אנא בחר דרגת קושי!";
    }
    else {
        RECIPE_VALIDATION.recp_level = true;
        recipe_feedback.recp_level.innerHTML = "";
    }
    // recp_work_time
    if (recipe_inputs.recp_work_time == "") {
        RECIPE_VALIDATION.recp_work_time = false;
        recipe_feedback.recp_work_time.innerHTML = "אנא הכנס זמן עבודה!";
    }
    else if (recipe_inputs.recp_work_time == "00:00") {
        RECIPE_VALIDATION.recp_work_time = false;
        recipe_feedback.recp_work_time.innerHTML = "אנא הכנס זמן עבודה שונה מ 00:00!";
    }
    else {
        RECIPE_VALIDATION.recp_work_time = true;
        recipe_feedback.recp_work_time.innerHTML = "";
    }
    // recp_total_time
    if (recipe_inputs.recp_total_time == "") {
        RECIPE_VALIDATION.recp_total_time = false;
        recipe_feedback.recp_total_time.innerHTML = "אנא הכנס זמן כולל!";
    }
    else if (recipe_inputs.recp_total_time == "00:00") {
        RECIPE_VALIDATION.recp_total_time = false;
        recipe_feedback.recp_total_time.innerHTML = "אנא הכנס זמן כולל שונה מ 00:00!";
    }
    else if (!(recipe_inputs.recp_total_time >= recipe_inputs.recp_work_time)) {
        RECIPE_VALIDATION.recp_total_time = false;
        recipe_feedback.recp_total_time.innerHTML = "אנא הכנס זמן כולל לפחות בגודל זמן העבודה";
    }
    else {
        RECIPE_VALIDATION.recp_total_time = true;
        recipe_feedback.recp_total_time.innerHTML = "";
    }
    // recp_steps
    if (recipe_inputs.recp_steps == "") {
        RECIPE_VALIDATION.recp_steps = false;
        recipe_feedback.recp_steps.innerHTML = "אנא הכנס אופן הכנה!";
    }
    else if (!(recipe_inputs.recp_steps.length >= 50)) {
        RECIPE_VALIDATION.recp_steps = false;
        recipe_feedback.recp_steps.innerHTML = "אנא הכנס שם מתכון באורך 50 תווים לפחות!";
    }
    else {
        RECIPE_VALIDATION.recp_steps = true;
        recipe_feedback.recp_steps.innerHTML = "";
    }
    //recp_holiday
    if (recipe_inputs.recp_holiday == "") {
        RECIPE_VALIDATION.recp_holiday = false;
        recipe_feedback.recp_holiday.innerHTML = "אנא בחר לפחות חג אחד!";
    }
    else {
        RECIPE_VALIDATION.recp_holiday = true;
        recipe_feedback.recp_holiday.innerHTML = "";
        console.log("holiday: " + recipe_inputs.recp_holiday);
    }
    //recp_food_lable
    if (recipe_inputs.recp_food_lable == "") {
        RECIPE_VALIDATION.recp_food_lable = false;
        recipe_feedback.recp_food_lable.innerHTML = "אנא בחר לפחות תוויות אחת!";
    }
    else {
        RECIPE_VALIDATION.recp_food_lable = true;
        recipe_feedback.recp_food_lable.innerHTML = "";
        console.log("food lable: " + recipe_inputs.recp_food_lable);
    }
}

//*******************************************************************************************
// CHECK INGRIDIANTS INPUTS
//*******************************************************************************************

function CheckIngridiantsInputs()
//בודק את הרשומות של המצרכים
{
    var all_ingridiants = document.getElementById("recipe_ingridiants").children;
    var ingridiants_feedback = {
        ing_name: document.getElementById("feedback_ingridiant_name_1"),
        ing_amount: document.getElementById("feedback_ingridiant_amount_1"),
        ing_mesurment: document.getElementById("feedback_mesurment_1")
    };
    var ingridiants_data;
    var index;
    var ingridiants_inputs =
    {
        ing_name: $("#select_ingridiant_name_1").find(":selected").val(),
        ing_amount: $("#txt_ingridiant_amount_1").val(),
        ing_mesurment: $("#select_mesurment_1").find(":selected").val()
    };
    var names, temp, z, num;//x, y,
    for (var i = 1; i < all_ingridiants.length - 1; i++) {
        ingridiants_data = all_ingridiants[i].children;
        for (var h = 1; h <= 3; h++) {
            names = Object.keys(ingridiants_inputs);
            temp = (ingridiants_data[h]).children[1].id;
            //x = names[h - 1];
            z = temp.split("_");
            num = z[z.length - 1];
            //y = INGRIDIANTS_VALIDATION[i - 1];
            //ingridiant name
            if (h == 1) {
                ingridiants_inputs.ing_name = $("#" + temp).find(":selected").val();
                ingridiants_feedback.ing_name = document.getElementById("feedback_ingridiant_name_" + num);
                if (ingridiants_inputs.ing_name == "") {
                    INGRIDIANTS_VALIDATION[i - 1].ing_name = false;
                    ingridiants_feedback.ing_name.innerHTML = "אנא בחר שם מצרך!";
                }
                else {
                    INGRIDIANTS_VALIDATION[i - 1].ing_name = true;
                    ingridiants_feedback.ing_name.innerHTML = "";
                }
            }
            //Ingridiant amount
            if (h == 2) {
                ingridiants_inputs.ing_amount = $("#" + temp).val();
                ingridiants_feedback.ing_amount = document.getElementById("feedback_ingridiant_amount_" + num);
                if (ingridiants_inputs.ing_amount == "") {
                    INGRIDIANTS_VALIDATION[i - 1].ing_amount = false;
                    ingridiants_feedback.ing_amount.innerHTML = "אנא הכנס כמות מצרך!";
                }
                else if (ingridiants_inputs.ing_amount == 0) {
                    INGRIDIANTS_VALIDATION[i - 1].ing_amount = false;
                    ingridiants_feedback.ing_amount.innerHTML = "אנא הכנס כמות מצרך גדולה מ0!";
                }
                else {
                    INGRIDIANTS_VALIDATION[i - 1].ing_amount = true;
                    ingridiants_feedback.ing_amount.innerHTML = "";
                }
            }
            //ingridiant mesurment
            if (h == 3) {
                ingridiants_inputs.ing_mesurment = $("#" + temp).find(":selected").val();
                ingridiants_feedback.ing_mesurment = document.getElementById("feedback_mesurment_" + num);
                if (ingridiants_inputs.ing_mesurment == "") {
                    INGRIDIANTS_VALIDATION[i - 1].ing_mesurment = false;
                    ingridiants_feedback.ing_mesurment.innerHTML = "אנא בחר אופן מדידה!";
                }
                else {
                    INGRIDIANTS_VALIDATION[i - 1].ing_mesurment = true;
                    ingridiants_feedback.ing_mesurment.innerHTML = "";
                }
            }
        }
    }
}

//*******************************************************************************************
// CHANGE STYLE BY VALIDATION
//*******************************************************************************************

function Change_style_by_validation()
//הפונקציה בודקת איזה פריט לא תקין ומסמנת אותו
{
    var flag = true;
    //פרטי מתכון
    var recipe_inputs =
    {
        recp_name: $("#txt_name_recipe"),
        recp_dish_type: $("#select_dish_type"),
        recp_dish_category: $("#select_dish_category"),
        recp_food_type: $("#select_food_type"),
        recp_kitchen_type: $("#select_kitchen_type"),
        recp_level: $("#select_difficulty_level"),
        recp_total_time: $("#txt_total_time"),
        recp_work_time: $("#txt_work_time"),
        recp_steps: $("#txt_preparation_steps"),
        recp_food_lable: $("#select_food_lable"),
        recp_holiday: $("#select_holiday")
    };
    for (var j in RECIPE_VALIDATION) {
        if (RECIPE_VALIDATION[j] == false) {
            flag = false;
            recipe_inputs[j].addClass(" not_valid");
        }
        else {
            if (recipe_inputs[j].hasClass("not_valid"))
                recipe_inputs[j].removeClass("not_valid");
        }
    }
    //מצרכים
    var all_ingridiants = document.getElementById("recipe_ingridiants").children;
    var ingridiants_data;
    var index;
    var ingridiants_inputs =
    {
        ing_name: $("#select_ingridiant_name_1"),
        ing_amount: $("#txt_ingridiant_amount_1"),
        ing_mesurment: $("#select_mesurment_1")
    };
    var names, temp, x, y;
    for (var i = 1; i < all_ingridiants.length - 1; i++) {
        ingridiants_data = all_ingridiants[i].children;
        for (var h = 1; h <= 3; h++) {
            names = Object.keys(ingridiants_inputs);
            temp = (ingridiants_data[h]).children[1].id;
            x = names[h - 1];
            ingridiants_inputs.x = $("#" + temp);
            y = INGRIDIANTS_VALIDATION[i - 1];
            if (y[x] == false) {
                flag = false;
                ingridiants_inputs.x.addClass(" not_valid");
            }
            else {
                if (ingridiants_inputs.x.hasClass("not_valid"))
                    ingridiants_inputs.x.removeClass("not_valid");
            }
        }
    }
    return flag;
}

//*******************************************************************************************
// BUTTON ADD INGRIDIANT
//*******************************************************************************************

function ButtonAddIngridiant()
//פונקציה של כפתור הוספת מצרך
{
    COUNT_INGRIDIANTS = COUNT_INGRIDIANTS + 1;
    NAME_INGRIDIANTS = NAME_INGRIDIANTS + 1;

    var new_ingridiant = document.createElement('div');
    new_ingridiant.id = "ingridiant_" + NAME_INGRIDIANTS;
    new_ingridiant.className = "form-row";
    //כפתור הסרה
    var btn_div = document.createElement("div");
    btn_div.className = "col";

    var btn_remove = document.createElement("input");
    btn_remove.type = "button";
    btn_remove.id = "btn_remove_ingridiant_" + NAME_INGRIDIANTS;
    btn_remove.value = "הסר מצרך";
    btn_remove.className = "btn btn-group";
    btn_remove.setAttribute("onClick", "ButtonRemoveIngridiant(this.id)");


    btn_div.appendChild(btn_remove);
    new_ingridiant.appendChild(btn_div);
    //שם מצרך
    var name_div = document.createElement("div");
    name_div.className = "col";

    var name_lbl = document.createElement("label");
    name_lbl.for = "select_ingridiant_name_" + NAME_INGRIDIANTS;
    name_lbl.className = "col-sm-4 col-form-label";
    name_lbl.innerHTML = "שם מצרך";

    var name_select = document.createElement("select");
    name_select.id = "select_ingridiant_name_" + NAME_INGRIDIANTS;
    name_select.className = "form-control";

    var name_opt = document.createElement("option");
    name_opt.value = "";
    name_opt.selected = true;
    name_opt.disabled = true;
    name_opt.innerHTML = "שם מצרך";

    var name_feedback = document.createElement("div");
    name_feedback.id = "feedback_ingridiant_name_" + NAME_INGRIDIANTS;
    name_feedback.className = "not_valid_feedback";

    name_select.appendChild(name_opt);

    name_div.appendChild(name_lbl);
    name_div.appendChild(name_select);
    name_div.appendChild(name_feedback);
    new_ingridiant.appendChild(name_div);
    //כמות מצרך
    var count_div = document.createElement("div");
    count_div.className = "col";

    var count_lbl = document.createElement("label");
    count_lbl.for = "txt_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_lbl.className = "col-sm-4 col-form-label";
    count_lbl.innerHTML = "שם מצרך";

    var count_input = document.createElement("input");
    count_input.type = "number";
    count_input.id = "txt_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_input.className = "form-control text2rigth";
    count_input.min = "0";

    var count_feedback = document.createElement("div");
    count_feedback.id = "feedback_ingridiant_amount_" + NAME_INGRIDIANTS;
    count_feedback.className = "not_valid_feedback";

    count_div.appendChild(count_lbl);
    count_div.appendChild(count_input);
    count_div.appendChild(count_feedback);
    new_ingridiant.appendChild(count_div);
    //אופן מדידה
    var mesurment_div = document.createElement("div");
    mesurment_div.className = "col";

    var mesurment_lbl = document.createElement("label");
    mesurment_lbl.for = "select_mesurment_" + NAME_INGRIDIANTS;
    mesurment_lbl.className = "col-sm-4 col-form-label";
    mesurment_lbl.innerHTML = "שם מצרך";

    var mesurment_select = document.createElement("select");
    mesurment_select.id = "select_mesurment_" + NAME_INGRIDIANTS;
    mesurment_select.className = "form-control";

    var mesurment_opt = document.createElement("option");
    mesurment_opt.value = "";
    mesurment_opt.selected = true;
    mesurment_opt.disabled = true;
    mesurment_opt.innerHTML = "אופן מדידה";

    mesurment_select.appendChild(mesurment_opt);

    var mesurment_feedback = document.createElement("div");
    mesurment_feedback.id = "feedback_mesurment_" + NAME_INGRIDIANTS;
    mesurment_feedback.className = "not_valid_feedback";

    mesurment_div.appendChild(mesurment_lbl);
    mesurment_div.appendChild(mesurment_select);
    mesurment_div.appendChild(mesurment_feedback);
    new_ingridiant.appendChild(mesurment_div);

    var hr = document.createElement("hr");
    hr.class = "mb - 4";
    new_ingridiant.appendChild(hr);
    document.getElementById("recipe_ingridiants").insertBefore(new_ingridiant, document.getElementById("btn_add_ingridiant"));
    console.log("ingridiant " + COUNT_INGRIDIANTS);
    //מוסיף מידע לרשימות החדשות שיצרנו למצרך
    EnterData2DDList(ARRY_INGRIDIANTS, "select_ingridiant_name_" + NAME_INGRIDIANTS);
    EnterData2DDList(ARRY_MESURMENTS, "select_mesurment_" + NAME_INGRIDIANTS);
    //מוסיף אוביקט נוסף של ולידציה של מצרך לרשימה
    INGRIDIANTS_VALIDATION.push({
        ing_name: false,
        ing_amount: false,
        ing_mesurment: false
    });
}

//*******************************************************************************************
// BUTTON REMOVE INGRIDIANT
//*******************************************************************************************
function  ButtonRemoveIngridiant(btn_remove_ing)
//מסיר את המצרך הנבחר
{
    var child = (document.getElementById(btn_remove_ing).parentNode).parentNode;//.id;
    if (COUNT_INGRIDIANTS == 1) // חייב להיות לפחות מצרך אחד במתכון
    {
        alert("חייב להיות לפחות מצרך אחד במתכון!.");
    }
    else {
        COUNT_INGRIDIANTS = COUNT_INGRIDIANTS - 1;
        // search the index of the removig item
        var all_ingridiants = document.getElementById("recipe_ingridiants");
        console.log(all_ingridiants.children);
        var index = Array.from(all_ingridiants.children).indexOf(child);
        INGRIDIANTS_VALIDATION.splice(index - 1, 1);
        all_ingridiants.removeChild(child);
        console.log("ingridiant " + COUNT_INGRIDIANTS);
    }
}

//*******************************************************************************************
// UPDATE RECIPE
//*******************************************************************************************
function UpdateRecipe()
//עדכון פרטי מתכון
{
    if (confirm("האם אתה רוצה לשמור את השינוי?")) {
        var new_recipe = {
            recp_id: RECIPE_INFORMATION.recp_id,
            user_id: RECIPE_INFORMATION.user_id,
            recp_name: $("#txt_name_recipe").val(),
            recp_dish_type: $("#select_dish_type").find(":selected").val(),
            recp_dish_category: $("#select_dish_category").find(":selected").val(),
            recp_food_type: $("#select_food_type").find(":selected").val(),
            recp_kitchen_type: $("#select_kitchen_type").find(":selected").val(),
            recp_level: $("#select_difficulty_level").find(":selected").val(),
            recp_total_time: $("#txt_total_time").val(),
            recp_work_time: $("#txt_work_time").val(),
            recp_steps: $("#txt_preparation_steps").val()
        };
        GlobalAjax("/api/Recipe/UpdateRecipe", "PUT", new_recipe, SuccessUpdateRecipe, FailUpdateRecipe);
    }
}

function SuccessUpdateRecipe() {
    console.log("המתכון עודכן בשרת בהצלחה.");
    //הוספת המתצרכים 
    CheckRecipeIngridiants();
}

function FailUpdateRecipe() {
    console.log("שגיאה בעדכון המתכון לשרת.");
    console.log(data.T);
    alert("שגיאה בעדכון המתכון לשרת.");
}


//*******************************************************************************************
// CHECK STATUS OF INGRIDIANTS 4 RECIPE
//*******************************************************************************************
function CheckIfNewOrUpdate(arry,key,value)
//בודק האם המצרך הוא חדש מחזיר שקר, מעודכן מחיזר אמת 
{
    for (var i = 0; i < arry.length; i++) {
        if (arry[i][key] == value)
            return true;//מעודכן        
    }
    return false;//חדש
}

function CheckRecipeIngridiants()
//מוסיף את המצרכים למתכון החדש
{
    //רשימת מצרכים של המתכון לפני השינוי
    //0 - נמחק, 
    //1 - מעודכן
    //2 - חדש
    //מעבר על כל המצרכים שבדף
    var updated_ingridiants = new Array();//מצרכים שעברו עידכון
    var added_ingridiants = new Array();//מצרכים חדשים שנוספו
    //var deleted_ingridiants = new Array();//מצרכים חדשים שהוסרו
    var all_ingridiants = document.getElementById("recipe_ingridiants").children;
    var ingridiants_data;
    var index;
    var names, temp, z, num, flag;
    for (var i = 1; i < all_ingridiants.length - 1; i++) {
        var ing_2_recp =
        {
            id: null,
            id_recp: RECIPE_INGRIDIANTS[0].id_recp,
            id_ingridiants: $("#select_ingridiant_name_1").find(":selected").val(),
            amount: $("#txt_ingridiant_amount_1").val(),
            id_mesurment: $("#select_mesurment_1").find(":selected").val()
        };
        ingridiants_data = all_ingridiants[i].children;
        flag = 0;
        for (var h = 1; h <= 3; h++) {
            names = Object.keys(ing_2_recp);
            temp = (ingridiants_data[h]).children[1].id;
            z = temp.split("_");
            num = z[z.length - 1];
            //ingridiant name
            if (h == 1) {
                ing_2_recp.id_ingridiants = $("#" + temp).find(":selected").val();
                //בדיקה האם המצרך הוא חדש או מעודכן או נמחק
                if (CheckIfNewOrUpdate(RECIPE_INGRIDIANTS, "id_ingridiants", ing_2_recp.id_ingridiants))
                {//אם מעודכן
                    flag = 1;
                    ing_2_recp.id = RECIPE_INGRIDIANTS[i - 1].id;
                    //ing_2_recp.id_recp = RECIPE_INGRIDIANTS[i - 1].id_recp;

                }
                else
                    flag = 2;
            }
            //Ingridiant amount
            if (h == 2)
                ing_2_recp.amount = $("#" + temp).val();
            //ingridiant mesurment
            if (h == 3)
                ing_2_recp.id_mesurment = $("#" + temp).find(":selected").val();
        }
        if (flag == 1 )//לרשימת המעודכנים
            updated_ingridiants.push(ing_2_recp);
        else if (flag==2)
            added_ingridiants.push(ing_2_recp);//לרשימת החדשים
    }
    //מצרכים חדשים להוסיף
    NEW_INGRIDIANTS = added_ingridiants;
    //מצרכים לעדכון
    UPDATE_INGRIDIANTS = updated_ingridiants;
    //מצרכים למחיקה
    DELETE_INGRIDIANTS = RECIPE_INGRIDIANTS;
    for (var i = 0; i < updated_ingridiants.length; i++) {
        for (var j = 0; j < DELETE_INGRIDIANTS.length; j++) {
            if (DELETE_INGRIDIANTS[j].id_ingridiants == updated_ingridiants[i].id_ingridiants)
                DELETE_INGRIDIANTS.splice(j, 1);//הסרת המצרך אם לא אמור להמחק
        }
    }
    UpdateRecipeIngridiants(UPDATE_INGRIDIANTS);
}

//*******************************************************************************************
// UPDATE INGRIDIANTS 4 RECIPE
//*******************************************************************************************function UpdateRecipeIngridiants(updeted_ingridiants) {
function UpdateRecipeIngridiants(updated_ingridiants) {
    GlobalAjax("/api/IngridiantForRecp/UpdateById", "put", updated_ingridiants, SuccessUpdateRecipeIngridiants, FailUpdateRecipeIngridiants);
}

function SuccessUpdateRecipeIngridiants() {
    console.log("המצרכים עודכנו בהצלחה!.");
    //הוספת מצרכים חדשים
    AddedRecipeIngridiants(NEW_INGRIDIANTS);
}

function FailUpdateRecipeIngridiants() {
    console.log("שגיאה, המצרכים לא עודכנו .");

}


//*******************************************************************************************
// ADD INGRIDIANTS 4 RECIPE
//*******************************************************************************************function AddedRecipeIngridiants(updeted_ingridiants) {
function AddedRecipeIngridiants(added_ingridiants) {
    GlobalAjax("/api/IngridiantForRecp/AddNewIng2Recp", "POST", added_ingridiants, SuccessAddedRecipeIngridiants, FailAddedRecipeIngridiants);
}


function SuccessAddedRecipeIngridiants() {
    console.log("המצרכים נוספו למתכון בהצלחה!.");
    //מחיקת מצרכים ישנים
    DeletedRecipeIngridiants(DELETE_INGRIDIANTS);
}

function FailAddedRecipeIngridiants() {
    console.log("שגיאה, המצרכים לא נוספו למתכון.");

}

//*******************************************************************************************
// DELETE INGRIDIANTS 4 RECIPE
//*******************************************************************************************כים ישנים
function DeletedRecipeIngridiants(deleted_ingridiants) {
    GlobalAjax("/api/IngridiantForRecp/DeleteById", "DELETE", deleted_ingridiants, SuccessDeletedRecipeIngridiants, FailDeletedRecipeIngridiants);
}


function SuccessDeletedRecipeIngridiants() {
    console.log("המצרכים נמחקו מהמתכון בהצלחה!.");
}

function FailDeletedRecipeIngridiants() {
    console.log("שגיאה, המצרכים לא נמחקו מהמתכון.");

}