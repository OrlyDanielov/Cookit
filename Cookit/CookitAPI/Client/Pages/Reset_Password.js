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

function FailCheckMail() {
    console.log("that mail doesn't exsist.");
    alert("אימייל זה לא קיים. אנא נסה שנית.");
}

function SuccessSendMail() {

}

function FailSendMail() {

}

