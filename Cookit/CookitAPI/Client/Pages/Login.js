var user = new Array();
//פונקצית התחברות
function LoginVerification() {
    // פרטי המשתמש הנכנס
    var email = $("#email").val();
    var pass= $("#password").val();  

    // בדיקה בשרת של זיהוי הלקוח
    //GlobalAjax("/api/User/", "GET", JSON.stringify(user), SuccessLogin, FailLogin);
    GlobalAjax("/api/User/" + email + '/' + pass, "GET", "", SuccessLogin, FailLogin);

}

// פןנקציה של הצלחת זיהוי המשתמש
function SuccessLogin(user) {
    console.log("login success!.");
    alert("login success!.");
    // שמירת המשתמש המחובר והעברה לדף הבית
    sessionStorage.setItem("Login_User", JSON.stringify(user));
}

//פונקציה של אי הצלחת זיהוי המשתמש
function FailLogin() {
    console.log("login fail!.");
    alert("אימייל או סיסמה לא נכונים. אנא נסה שנית.");
}