//*******************************************************************************************
// CheckingMail
//*******************************************************************************************
//פונקצית בדיקת קיימות המייל
function CheckingMail() {
        var email = $("#email").val();
GlobalAjax("/api/User/" + email+"/SendMail","GET", "", SuccessSendMail4ResetPassword, FailSendMail4ResetPassword);
/*
    GlobalAjax("/api/User/" + email + "/CheckMailAvailable", "GET", "", SendMail4ResetPassword, FailCheckMail);//Success_CheckMailFree, Fail_CheckMailFree);   
*/
}

function FailCheckMail(data) {
    console.log("that mail doesn't exsist.");
    console.log(data.T);
    alert("שגיאה השרת אינו יכול כעת לשחזר את סיסמתך.");
}
//*******************************************************************************************
// SendMail4ResetPassword
//*******************************************************************************************
function SendMail4ResetPassword(data)
{
    var email = $("#email").val();
    if (data)//אם המייל לא קיים
    {  console.log("mail not exsist.");
        alert("אנא הכנס אימייל קיים!.");
    }
    else {
            console.log("mail exsist.");
        //מעבר לשליחת מייל
        GlobalAjax("/api/User/" + email, "/SendMail","GET", "", SuccessSendMail4ResetPassword, FailSendMail4ResetPassword);
    }
}

function SuccessSendMail4ResetPassword() {
    console.log("מייל עם הסיסמה שלך נשלח לחשבונך בהצלחה!.");
    alert("מייל עם הסיסמה שלך נשלח לחשבונך בהצלחה!.");
}

function FailSendMail4ResetPassword() {
    console.log("השרת כעת אינו יכול לשלוח מייל לשחזור הסיסמה!.");
    alert("השרת כעת אינו יכול לשלוח מייל לשחזור הסיסמה!.");
}
//*******************************************************************************************
// CheckIfEmailValid
//*******************************************************************************************
function CheckIfEmailValid()
//הפונקציה בודקת איזה פריט לא תקין ומסמנת אותו
{
    var email_value = $("#email").val();
    var email_input = document.getElementById("email");
    var email_feedback = document.getElementById("feedback_email");

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email_value == undefined || email_value == "" || email_value == null) {
        email_feedback.innerHTML = "אנא הכנס אימייל!";
        email_input.classList.add("not_valid");
    }
    else if (!(email_value.length <= 50)) {
        email_feedback.innerHTML = "אנא הכנס אמייל באורך עד 50 תווים!";
        email_input.classList.add("not_valid");
    }
    else if (re.test(String(email_value).toLowerCase()) == false) {
        email_feedback.innerHTML = "אנא הכנס אימייל תקין!.";
        email_input.classList.add("not_valid");
}
    else {
        email_feedback.innerHTML = "";
        if (email_input.classList.contains("not_valid"))
            email_input.classList.remove("not_valid");
        //כשהמייל תקין
        CheckingMail();
    }
}
