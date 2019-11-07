// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
   //סוגי המנות ממסד הנתונים
    var arry_dish_type = new Array();
    GetDishType();
    // קטגוריות מנות מהמסד נתונים
    var arry_dish_category = new Array();
    GetDishCategory();
    //עדכון סוג אוכל
    var arry_food_type = new Array();
    GetFoodType();
    //עדכון סגנון מטבח
    var arry_kitchen_type = new Array();
    GetKitchenType();
    //עדכון דרגת קושי
    var arry_difficulty_level = new Array();
    GetDifficultyLevel();
    // עדכון שם מצרך
    var arry_ingridiants = new Array();
    GetIngridiants();
    //עדכון אופן מדידה של מצרך
    var arry_Mesurments = new Array();
    GetMesurments();
});
//*******************************************************************************************
//////////////////////////////////////////////////////
// פונקציה מביאה את כל סוגי המנות
function GetDishType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני dishType
    GlobalAjax("/api/DishType", "GET", "", SuccessDishType, FailDishType);
}

function SuccessDishType(arry_dish_type) {
    sessionStorage.setItem("Dish_Type", JSON.stringify(arry_dish_type));
    initDishType(arry_dish_type);
}

function FailDishType() {
    console.log("שגיאה במשיכת נתוני מאפייני מנה מהשרת.");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');
}

//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initDishType(data) {
    var str;
    for (i in data) {
        $("#select_dish_type").append(AddOption_DishType(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_DishType(item) {
    return '<option value="' + item.id + '">' + item.dish_type + '</option>';
}
//////////////////////////////////////////////////////
// פונקציה מביאה את כל מאפייני המנות
function GetDishCategory() {
        // קריאה לפונקצית ajax של Get מהשרת עבור נתוני dishCategoty
    GlobalAjax("/api/DishCategoty", "GET", "", SuccessDishCategory, FailDishCategory);
}

//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בהצלחה בשרת
function SuccessDishCategory(arry_dish_category) {
    //הכנסת הנתונים לsession stirage
    sessionStorage.setItem("Dish_category", JSON.stringify(arry_dish_category));
    // הוספת הנתונים לרשימה הנגללת
    initDishCategory(arry_dish_category); 
}

//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בכישלון בשרת
function FailDishCategory() {
    console.log("שגיאה במשיכת נתוני מאפייני מנה מהשרת.");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');
}

//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initDishCategory(data) { 
    var str;
    for (i in data) {
        //        $("#select_dish_category").append(AddOption(data[i]));

        $("#select_dish_category").append(AddOption_DishCategory(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_DishCategory(item) {
    return '<option value="' + item.id + '">' + item.dish_category + '</option>';   
}
//////////////////////////////////////////////////////
// פונקציה מביאה את כל סוגי האוכל
function GetFoodType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני foodType
    GlobalAjax("/api/FoodType", "GET", "", SuccessFoodType, FailFoodType);
}

function SuccessFoodType(arry_food_type) {
    sessionStorage.setItem("Food_Type", JSON.stringify(arry_food_type));
    initFoodType(arry_food_type);
}

function FailFoodType() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
}

//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initFoodType(data) {
    var str;
    for (i in data) {
        $("#select_food_type").append(AddOption_FoodType(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_FoodType(item) {
    return '<option value="' + item.id + '">' + item.food_type + '</option>';
}
//////////////////////////////////////////////////////
// פונקציה מביאה את כל סוגי המטבחים
function GetKitchenType() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני kitchenType
    GlobalAjax("/api/KitchenType", "GET", "", SuccessKitchenType, FailKitchenType);
}

function SuccessKitchenType(arry_kitchen_type) {
    sessionStorage.setItem("Kitchen_Type", JSON.stringify(arry_kitchen_type));
    initKitchenType(arry_kitchen_type);
}

function FailKitchenType() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
}

//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initKitchenType(data) {
    var str;
    for (i in data) {
        $("#select_kitchen_type").append(AddOption_KitchenType(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_KitchenType(item) {
    return '<option value="' + item.id + '">' + item.kitchen_type + '</option>';
}
//////////////////////////////////////////////////////
// פונקציה מביאה את כל דרגות הקושי של מתכון
function GetDifficultyLevel() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני DifficultyLevel
    GlobalAjax("/api/DifficultyLevel", "GET", "", SuccessDifficultyLevel,FailDifficultyLevel);
}

function SuccessDifficultyLevel(arry_difficulty_level) {
    sessionStorage.setItem("Difficulty_Level", JSON.stringify(arry_difficulty_level));
    initDifficultyLevel(arry_difficulty_level);
}

function FailDifficultyLevel() {
    console.log("שגיאה במשיכת נתוני סוגי אוכל מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי אוכל מהשרת.');
}

//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initDifficultyLevel(data) {
    var str;
    for (i in data) {
        $("#select_work_time").append(AddOption_DifficultyLevel(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_DifficultyLevel(item) {
    return '<option value="' + item.id + '">' + item.difficulty_level + '</option>';
}
//////////////////////////////////////////////////////
// פונקציה מביאה את כל המצרכים של מתכון
function GetIngridiants() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני Ingridiants
    GlobalAjax("/api/Ingridiants", "GET", "", SuccessIngridiants, FailIngridiants);
}

function SuccessIngridiants(arry_ingridiants) {
    sessionStorage.setItem("Ingridiants", JSON.stringify(arry_ingridiants));
    initIngridiants(arry_ingridiants);
}

function FailIngridiants() {
    console.log("שגיאה במשיכת נתוני מצרכים מהשרת.");
    alert('שגיאה במשיכת נתוני מצרכים מהשרת.');
}

//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initIngridiants(data) {
    var str;
    for (i in data) {
        $("#select_ingridiant_name").append(AddOption_Ingridiants(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_Ingridiants(item) {
    return '<option value="' + item.id + '">' + item.ingridinat + '</option>';
}
//////////////////////////////////////////////////////
// פונקציה מביאה את כל אופני המדידה של מתכון
function GetMesurments() {
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני Mesurments
    GlobalAjax("/api/Mesurments", "GET", "", SuccessMesurments, FailMesurments);
}

function SuccessMesurments(arry_Mesurments) {
    sessionStorage.setItem("Mesurments", JSON.stringify(arry_Mesurments));
    initMesurments(arry_Mesurments);
}

function FailMesurments() {
    console.log("שגיאה במשיכת נתוני אופן המדידה מהשרת.");
    alert('שגיאה במשיכת נתוני אופן המדידה מהשרת.');
}

//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initMesurments(data) {
    var str;
    for (i in data) {
        $("#select_mesurment").append(AddOption_Mesurments(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_Mesurments(item) {
    return '<option value="' + item.id + '">' + item.mesurment + '</option>';
}

//*******************************************************************************************

//////////////////////////////////////////////////////
//// פונקציה שבודקת האם נבחר ערך לא ריק SELECT 
//function IsNull() {
//    /*
//    //select_dish_type
//    var selected_input = $('#select_dish_type').val();
//    if (selected_input == null)
//        alert("בבקשה בחר  'סוג מנה'.");
//    //txt_dish_category
//    var selected_input = $('#txt_dish_category').val();
//    if (selected_input == null)
//        alert("בבקשה בחר 'מאפיין מנה'.");
//        */
//    var all_select = $("input[type = select]");
//    for (var i in all_select) {
//        if (i.val() = null) {
//            alert("בבקשה בחר 'מאפיין מנה'.");
//        }
//    }
//}

//////////////////////////////////////////////////////
// פונקציה של העלאת מתכון
function UpLoadRecipe() {
    //אובייקט של מתכון חדש 
    var newRecipe = {
        Id_Recipe: parseInt(111),
        Id_Recipe_User: parseInt(111),// לקחת מהseesion storage  ,
        Name_Recipe: $('#txt_name_recipe').val(),
        Id_Recipe_DishType: parseInt($('#select_dish_type').val()),
        Id_Recipe_DishCategory: parseInt($('#txt_dish_category').val()),
        Id_Recipe_FoodType: parseInt($('#select_food_type').val()),
        Id_Recipe_KitchenType: parseInt($('#select_kitchen_type').val()),
        RecipeTotalTime: Date.now(),
        RecipeWorkTime: Date.now(),//($('#txt_work_time').val()),
        Id_Recipe_Level: parseInt($('#txt_total_time').val()),//($('#select_work_time').val()),
        PreparationSteps: $('#txt_preparation_steps').val()
    };
    //רשימה של המצרכים למתכון

    //שמירת האובייקטים בsseion storage
    sessionStorage.setItem("new_recipe", JSON.stringify(newRecipe));
    console.log("לפני שליחה לשרת");
    //שיגור הנתונים לשרת ע"י קריאה לפונקציה הAJAX
    GlobalAjax("/api/Recipe", "POST", newRecipe, SucessFunc, FailFunc);
    console.log("אחרי שליחה לשרת");

}

//פונקציה שמתבצעת כאשר הנתונים נשלחו לשרת בהצלחה
function SucessFunc() {
    //window.location.href = "../ThankYou/ThankYou.html";
    alert("המתכון הועלה בהצלחה לאתר!.");
}

//פונקציה שמתבצעת כאשר יש בעיה בשליחת הנתונים לשרת
function FailFunc() {
    /*
    sessionStorage.removeItem("purchase");
    sessionStorage.setItem("error", "Error occurred please try again");
    window.location.href = "../ThirdParty/FailurePage.html";
    */
    sessionStorage.removeItem("newRecipe");
    sessionStorage.setItem("error", "Error occurred please try again");
    alert("תקלה, המתכון לא הועלה לאתר, נסה שוב מאוחר יותר!.");
}