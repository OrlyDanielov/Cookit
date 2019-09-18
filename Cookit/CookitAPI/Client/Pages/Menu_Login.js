$(document).ready(function ()
//מתרחש בתחילת טעינת הדף
// הפונקציה טוענת את התפריט בצורה דינמית לתוך הדף
{
    $('#menu').load("Menu_Login.html");
});

//פונקציות של דפים של משתמש מחובר
// פונקצית התנתקות
function Logout() {
       //ניקוי של הערכים בזיכרון
    sessionStorage.clear();
    //מעבר לדף הבית הלא מחובר
    window.location.replace("Home_logout.html");
}


var arry_userType = new Array();

$(document).ready(function ()
// הפונקציה קוראת בתחילת הקריאה לדף
{
    HelloToLoginUser();
    GetUserType();
});

function HelloToLoginUser()
// שם המשתמש המחובר
{
    var user_first_name = JSON.parse(sessionStorage.getItem("Login_User")).first_name;
    var user_last_name = JSON.parse(sessionStorage.getItem("Login_User")).last_name;
    $("#menu_user_name").html(user_first_name + " " + user_last_name);
}

function GetUserType()
//משיכת סוגי המשתמשים
{
    if (JSON.parse(sessionStorage.getItem("arry_userType")) === null)
        GlobalAjax("/api/UserType", "GET", "", SuccessUserType, FailUserType);
    else
        SuccessUserType(arry_userType);
}

function SuccessUserType(arry_userType) {
    sessionStorage.setItem("arry_userType", arry_userType);
    var user_type = JSON.parse(sessionStorage.getItem("Login_User")).user_type;
    for (var i = 0; i < arry_userType.length; i++) {
        if (arry_userType[i].id === user_type)
            user_type = arry_userType[i].user_type;
    }
    $("#menu_user_type").html(user_type);

}

function FailUserType() {
    console.log("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
}
