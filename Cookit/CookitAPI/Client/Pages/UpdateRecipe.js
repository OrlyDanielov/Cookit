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
var ID_RECIPE = null;
sessionStorage.setItem("RECIPE_NAME", JSON.stringify("עוגת שוקולד עשירה"));
var RECIPE_NAME = JSON.parse(sessionStorage.getItem("RECIPE_NAME"));
// פרטי המתכון
var RECIPE_INFORMATION;
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
    btn_remove.setAttribute("onClick", "RemoveIngridiant(this.id)");


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