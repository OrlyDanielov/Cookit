//*******************************************************************************************
// globals variables
//*******************************************************************************************
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
    //recp_steps: false,
    recp_food_lable: false,
    recp_holiday: false
};
//תקינות לשלבי הכנה
var RECIPE_STEPS_VALIDATION = [{ step: false }];
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
//מונה מספר שלבים באופן ההכנה
var COUNT_STEPS = 1;
var NAME_STEPS = 1;
//תז המתכון החדש
var ID_RECIPE;

//*******************************************************************************************
// page load
//*******************************************************************************************

// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    //סוגי המנות ממסד הנתונים
    GetDishType();
    // קטגוריות מנות מהמסד נתונים
    GetDishCategory();
    //עדכון סוג אוכל
    GetFoodType();
    //עדכון סגנון מטבח
    GetKitchenType();
    //עדכון דרגת קושי
    GetDifficultyLevel();
    // עדכון שם מצרך
    GetIngridiants();
    //עדכון אופן מדידה של מצרך
    GetMesurments();
    //עדכון חגים
    GetHoliday();
    //עדכון תוויות
    GetFoodLable();
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
    ARRY_DISH_TYPE = arry_dish_type;//JSON.parse(arry_dish_type);
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
// ADD INGRIDIANT
//*******************************************************************************************
function AddIngridiant()
//מוסיף עוד שורה במתכון עבור מצרך נוסף
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
// REMOVE INGRIDIANT
//*******************************************************************************************
function RemoveIngridiant(btn_remove_ing)
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
// ADD PREPARATION STEP
//*******************************************************************************************
function AddPreparationStep()
//מוסיף עוד שורה במתכון עבור שלב באופן ההכנה 
{
    COUNT_STEPS = COUNT_STEPS + 1;
    NAME_STEPS = NAME_STEPS + 1;

    var new_step = document.createElement('div');
    new_step.id = "step_" + NAME_STEPS;
    new_step.className = "form-row";
    //כפתור הסרה 
    var btn_remove = document.createElement("input");
    btn_remove.type = "button";
    btn_remove.id = "btn_remove_step_" + NAME_STEPS;
    btn_remove.value = "הסר שלב";
    btn_remove.className = "btn btn-group";
    btn_remove.setAttribute("onClick", "RemovePreparationStep(this.id)");
    
    new_step.appendChild(btn_remove);
    //תווית
    var step_lbl = document.createElement("label");
    step_lbl.for = "preparation_step_" + NAME_STEPS;
    step_lbl.className = "col-form-label";
    step_lbl.style["float"] = "right";
    step_lbl.style["right"] = "0px";
    step_lbl.style["width"] = "90%";
    step_lbl.innerHTML = "שלב " + NAME_STEPS;

    new_step.appendChild(step_lbl);
    //טקסט
    var step_textarea = document.createElement("textarea");
    step_textarea.id = "preparation_step_" + NAME_STEPS;
    step_textarea.className = "form-control";
    step_textarea.style["rows"] = "2";
    step_textarea.style["cols"] = "50";

    new_step.appendChild(step_textarea);
    //פידבאק
    var step_feedback = document.createElement("div");
    step_feedback.id = "feedback_preparation_steps_" + NAME_STEPS;
    step_feedback.className = "not_valid_feedback";

    new_step.appendChild(step_feedback);
    //קו מפריד
    var hr = document.createElement("hr");
    hr.class = "mb-4";
    new_step.appendChild(hr);
    //הוספת השלב לתצוגה
    document.getElementById("recipe_preparation_steps").insertBefore(new_step, document.getElementById("btn_add_preparation_steps"));
    console.log("step " + NAME_STEPS);
    //ולידציה
    RECIPE_STEPS_VALIDATION.push({ step: false });
}

//*******************************************************************************************
// REMOVE PREPARATION STEP
//*******************************************************************************************
function RemovePreparationStep(btn_remove_step)
//מסיר את המצרך הנבחר
{
    var child = (document.getElementById(btn_remove_step).parentNode);
    if (COUNT_STEPS == 1) // חייב להיות לפחות שלב אחד במתכון
    {
        alert("חייב להיות לפחות שלב אחד במתכון!.");
    }
    else {
        COUNT_STEPS = COUNT_STEPS - 1;
        // search the index of the removig item
        var all_steps = document.getElementById("recipe_preparation_steps");
        var index = Array.from(all_steps.children).indexOf(child);
        all_steps.removeChild(child);
        RECIPE_STEPS_VALIDATION.pop();
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
        //recp_steps: $("#txt_preparation_steps").val(),
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
        //recp_steps: document.getElementById("feedback_preparation_steps"),
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

 //שלבי הכנה
    var preparation_step_inputs = $("[id^=preparation_step_]");
    var preparation_step_feedback = $("[id^=feedback_preparation_steps_]");//document.getElementById("feedback_preparation_steps_");

    // recp_steps
    for (var i = 0; i < COUNT_STEPS; i++) {
        if (preparation_step_inputs[i].value == "") {
            RECIPE_STEPS_VALIDATION[i].step = false;
            preparation_step_feedback[i].innerHTML = "אנא הכנס אופן שלב הכנה !";
        }
        else if (preparation_step_inputs[i].value.length < 10) {
            RECIPE_STEPS_VALIDATION[i].step = false;
            preparation_step_feedback[i].innerHTML = "אנא הכנס שלב הכנה באורך 10 תווים לפחות!";
        }
        else {
            RECIPE_STEPS_VALIDATION[i].step = true;
            preparation_step_feedback[i].innerHTML= "";
        }
    }
}
//*******************************************************************************************
// CHECK FORM VALIDATION
//*******************************************************************************************

function CheckFormValidation() {
    CheckRecipeInputs();
    CheckIngridiantsInputs();
    if (Change_style_by_validation())
        AddNewRecipe();
    else
        alert("אנא תקן את המקומות המסומנים");
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
        //recp_steps: $("#txt_preparation_steps"),
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
    ////שלבי הכנה
    var step_inputs = $("[id^=preparation_step_]");
    for (var i = 0; i < COUNT_STEPS; i++) {
        if (RECIPE_STEPS_VALIDATION[i].step == false) {
            flag = false;
            step_inputs[i].classList.add("not_valid");
        }
        else {
            if (step_inputs[i].classList.contains("not_valid"))
                step_inputs[i].classList.remove("not_valid");
        }
    }
    //מצרכים
    var ingridiants_inputs = {
        ing_name: $("[id^=select_ingridiant_name_]"),
        ing_amount: $("[id^=txt_ingridiant_amount_]"),
        ing_mesurment: $("[id^=select_mesurment_]")
    };
    for (var i = 0; i < COUNT_INGRIDIANTS; i++) {
        var names = Object.keys(ingridiants_inputs);
        for (var h in names) {
            if (INGRIDIANTS_VALIDATION[i][names[h]] == false) {
                flag = false;
                ingridiants_inputs[names[h]][i].classList.add("not_valid");
            }
            else {
                if (ingridiants_inputs[names[h]][i].classList.contains("not_valid"))
                    ingridiants_inputs[names[h]][i].classList.remove("not_valid");
            }
        }
    }
    return flag;
}

//*******************************************************************************************
// ADD NEW RECIPE
//*******************************************************************************************
//הוספת מתכון חדש
function AddNewRecipe() {
    var prp_steps = "";
    var step_inputs = $("[id^=preparation_step_]");
    for (var i = 0; i < step_inputs.length; i++ ) {
        prp_steps += step_inputs[i].value;
        if (i < step_inputs.length - 1)
            prp_steps += "/n";
    }

    var new_recipe = {
        user_id: (JSON.parse(sessionStorage.getItem("Login_User"))).id,
        recp_name: $("#txt_name_recipe").val(),
        recp_dish_type: $("#select_dish_type").find(":selected").val(),
        recp_dish_category: $("#select_dish_category").find(":selected").val(),
        recp_food_type: $("#select_food_type").find(":selected").val(),
        recp_kitchen_type: $("#select_kitchen_type").find(":selected").val(),
        recp_level: $("#select_difficulty_level").find(":selected").val(),
        recp_total_time: $("#txt_total_time").val(),
        recp_work_time: $("#txt_work_time").val(),
        recp_steps: prp_steps// $("#txt_preparation_steps").val()
    };
    GlobalAjax("/api/Recipe/AddNewRecipe", "POST", new_recipe, SuccessAddRecipe, FailAddRecipe);
}

function SuccessAddRecipe(id_recipe)
// פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
{
    ID_RECIPE = id_recipe;
    console.log("המתכון נוסף לשרת בהצלחה.");
    console.log("id recipe: " + id_recipe);
    var ID_RECPIE_VIEW = id_recipe;
    sessionStorage.setItem("ID_RECPIE_VIEW", JSON.stringify(ID_RECPIE_VIEW));
    //הוספת המתצרכים התוויות והחגים
    AddIngridiantForRecipe(id_recipe);
}

function FailAddRecipe(data)
// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בהוספת המתכון לשרת.");
    console.log(data.T);
    alert('שגיאה בהוספת המתכון לשרת.');
}

//*******************************************************************************************
// ADD FOOD LABLE FOR RECIPE
//*******************************************************************************************

function AddFoodLableForRecipe(_id_recipe)
// מוסיף אץ התוויות למתכון
{
    var new_food_lable = $("#select_food_lable").val();
    var new_foodLable_2_recipe = new Array();
    for (var i in new_food_lable) {
        new_foodLable_2_recipe.push({
            id_food_lable: new_food_lable[i],
            id_recipe: _id_recipe
        });
    }
    GlobalAjax("/api/FoodLabelsForRecp/AddNewFoodLable2Recipe", "POST", new_foodLable_2_recipe, SuccessAddFoodLableForRecipe, FailAddFoodLableForRecipe);
}

function SuccessAddFoodLableForRecipe() {
    console.log("התוויות נוספו למתכון בהצלחה!.");
    //הוספת החגים
    AddHolidaysForRecipe(ID_RECIPE);
}

function FailAddFoodLableForRecipe() {
    console.log("שגיאה, התוויות לא נוספו למתכון.");

}

//*******************************************************************************************
// ADD HOLIDAYS FOR RECIPE
//*******************************************************************************************

function AddHolidaysForRecipe(_id_recipe)
// מוסיף אץ התוויות למתכון
{
    var new_holidays = $("#select_holiday").val();
    var new_holidays_2_recipe = new Array();
    for (var i in new_holidays) {
        new_holidays_2_recipe.push({
            id_holiday: new_holidays[i],
            id_recp: _id_recipe
        });
    }
    GlobalAjax("/api/HolidaysForRecpController/AddNewHoliday2Recipe", "POST", new_holidays_2_recipe, SuccessAddHolidayForRecipe, FailAddHolidaysForRecipe);
}

function SuccessAddHolidayForRecipe() {
    console.log("החגים נוספו למתכון בהצלחה!.");
    alert("המתכון נוסף בהצלחה!.");
    window.location.replace("View_Recipe_Login.html"); //מעבר לדף הבית המחובר
}

function FailAddHolidaysForRecipe() {
    console.log("שגיאה, החגים לא נוספו למתכון.");

}

//*******************************************************************************************
// ADD INGRIDIANTS FOR RECIPE
//*******************************************************************************************
function AddIngridiantForRecipe(id_recipe)
//מוסיף את המצרכים למתכון החדש
{
    var list_ing_2_recp = new Array();
    var all_ingridiants = document.getElementById("recipe_ingridiants").children;
    var ingridiants_data;
    var index;
    var names, temp, z, num;
    for (var i = 1; i < all_ingridiants.length - 1; i++) {
        var ing_2_recp =
        {
            id_recp: id_recipe,
            id_ingridiants: $("#select_ingridiant_name_1").find(":selected").val(),
            amount: $("#txt_ingridiant_amount_1").val(),
            id_mesurment: $("#select_mesurment_1").find(":selected").val()
        };
        ingridiants_data = all_ingridiants[i].children;
        for (var h = 1; h <= 3; h++) {
            names = Object.keys(ing_2_recp);
            temp = (ingridiants_data[h]).children[1].id;
            z = temp.split("_");
            num = z[z.length - 1];
            //ingridiant name
            if (h == 1)
                ing_2_recp.id_ingridiants = $("#" + temp).find(":selected").val();
            //Ingridiant amount
            if (h == 2)
                ing_2_recp.amount = $("#" + temp).val();
            //ingridiant mesurment
            if (h == 3)
                ing_2_recp.id_mesurment = $("#" + temp).find(":selected").val();
        }
        list_ing_2_recp.push(ing_2_recp);
    }
    GlobalAjax("/api/IngridiantForRecp/AddNewIng2Recp", "POST", list_ing_2_recp, SuccessAddIngridiantForRecipe, FailAddIngridiantForRecipe);
}

function SuccessAddIngridiantForRecipe() {
    console.log("המצרכים נוספו למתכון בהצלחה!.");
    //הוספת התוויות
    AddFoodLableForRecipe(ID_RECIPE);
}

function FailAddIngridiantForRecipe() {
    console.log("שגיאה, המצרכים לא נוספו למתכון.");

}