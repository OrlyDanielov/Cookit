//*******************************************************************************************
// GLOBAL VARAIBLES
////*******************************************************************************************
//פונקציות מתכון
var USER_LIKE = null;
var USER_FAVORITE = null;
// פרטי המתכון
var ARRY_RECIPES;
var COUNT_RECIPES = 1;
var COUNT_NAME_RECIPES = 1;
var ARRY_RECIPES_DISPLAY = new Array();
//*******************************************************************************************
// PAGE LOAD
//*******************************************************************************************
$(document).ready(function () {
    // להביא נתונים סטטים
    

});

//*******************************************************************************************
// GET USER LIKE
//*******************************************************************************************

//*******************************************************************************************
// GET all RECIPE 
//*******************************************************************************************
function GetAllRecipes() {
    GlobalAjax("/api/Recipe/GetAllRecipesOf_BU_AND_FU", "GET", "", SuccessGetAllRecipes, FailGetAllRecipes);
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
            recp_holidays: null,
            recp_food_labels: null,
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
    GetRecipeHolidays();

    //הצגת כל המתכונים
    ShowRecipes();
}

function FailGetAllRecipes(data) {
    console.log("error! can't get recipe information.");
    console.log(data);
    alert("שגיאה במשיכת נתוני מתכון!, אנא נסה שנית מאוחד יותר.");

    //GetRecipeHolidays();
}
