//*******************************************************************************************
// GLOBAL VARIABLE
//*******************************************************************************************
var LOGIN_USER = JSON.parse(sessionStorage.getItem("Login_User"));
//*******************************************************************************************
// UPLOAD PAGE
//*******************************************************************************************
/*
$(document).ready(function ()
//בטעינת הדף
{
  
});
*/
//*******************************************************************************************
// CheckOldPassword
//*******************************************************************************************
function CheckOldPassword()
//בודק האם הסיסמה הישנה זהה לסיסמה של המשתמש
{
    var old_password = document.getElementById("old_password").value;
    var user_password = LOGIN_USER.pasword;
    if (old_password == "") {
        document.getElementById("feedback_old_password").innerHTML = "אנא הכנס סיסמה!.!";
        $("#old_password").addClass("not_valid");

    }
    else if (old_password != user_password) {
        document.getElementById("feedback_old_password").innerHTML = "הסיסמה לא נכונה!.";
        $("#old_password").addClass("not_valid");

    }
    else {
        if ($("#old_password").hasClass("not_valid"))
            $("#old_password").removeClass("not_valid");
        document.getElementById("feedback_old_password").innerHTML = "";
        //אפשר הכנסת סיסמה חדשה              
        $("#btnEdit").prop('disabled', false);
        $("#new_password").prop('disabled', false);
        $("#password_authentication").prop('disabled', false);
    }
}
//*******************************************************************************************
// Check New Password
//*******************************************************************************************
function CheckNewPassword() {
    var old_password = document.getElementById("old_password").value;
    var new_password = document.getElementById("new_password").value;
    var authentication_password = document.getElementById("password_authentication").value;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    //סיסמה חדשה
    if (new_password == "") {
        document.getElementById("feedback_new_password").innerHTML = "אנא הכנס סיסמה!.!";
        $("#new_password").addClass("not_valid");
        return false;
    }
    else if (!(new_password.match(passw))) {
        document.getElementById("feedback_new_password").innerHTML = "אנא הכנס סיסמה באורך 6 עד 12 תווים המכילה לפחות מספר, אות גדולה באנגלית ואות קטנה באנגלית!.!";
        $("#new_password").addClass("not_valid");
        return false;
    }
    else if (old_password == new_password) {//שהסיסמה החדשה שונה מהישנה
        document.getElementById("feedback_new_password").innerHTML = "!.אנא הכנס סיסמה שונה מהסיסמה הקודמת";
        $("#new_password").addClass("not_valid");
        return false;
    }
    else {
        if ($("#new_password").hasClass("not_valid"))
            $("#new_password").removeClass("not_valid");
        document.getElementById("feedback_new_password").innerHTML = "";
    }
    //אימות סיסמה
    if (authentication_password == "") {
        document.getElementById("feedback_password_authentication").innerHTML = "אנא הכנס אימות סיסמה!.!";
        $("#password_authentication").addClass("not_valid");
        return false;
 }
    else if (!(authentication_password.match(passw))) {
        document.getElementById("feedback_password_authentication").innerHTML = "אנא הכנס סיסמה באורך 6 עד 12 תווים המכילה לפחות מספר, אות גדולה באנגלית ואות קטנה באנגלית!.!";
        $("#password_authentication").addClass("not_valid");
        return false;
 }
    else if (authentication_password != new_password) {//שהסיסמה החדשה זהה לאימות סיסמה
        document.getElementById("feedback_password_authentication").innerHTML = "הסיסמה לא זהה.!";
        $("#password_authentication").addClass("not_valid");
        return false;
    }
    else {
        if ($("#password_authentication").hasClass("not_valid"))
            $("#password_authentication").removeClass("not_valid");
        document.getElementById("feedback_password_authentication").innerHTML = "";
    }
    return true;
}
//*******************************************************************************************
// Change Password 
//*******************************************************************************************
function ChangePassword() {
    if (CheckNewPassword())//אם הכל בסדר
    {
        UpdateUserPassword();
    }
    else
        alert("אנא תקן את המקומות המסומנים.!");
}
//*******************************************************************************************
//UpdateUserPassword
//*******************************************************************************************
function UpdateUserPassword() {
    var new_password = document.getElementById("new_password").value;
    LOGIN_USER.pasword = new_password;
    GlobalAjax("/api/User/UpdateUserInfo", "PUT", LOGIN_USER, SuccessUpdateUserPassword, FailUpdateUserPassword);
}
function SuccessUpdateUserPassword() {
    //var new_password = document.getElementById("new_password").value;
    //LOGIN_USER.pasword = new_password;
    sessionStorage.setItem("Login_User", JSON.stringify(LOGIN_USER));

    $("#btnEdit").prop('disabled', true);
    $("#new_password").prop('disabled', true);
    $("#password_authentication").prop('disabled', true);

    document.getElementById("old_password").value = "";
    document.getElementById("new_password").value = "";
    document.getElementById("password_authentication").value = "";

    alert("הסיסמה הוחלפה בהצלחה!.");
}
function FailUpdateUserPassword() {
    alert("שגיאה בהחלפת סיסמה!.");
}
//*******************************************************************************************
//ShowPassword
//*******************************************************************************************
function ShowPassword(_btn_id) {
    var arry = _btn_id.split("_");
    var _id = arry[1] + '_' + arry[2];
    var _element = document.getElementById(_id).setAttribute('type', 'input');
    var icom = document.getElementById(_btn_id).setAttribute('onclick', 'HidePassword(this.id)');
}
//*******************************************************************************************
//HidePassword
//*******************************************************************************************
function HidePassword(_btn_id) {
    var arry = _btn_id.split("_");
    var _id = arry[1] + '_' + arry[2];
    var _element = document.getElementById(_id).setAttribute('type', 'password');
    var icom = document.getElementById(_btn_id).setAttribute('onclick', 'ShowPassword(this.id)');
}

//*******************************************************************************************
// ShowPopup
//*******************************************************************************************
function ShowPopup(_id) {
    var words = _id.split('_');
    var name = words[2];
    if (words.length > 3)
        name = name.concat("_" + words[3]);
    name = name.concat("_popup");
    var popup = document.getElementById(name);
    popup.classList.toggle("show_popup");
}