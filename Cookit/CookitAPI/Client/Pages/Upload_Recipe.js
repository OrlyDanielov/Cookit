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
//בדיקת תקינות
var RECIPE_VALIDATION = {
    recp_name: false ,
    recp_dish_type: false,
    recp_dish_category: false,
    recp_food_type: false,
    recp_kitchen_type: false,
    recp_level: false,
    recp_total_time: false,
    recp_work_time: false,
    recp_steps: false
};
var INGRIDIANTS_VALIDATION = {//[{
    ing_name: false,
    ing_amount: false,
    ing_mesurment: false
};
//}];
//מונה מספר מצרכים
var COUNT_INGRIDIANTS = 1;

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
    GlobalAjax("/api/FoodType", "GET", "", SuccessFoodType, FailFoodType);
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
    EnterData2DDList(arry_kitchen_type,"select_kitchen_type");
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
    GlobalAjax("/api/DifficultyLevel", "GET", "", SuccessDifficultyLevel,FailDifficultyLevel);
}

function SuccessDifficultyLevel(arry_difficulty_level) {
    ARRY_DIFFICULTY_LEVEL = arry_difficulty_level;
    sessionStorage.setItem("Difficulty_Level", JSON.stringify(arry_difficulty_level));
    EnterData2DDList(arry_difficulty_level,"select_kitchen_type");
}

function FailDifficultyLevel() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
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
    EnterData2DDList(arry_ingridiants,"select_ingridiant_name_1");
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
    EnterData2DDList(arry_Mesurments,"select_mesurment_1");
}

function FailMesurments() {
    console.log("שגיאה במשיכת נתוני אופן המדידה מהשרת.");
    alert('שגיאה במשיכת נתוני אופן המדידה מהשרת.');
}
//*******************************************************************************************
// ADD INGRIDIANT
//*******************************************************************************************
function AddIngridiant()
//מוסיף עוד שורה במתכון עבור מצרך נוסף
{
    COUNT_INGRIDIANTS = COUNT_INGRIDIANTS + 1;

    var new_ingridiant = document.createElement('div');
    new_ingridiant.id = "ingridiant_" + COUNT_INGRIDIANTS;
    new_ingridiant.className="form-row";
    //שם מצרך
    var name_div = document.createElement("div");
    name_div.className = "col";

    var name_lbl = document.createElement("label");
    name_lbl.for = "select_ingridiant_name_" + COUNT_INGRIDIANTS;
    name_lbl.className = "col-sm-4 col-form-label";
    name_lbl.innerHTML = "שם מצרך";

    var name_select = document.createElement("select");
    name_select.id = "select_ingridiant_name_" + COUNT_INGRIDIANTS;
    name_select.className = "form-control";

    var name_opt = document.createElement("option");
    name_opt.value = "";
    name_opt.selected = true;
    name_opt.disabled = true;
    name_opt.innerHTML = "שם מצרך";

    name_select.appendChild(name_opt);

    name_div.appendChild(name_lbl);
    name_div.appendChild(name_select);
    new_ingridiant.appendChild(name_div);
    //כמות מצרך
    var count_div = document.createElement("div");
    count_div.className = "col";

    var count_lbl = document.createElement("label");
    count_lbl.for = "txt_ingridiant_amount_" + COUNT_INGRIDIANTS;
    count_lbl.className = "col-sm-4 col-form-label";
    count_lbl.innerHTML = "שם מצרך";

    var count_input = document.createElement("input");
    count_input.type = "text";
    count_input.id = "txt_ingridiant_amount_" + COUNT_INGRIDIANTS;
    count_input.className = "form-control text2rigth";
    
    count_div.appendChild(count_lbl);
    count_div.appendChild(count_input);
    new_ingridiant.appendChild(count_div);
    //אופן מדידה
    var mesurment_div = document.createElement("div");
    mesurment_div.className = "col";

    var mesurment_lbl = document.createElement("label");
    mesurment_lbl.for = "select_mesurment_" + COUNT_INGRIDIANTS;
    mesurment_lbl.className = "col-sm-4 col-form-label";
    mesurment_lbl.innerHTML = "שם מצרך";

    var mesurment_select = document.createElement("select");
    mesurment_select.id = "select_mesurment_" + COUNT_INGRIDIANTS;
    mesurment_select.className = "form-control";

    var mesurment_opt = document.createElement("option");
    mesurment_opt.value = "";
    mesurment_opt.selected = true;
    mesurment_opt.disabled = true;
    mesurment_opt.innerHTML ="אופן מדידה";

    mesurment_select.appendChild(mesurment_opt);

    mesurment_div.appendChild(mesurment_lbl);
    mesurment_div.appendChild(mesurment_select);
    new_ingridiant.appendChild(mesurment_div);

    var hr = document.createElement("hr");
    hr.class = "mb - 4";
    new_ingridiant.appendChild(hr);
    //document.getElementById("recipe_ingridiants").appendChild(new_ingridiant);
    document.getElementById("recipe_ingridiants").insertBefore(new_ingridiant, document.getElementById("btn_add_ingridiant"));
    console.log("ingridiant " + COUNT_INGRIDIANTS);
    //מוסיף מידע לרשימות החדשות שיצרנו למצרך
    EnterData2DDList(ARRY_INGRIDIANTS, "select_ingridiant_name_" + COUNT_INGRIDIANTS);
    EnterData2DDList(ARRY_MESURMENTS, "select_mesurment_" + COUNT_INGRIDIANTS);
    //מוסיף אוביקט נוסף של ולידציה של מצרך לרשימה
    INGRIDIANTS_VALIDATION.push({
        ing_name: false,
        ing_amount: false,
        ing_mesurment: false
    });
}

//*******************************************************************************************
// CHECK FORM VALIDATION
//*******************************************************************************************
function CheckFormValidation() {
    //
    Change_style_by_validation();
}

function Change_style_by_validation()
//הפונקציה בודקת איזה פריט לא תקין ומסמנת אותו
{
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
        recp_steps: $("#txt_preparation_steps")
    };
    for (var i in RECIPE_VALIDATION) {
        if (RECIPE_VALIDATION[i] == false)
            recipe_inputs[i].addClass(" not_valid");
        else {
            if (recipe_inputs[i].hasClass("not_valid"))
                recipe_inputs[i].removeClass("not_valid");
        }
    }
    //צריך לעבור על כך המצרכים במתכון
    var ingridiants_inputs =
    {
        ing_name: $("#select_ingridiant_name_1"),
        ing_amount: $("#txt_ingridiant_amount_1"),
        ing_mesurment: $("#select_mesurment_1")
    };
    for (var i = 1; i <= COUNT_INGRIDIANTS; i++) {
        for (var h in INGRIDIANTS_VALIDATION[i]) {
    //for (var h in INGRIDIANTS_VALIDATION) {
            /*
            if (h == 1)
                ingridiants_inputs[h] = $("#select_ingridiant_name_" + COUNT_INGRIDIANTS);
            else if (h == 2)
                ingridiants_inputs[h] = $("#txt_ingridiant_amount_" + COUNT_INGRIDIANTS);
            else
                ingridiants_inputs[h] = $("#select_mesurment_" + COUNT_INGRIDIANTS);
                */
            if ((INGRIDIANTS_VALIDATION[i])[h] == false) 
            //if (INGRIDIANTS_VALIDATION[h] == false) 
                ingridiants_inputs[h].addClass(" not_valid");
            else {
                if (ingridiants_inputs[h].hasClass("not_valid"))
                    ingridiants_inputs[h].removeClass("not_valid");
            }
        //}
    }
}
//*******************************************************************************************
// ADD NEW RECIPE
//*******************************************************************************************
