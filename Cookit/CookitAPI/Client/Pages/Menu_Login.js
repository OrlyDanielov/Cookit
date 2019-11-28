//*******************************************************************************************
// GLOBAL VARIABLE
//*******************************************************************************************
var ARRY_USER_TYPE = JSON.parse(sessionStorage.getItem("ARRY_USER_TYPE"));

//*******************************************************************************************
// UPLOAD PAGE
//*******************************************************************************************
$(document).ready(function ()
// הפונקציה קוראת בתחילת הקריאה לדף
{
    HelloToLoginUser();
    GetUserType_MENU();
});
//*******************************************************************************************
// HELLO TO USER
//*******************************************************************************************

function HelloToLoginUser()
// שם המשתמש המחובר
{
    var user_first_name = JSON.parse(sessionStorage.getItem("Login_User")).first_name;
    var user_last_name = JSON.parse(sessionStorage.getItem("Login_User")).last_name;
    $("#menu_user_name").html(user_first_name + " " + user_last_name);
}
//*******************************************************************************************
// GET USER TYPE
//*******************************************************************************************
function GetUserType_MENU()
//משיכת סוגי המשתמשים
{
    if (ARRY_USER_TYPE== null)
        GlobalAjax("/api/UserType/GetAll", "GET", "", SuccessUserType_MENU, FailUserType_MENU);
    else
        SuccessUserType_MENU(ARRY_USER_TYPE);
}

function SuccessUserType_MENU(arry_userType) {
    ARRY_USER_TYPE = arry_userType;
    sessionStorage.setItem("ARRY_USER_TYPE", JSON.stringify(arry_userType));
    var user_type = JSON.parse(sessionStorage.getItem("Login_User")).user_type;
    for (var i = 0; i < ARRY_USER_TYPE.length; i++) {
        if (ARRY_USER_TYPE[i].id === user_type)
            user_type = ARRY_USER_TYPE[i].user_type;
    }
    $("#menu_user_type").html(user_type);

}

function FailUserType_MENU() {
    console.log("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
    alert("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
}
//*******************************************************************************************
// LOGOUT
//*******************************************************************************************
function Logout() {
       //ניקוי של הערכים בזיכרון
    sessionStorage.clear();
    //מעבר לדף הבית הלא מחובר
    window.location.replace("Home_logout.html");
}
