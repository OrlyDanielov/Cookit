//*******************************************************************************************
// GLOBAL VARIABLE
//*******************************************************************************************
var ARRY_USER_TYPE = JSON.parse(sessionStorage.getItem("ARRY_USER_TYPE"));
var Login_User = JSON.parse(sessionStorage.getItem("Login_User"));
//*******************************************************************************************
// UPLOAD PAGE
//*******************************************************************************************
$(document).ready(function ()
// הפונקציה קוראת בתחילת הקריאה לדף
{
    HelloToLoginUser();
    GetUserType_MENU();
    ShowProfilePage();
});
//*******************************************************************************************
// HELLO TO USER
//*******************************************************************************************

function HelloToLoginUser()
// שם המשתמש המחובר
{
    var user_first_name = JSON.parse(sessionStorage.getItem("Login_User")).first_name;
    var user_last_name = JSON.parse(sessionStorage.getItem("Login_User")).last_name;
    $("#menu_user_name").html("שלום : "+user_first_name + " " + user_last_name);
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
    var user_type = parseInt(JSON.parse(sessionStorage.getItem("Login_User")).user_type);// JSON.parse(sessionStorage.getItem("Login_User")).user_type;
    for (var i = 0; i < ARRY_USER_TYPE.length; i++) {
        if (ARRY_USER_TYPE[i].id === user_type)
            user_type = ARRY_USER_TYPE[i].user_type;
    }
    $("#menu_user_type").html("משתמש : "+user_type);

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
    window.location.replace("../not login/Home_logout.html");
}

//*******************************************************************************************
// show profile Page
//*******************************************************************************************
function ShowProfilePage() {
    //אם המשתמש מסוג פרופיל מראה לו את הדפים שלו
    var user_type = Login_User.user_type;
    console.log("user type " + user_type);
    if (user_type == 2) {
        //דף פרופילים עוקבים
        document.getElementById("Page_Prpfile_Follow_Me").style.display = "block";
        document.getElementById("Page_Prpfile_Follow_Me").reload;
        //דף הפרופיל שלי
        document.getElementById("Page_My_Profile").style.display = "block";
        document.getElementById("Page_My_Profile").reload;

    }
    else {
                //דף פרופילים עוקבים
        document.getElementById("Page_Prpfile_Follow_Me").style.display = "none";
                //דף הפרופיל שלי
        document.getElementById("Page_My_Profile").style.display = "none";

    }
}

