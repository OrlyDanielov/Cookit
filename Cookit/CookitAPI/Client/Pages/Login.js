//// הפונקציה מתרחשת בטעינת הדף
//$(document).ready(function () {

//});


var user = new Array();
//פונקצית התחברות
function LoginVerification() {
      // פרטי המשתמש הנכנס
    var email = $("#inputEmail").val();
    var pass = $("#inputPassword").val();  
    GlobalAjax("/api/User/" + email + '/' + pass, "GET", "", SuccessLogin, FailLogin);

}

// פןנקציה של הצלחת זיהוי המשתמש
function SuccessLogin(user) {
       // שמירת המשתמש המחובר והעברה לדף הבית
    sessionStorage.setItem("Login_User", JSON.stringify(user));
    //בדיקה האם למשתמש יש גם פרופיל, אז להביא גם את הפרטים האלה
    if (user.user_type == 2 || user.user_type == 3)
        GlobalAjax("/api/Profile/GetProfileByUserId/" + user.id, "GET", "", SuccessProfile, FailProfile);
    else
        window.location.replace("Home_login.html"); //מעבר לדף הבית המחובר

}

//פונקציה של אי הצלחת זיהוי המשתמש
function FailLogin() {
    console.log("login fail!.");
    alert("אימייל או סיסמה לא נכונים. אנא נסה שנית.");
}

function SuccessProfile(profile) {
    sessionStorage.setItem("Login_Profile", JSON.stringify(profile));
    window.location.replace("Home_login.html"); //מעבר לדף הבית המחובר
}

function FailProfile() {
    console.log("cant find match profile!.");

}



