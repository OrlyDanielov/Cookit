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
    //var user_name = JSON.parse(sessionStorage.getItem("Login_User")).first_name;    
    //$("#lbl_Hello_to_User").html("שלום " + user_name);
    var user_first_name = JSON.parse(sessionStorage.getItem("Login_User")).first_name;
    var user_last_name = JSON.parse(sessionStorage.getItem("Login_User")).last_name;    

    $("#user_name").html(user_first_name+" "+user_last_name);
}

function GetUserType()
//משיכת סוגי המשתמשים
{
    GlobalAjax("/api/UserType", "GET", "", SuccessUserType, FailUserType);
}

function SuccessUserType(arry_userType) {
    sessionStorage.setItem("arry_userType", arry_userType);
    var user_type = JSON.parse(sessionStorage.getItem("Login_User")).user_type;
    for (var i = 0; i < arry_userType.length; i++)
    {
        if (arry_userType[i].id === user_type)
            user_type = arry_userType[i].user_type;
    };
    //$("#User_Type_menu").html("את\ה מחובר\ת כמשתמש " + user_type);

    $("#user_type").html(user_type);

}

function FailUserType() {
    console.log("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
}

