//*******************************************************************************************
// globals variables
//*******************************************************************************************


var user = new Array();
//פונקצית התחברות
//*******************************************************************************************
// LOGIN
//*******************************************************************************************
function LoginVerification() {
    //הפעלת איקון אניצציה של טעינה
    document.getElementById("loading_icon").style.display = "block";
      // פרטי המשתמש הנכנס
    var email = $("#inputEmail").val();
    var pass = $("#inputPassword").val();  
    GlobalAjax("/api/User/" + email + '/' + pass, "GET", "", SuccessLogin, FailLogin);
}
function SuccessLogin(user)
// פןנקציה של הצלחת זיהוי המשתמש
{
    
    // שמירת המשתמש המחובר והעברה לדף הבית
    sessionStorage.clear();
    sessionStorage.setItem("Login_User", JSON.stringify(user));
    //בדיקה האם למשתמש יש גם פרופיל, אז להביא גם את הפרטים האלה
    if (user.user_type === 2 )
        GlobalAjax("/api/Profile/GetProfileByUserId/" + user.id, "GET", "", SuccessProfile, FailProfile);
    else   //מעבר לדף הבית המחובר
        window.location.replace("../login/Home.html"); //מעבר לדף הבית המחובר
}

function FailLogin()
//פונקציה של אי הצלחת זיהוי המשתמש
{
    //הפעלת איקון אניצציה של טעינה
    document.getElementById("loading_icon").style.display = "none";

    console.log("login fail!.");
    alert("אימייל או סיסמה לא נכונים. אנא נסה שנית.");
}

function SuccessProfile(profile) {
    sessionStorage.setItem("Login_Profile", JSON.stringify(profile));
    window.location.replace("../login/Home.html"); //מעבר לדף הבית המחובר
}

function FailProfile() {
    //הפעלת איקון אניצציה של טעינה
    document.getElementById("loading_icon").style.display = "none";

    console.log("cant find match profile!.");
    alert("שגיאה, לא מצליח למצוא נתוני פרופיל!.");
}
//*******************************************************************************************
// INPUT VALIDATION
//*******************************************************************************************
function CheckInputs()
//בודק האם הקלטים לא רייקים וחוקיים
{
    var password = $("#inputPassword").val();
    var password_input = document.getElementById("inputPassword");
    var password_feedback = document.getElementById("feedback_password");
    var email = $("#inputEmail").val();
    var email_input = document.getElementById("inputEmail");
    var email_feedback = document.getElementById("feedback_email");
    var flag = true;
    // email
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "") {
        email_input.classList.add("not_valid");
        email_feedback.innerHTML = "אנא הכנס אימייל!";
        flag = false;
    }
    else if (re.test(String(email).toLowerCase()) === false) {
        email_input.classList.add("not_valid");
        email_feedback.innerHTML = "אנא הכנס אימייל תקין!.";
        flag = false;
    }
    else {
        if (email_input.classList.contains("not_valid"))
            email_input.classList.remove("not_valid");
        email_feedback.innerHTML = "";
    }
    // password
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    if (password === "") {
        password_input.classList.add("not_valid");
        password_feedback.innerHTML = "אנא הכנס סיסמה!";
    }
    else {
        if (password_input.classList.contains("not_valid"))
            password_input.classList.remove("not_valid");
        password_feedback.innerHTML = "";
    }
    return flag;
}

//*******************************************************************************************
// CHECK IF FORM VALID
//*******************************************************************************************
function CheckIfFormValid() {
    if (CheckInputs())
        LoginVerification();
    else
        alert("אנא תקן את המקומות המסומנים.");
}
//*******************************************************************************************
//ShowPopup
//*******************************************************************************************
function ShowPopup(_id) {
    var words = _id.split('_');
    var name = words[2];
    if (words.length > 3)
        name = name.concat("_" + words[3]);
    name = name.concat("_popup");//password_popup//email_popup
    var popup = document.getElementById(name);
    popup.classList.toggle("show_popup");
    //if (popup.classList.contains("show_popup"))
    //    popup.classList.remove("show_popup");
    //else
    //    popup.classList.add("show_popup");
}
//*******************************************************************************************
//ShowPassword
//*******************************************************************************************
function ShowPassword(_btn_id) {
    //var arry = _btn_id.split("_");
    //var _id = arry[1];
    //if (arry.length > 2)
    //    _id += '_' + arry[2];
    var _element = document.getElementById("inputPassword").setAttribute('type', 'input');
    var icom = document.getElementById(_btn_id).setAttribute('onclick', 'HidePassword(this.id)');
}
//*******************************************************************************************
//HidePassword
//*******************************************************************************************
function HidePassword(_btn_id) {
    //var arry = _btn_id.split("_");
    //var _id = arry[1];
    //if (arry.length > 2)
    //    _id += '_' + arry[2];
    var _element = document.getElementById("inputPassword").setAttribute('type', 'password');
    var icom = document.getElementById(_btn_id).setAttribute('onclick', 'ShowPassword(this.id)');
}