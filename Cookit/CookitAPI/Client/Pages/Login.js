//פונקצית התחברות
function LoginVerification() {
    var user = {
        Email: $("#email").val(),
        UserPass: $("#password").val()
    };
    /*
    $.ajax({
        dataType: "json",
        url: "/api/User/" + user.pass,
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (data) {
            if (data.Email == user.Email) {
                alert("Logged succesful! ");
            }
            else {
                alert("doesn't have a match ");
            }
        },
        error: function () {
            alert("doesn't have a match");
        }
    });
    */
    // בדיקה בשרת של זיהוי הלקוח
    //GlobalAjax("/api/DishType", "GET", "", SuccessDishType, FailDishType);
}