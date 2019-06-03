//פונקצית הרשמה
function Regitration() {
    //משתמש חדש
    var new_user = {
        FirstName: document.getElementById("txt_first_name").value, //שם פרטי
        LastName: document.getElementById("txt_last_name").value, //שם משפחה
        Email: document.getElementById("txt_email").value, //שם אימייל 
        Gender: document.getElementById("radio-choice_gender").value, //מין
        UserPass: document.getElementById("txt_password").value//סיסמה
    };

    // שליחת נתונים לשרת
    $.ajax({
        dataType: "json",			                         //סוג הנתונים שאנחנו מצפים לקבל מהשרת
        url: "/api/Clothe",			                 //הכתובת לשרת ולפונקציה
        contentType: "application/json; charset=utf-8",	   //סוג הנתונים שאנחנו שולחים לשרת
        type: "POST",				                         //סוג הפעולה
        data: newItemString,			                 //הנתונים עצמם שאנחנו שולחים
        success: function (data) {                       //פונקציה  שתופעל לאחר הצלחה
            alert('המוצר התווסף למערכת בהצלחה!.');
        },
        error: function (data) {
            alert('error' + '\n' + data.error);

        }
    });