var EXPLANATION_PASSWORD = "הסיסמה באורך 6 עד 12 תווים, מכילה לפחות מספר אחד, ואות באנגלית.";
var EXPLANATION_EMAIL = "אימייל צריך להיות באנגלית ועם הסימנים @ו .";
//*******************************************************************************************
// globals variables
//*******************************************************************************************


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
    //console.log("login success!.");
    //alert("login success!.");
    // שמירת המשתמש המחובר והעברה לדף הבית
    sessionStorage.setItem("Login_User", JSON.stringify(user));
    //בדיקה האם למשתמש יש גם פרופיל, אז להביא גם את הפרטים האלה
    if (user.user_type == 2 || user.user_type == 3)
        GlobalAjax("/api/Profile/GetProfileByUserId/" + user.id, "GET", "", SuccessProfile, FailProfile);
    else   //מעבר לדף הבית המחובר
        window.location.replace("Home_login.html");

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

//*******************************************************************************************
// SHOW HIDE EXPLANATION
//*******************************************************************************************
function ShowHideExplanation(btn_cliked_id) {
    var div_name = "explanation_";
    var words = btn_cliked_id.split('_');
    div_name = div_name.concat(words[2]);
    if (words.length > 3)
        div_name = div_name.concat("_" + words[3]);
    //display on\off the span
    var str = document.getElementById(div_name).innerHTML;
    if (str == "") {
        if (btn_cliked_id == "btn_explanation_password")//אם סיסמה
            document.getElementById(div_name).innerHTML = EXPLANATION_PASSWORD;
        else
            document.getElementById(div_name).innerHTML = EXPLANATION_EMAIL;
    }
    else
        document.getElementById(div_name).innerHTML = "";
}

