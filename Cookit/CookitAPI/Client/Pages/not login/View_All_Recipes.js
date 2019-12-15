//*******************************************************************************************
// GLOBAL VARAIBLES
////*******************************************************************************************
// פרטי המתכון
var ARRY_RECIPES;
var ARRY_RECIPES_DISPLAY = new Array();
var COUNT_RECIPES = 1;
var COUNT_NAME_RECIPES = 1;
//*******************************************************************************************
// PAGE LOAD
//*******************************************************************************************
$(document).ready(function () {
    Get_FU_Recipes();    
});

//*******************************************************************************************
// GET USER LIKE
//*******************************************************************************************

//*******************************************************************************************
// GET BU AND FU RECIPE 
//*******************************************************************************************
function Get_FU_Recipes() {
    //הפעלת איקון אניצציה של טעינה
    document.getElementById("loading_icon").style.display = "block";

    GlobalAjax("/api/Recipe/Get_FU_Recipes", "GET", "", SuccessGet_FU_Recipes, FailGet_FU_Recipes);
}

function SuccessGet_FU_Recipes(data) {
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
            recp_count_like: null,
            img_name: ARRY_RECIPES[i].img_name,
            img_path: ARRY_RECIPES[i].img_path
        });
    }
    //הצגת כל המתכונים
    ShowRecipes();
}

function FailGet_FU_Recipes() {
    //הפעלת איקון אניצציה של טעינה
    document.getElementById("loading_icon").style.display = "none";

    console.log("error! can't get recipe information.");
    console.log(data);
    alert("שגיאה במשיכת נתוני מתכון!, אנא נסה שנית מאוחד יותר.");
}

//*******************************************************************************************
// Show Recipes
//*******************************************************************************************
function ShowRecipes() {
    //הפעלת איקון אניצציה של טעינה
    document.getElementById("loading_icon").style.display = "none";

    document.getElementById("recipes_form").innerHTML = "";
    COUNT_NAME_RECIPES = 1;
    for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
        GetProfileName(ARRY_RECIPES_DISPLAY[i].user_id, ARRY_RECIPES_DISPLAY[i]);
    }
}

//*******************************************************************************************
// IS USER HAS PROFILE
//*******************************************************************************************
function GetProfileName(_user_id, _recipe) {
    GlobalAjax("/api/Profile/GetProfileByUserId/" + _user_id, "GET", "",
        function (data) {
            console.log("שם פרופיל " + data.name);
            _recipe.recp_owner_name = data.name;
            CountLikeOfRecipe(_recipe, data.name);
        },
        function () {
            console.log("לא מצא את הפרופיל, מחפפש אחר שם משתמש");
            GetFullUserNameById(_user_id, _recipe);
        });
}
//*******************************************************************************************
// Get Full User NameBy Id
//*******************************************************************************************
function GetFullUserNameById(_user_id, _recipe) {
    GlobalAjax("/api/User/GetUserFullNameByID/" + _user_id, "GET", "",
        function (data) {
            console.log("שם משתמש " + data);
            _recipe.recp_owner_name = data;
            CountLikeOfRecipe(_recipe, data);
        }, function () {
            console.log("בעיה במשיגת שם יוצר מתכון!");
            CountLikeOfRecipe(_recipe, null);
        });
}
//*******************************************************************************************
// Get number of like of recipe
//*******************************************************************************************
function CountLikeOfRecipe(_recipe, _name) {
    GlobalAjax("/api/Like/GetCountLikeOfRecipe/" + _recipe.recp_id, "GET", "",
        function (data) {
            console.log("מספר לייקים " + data);
            _recipe.recp_count_like = data;
            AddRecipe(_recipe);
        },
        function () {
            console.log("שגיאה! לא מצליח להביא את מספר הלייקים של המתכון");
            AddRecipe(_recipe);
        });
}
//*******************************************************************************************
// Add Recipe
//*******************************************************************************************

function AddRecipe(_recipe) {
    //div
    var div = document.createElement('div');
    div.className = "col-md-4 ";
    //div
    var recipe_div = document.createElement('div');
    recipe_div.id = _recipe.recp_id;
    recipe_div.className = "card profile-card-3 ";
    recipe_div.style["backgroundColor"] = "white";
    recipe_div.style["padding"] = "10px";
    recipe_div.style[""] = "10px";
    recipe_div.setAttribute("data-toggle", "tooltip");
    recipe_div.setAttribute("title", "הקלק על התמונה כדי לצפות במתכון!");
    //recipe img div
    var recipe_img_div = document.createElement("div");
    recipe_img_div.className = "profile-thumb-block ";
    //recipe img
    var recipe_img = document.createElement("img");
    recipe_img.id = "img_recipe_" + _recipe.recp_id;
    recipe_img.className = "profile shrink recipe_onhover_effect";
    recipe_img.alt = "סליחה, התמונה לא זמינה כעת";//" תמונת מתכון " + _recipe.recp_name;
    recipe_img.src = _recipe.img_path;
    recipe_img.style["width"] = "300px";//"100%";
    recipe_img.style["height"] = "200px";//"50%";
    recipe_img.style["marginTop"] = "5px";
    recipe_img.setAttribute("onClick", "ShowRecipeData(this.id)");
    recipe_img_div.appendChild(recipe_img);
    recipe_div.appendChild(recipe_img_div);
    //recipe name div
    var recipe_name_div = document.createElement("div");
    recipe_name_div.className = "card-content ";
    //recipe name
    var recipe_name = document.createElement("span");
    recipe_name.style["display"] = "block";
    recipe_name.style["font-weight"] = "bold";
    recipe_name.innerHTML = _recipe.recp_name;
    recipe_name.className = "thicker";
    recipe_name_div.appendChild(recipe_name);
    //recipe user\profile 
    var recipe_owner = document.createElement("span");
    recipe_owner.innerHTML = _recipe.recp_owner_name;
    recipe_owner.style["display"] = "block";
    recipe_name_div.appendChild(recipe_owner);

    recipe_div.appendChild(recipe_name_div);
    //recipe like div   
    var recipe_div_like_favorite = document.createElement("div");
    recipe_div_like_favorite.className = "row";
    recipe_div.appendChild(recipe_div_like_favorite);
    //מספר לייקים נוכחי
    var div_like_count = document.createElement("div");
    div_like_count.className = "col";
    recipe_div_like_favorite.appendChild(div_like_count);

    var recipe_like_count = document.createElement("span");
    recipe_like_count.id = "like_count_" + _recipe.recp_id;
    recipe_like_count.style["display"] = "block";
    recipe_like_count.innerHTML = "לייקים " + _recipe.recp_count_like;//+ מסםר הלייקים
    div_like_count.appendChild(recipe_like_count); 
    //הוספת השלב לתצוגה
    div.appendChild(recipe_div);
    console.log(COUNT_NAME_RECIPES % 3);
    if (COUNT_NAME_RECIPES % 3 == 1) {
        //create new row
        var row = document.createElement("div");
        row.className = "row";
        console.log(Math.ceil(COUNT_NAME_RECIPES / 3));
        row.id = "row_" + Math.ceil(COUNT_NAME_RECIPES / 3); // עיגול למעלה

        row.appendChild(div);
        document.getElementById("recipes_form").appendChild(row);
    }
    else {
        console.log(Math.ceil(COUNT_NAME_RECIPES / 3));
        document.getElementById("row_" + Math.ceil(COUNT_NAME_RECIPES / 3)).appendChild(div);
    }
    console.log("recipe " + COUNT_NAME_RECIPES);
    COUNT_NAME_RECIPES += 1;
}


//*******************************************************************************************
// ShowRecipeData
//*******************************************************************************************
function ShowRecipeData(_id_recpie)
//מעביר את המשתמש לדף של פרטי של במתכון בלבד
{
    var ID_RECPIE_VIEW = _id_recpie.split("_")[2];//id
    sessionStorage.setItem("ID_RECPIE_VIEW", JSON.stringify(ID_RECPIE_VIEW));
    window.location.replace("View_Recipe.html");
}

//*******************************************************************************************
// SearchRecipeByName
//*******************************************************************************************
function SearchRecipeByName()
//מחפש מתכונים לפי שם
{
    var txt_search_name = document.getElementById("txt_search_recipe_by_name");
    if (txt_search_name.value == "") {
        ShowSelectedRecipes(ARRY_RECIPES_DISPLAY);
        alert("אנא הכנס שם מתכון לחיפוש!");
    }
    else {
        var search_recipes = GetRecipeByName(txt_search_name.value); // מקבל את רשימת הפרופילים התואמים
        if (search_recipes.length == 0)//אם אין אף תוצאת חיםוש מתאימה
        {
            document.getElementById("recipes_form").innerHTML = "";
            alert("אין מתכונים מתאימים לחיפוש!");
        }
        else
            ShowSelectedRecipes(search_recipes);
    }
}

//*******************************************************************************************
// GetRecipeByName
//*******************************************************************************************
function GetRecipeByName(recipe_name)
//מחזיר פרופיל לפי שם. יכול להיות רשימה של פרופילים
{
    var list_recipes = new Array();
    for (var i = 0; i < ARRY_RECIPES_DISPLAY.length; i++) {
        console.log(ARRY_RECIPES_DISPLAY[i].recp_name.indexOf(recipe_name));
        if (ARRY_RECIPES_DISPLAY[i].recp_name.indexOf(recipe_name) >= 0) // התאמה לכל או כל השם
            list_recipes.push(ARRY_RECIPES_DISPLAY[i]);
    }
    return list_recipes;
}
//*******************************************************************************************
// ShowSelectedRecipes
//*******************************************************************************************
function ShowSelectedRecipes(_list_recipes)
//מציג את הפרופילים הנבחרים
{
    document.getElementById("recipes_form").innerHTML = "";
    // תצוגת הפרופילים המבוקשים
    COUNT_NAME_RECIPES = 1;
    for (var i = 0; i < _list_recipes.length; i++) {
        AddRecipe(_list_recipes[i]);
    }
}