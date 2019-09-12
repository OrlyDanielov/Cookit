// הפונקציה מתרחשת בטעינת הדף
$(document).ready(function () {
    // העלמת הLoading spinner
    //$("#loading_spinner").style.display = "none";
});


var user = new Array();
//פונקצית התחברות
function LoginVerification() {
    // הופעת ה Loading spinner
    //$("#loading_spinner").style.display = "true";

    // פרטי המשתמש הנכנס
    var email = $("#inputEmail").val();
    var pass = $("#inputPassword").val();  

    // בדיקה בשרת של זיהוי הלקוח
    GlobalAjax("/api/User/" + email + '/' + pass, "GET", "", SuccessLogin, FailLogin);

}

// פןנקציה של הצלחת זיהוי המשתמש
function SuccessLogin(user) {
    //console.log("login success!.");
    //alert("login success!.");
    // שמירת המשתמש המחובר והעברה לדף הבית
    sessionStorage.setItem("Login_User", JSON.stringify(user));
    //מעבר לדף הבית המחובר
    window.location.replace("Home_login.html");

}

//פונקציה של אי הצלחת זיהוי המשתמש
function FailLogin() {
    console.log("login fail!.");
    alert("אימייל או סיסמה לא נכונים. אנא נסה שנית.");
}

