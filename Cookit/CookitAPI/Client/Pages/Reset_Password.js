//*******************************************************************************************
// CheckingMail
//*******************************************************************************************
//פונקצית בדיקת קיימות המייל
function CheckingMail() {
    var email = $("#txt_mail").val();
    GlobalAjax("/api/User/CheckMail/" + email , "GET", "", SuccessCheckMail, FailCheckMail);
}

function SuccessCheckMail() {
    console.log("mail exsist.");
    alert("אימייל זה  קיים..");
    //מעבר לשליחת מייל
    GlobalAjax("/api/User/SendMail/" + email, "GET", "", SuccessSendMail, FailSendMail);

}

function FailCheckMail(data) {
    console.log("that mail doesn't exsist.");
    console.log(data.T);
    alert("אימייל זה לא קיים. אנא נסה שנית.");
}

function SuccessSendMail() {

}

function FailSendMail() {

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
