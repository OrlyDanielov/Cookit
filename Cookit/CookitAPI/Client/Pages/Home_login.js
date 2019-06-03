//Link_Hello_to_User
// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    // הוספת הודעה : "שלום לקוח" + התנתקות
    var user_name = JSON.parse(sessionStorage.getItem("Login_User")).first_name;    // שם המשתמש המחובר
    $("#Link_Hello_to_User").html("שלום "+user_name);
});