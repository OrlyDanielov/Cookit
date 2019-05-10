// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    //עדכון מאפייני מנה
    var arry_dish_category = new Array();
    GetDishCategory();
    //עדכון סוג מנה
    //עדכון סוג אוכל
    //עדכון סגנון מטבח
    //עדכון דרגת קושי
    // עדכון שם מצרך
    //עדכון אופן מדידה של מצרך

});
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
    $.ajax({
        // get the information of all the clothes
        dataType: "json",			                         //סוג הנתונים שאנחנו מצפים לקבל מהשרת
        url: "/api/Recipe",			                 //הכתובת לשרת ולפונקציה
        contentType: "application/json; charset=utf-8",	   //סוג הנתונים שאנחנו שולחים לשרת
        type: "POST",				                         //סוג הפעולה
        data: newItemString,			                 //הנתונים עצמם שאנחנו שולחים
        success: function (data) {                       //פונקציה  שתופעל לאחר הצלחה
            alert('המוצר התווסף למערכת בהצלחה!.');
            console.log("הצליח!.");
        },
        error: function (data) {
            alert('error' + '\n' + data.error);

        }
    });
    //GlobalAjax(URL, "POST", newRecipe, SucessFunc, FailFunc);
    console.log("אחרי שליחה לשרת");

}
//////////////////////////////////////////////////////
//פונקציה שמתבצעת כאשר הנתונים נשלחו לשרת בהצלחה
function SucessFunc() {
    //window.location.href = "../ThankYou/ThankYou.html";
    alert("המתכון הועלה בהצלחה לאתר!.");
}
//////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////
// פונקציה מביאה את כל מאפייני המנות
function GetDishCategory() {
    // משיכת נתוני מאפייני המנות מDB
    GlobalAjax("/api/DishCategoty", "GET", "", SuccessDishCategory, FailDishCategory);
}
//////////////////////////////////////////////////////
//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בהצלחה בשרת
function SuccessDishCategory(arry_dish_category) {
    //הכנסת הנתונים לsession stirage
    //arry_dish_category = data;
    sessionStorage.setItem("Dish_category", JSON.stringify(arry_dish_category));
    // הוספת הנתונים לרשימה הנגללת
    initDishCategory(arry_dish_category); 
}
//////////////////////////////////////////////////////
//הפונקציה מתבצעת במקרה ששאילת מאייפיני מנה התבצעה בכישלון בשרת
function FailDishCategory() {
    console.log("שגיאה");
    alert('שגיאה במשיכת נתוני מאפייני מנה מהשרת.');
}
//////////////////////////////////////////////////////
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
//function init(data,ddlist) { 
function initDishCategory(data) { 
    var str;
    for (i in data) {
        //        $("#select_dish_category").append(AddOption(data[i]));

        $("#select_dish_category").append(AddOption_DishCategory(data[i]));
    }
}
//////////////////////////////////////////////////////
//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_DishCategory(item) {
    return '<option value="' + item.id + '">' + item.category + '</option>';   
}
//////////////////////////////////////////////////////
/*
function InitDropDownList(data) {
    var sel = document.getElementById('select_dish_category');
    var opt = null;

    for (i = 0; i < data.length; i++) {

        opt = document.createElement('option');
        opt.value = data[i].id;
        opt.innerHTML = data[i].category;
        sel.appendChild(opt);
    }
}
*/