var valid_user_info = {
    first_name: false,
    last_name: false,
    email: false};

var userInfo = new Array();
userInfo = JSON.parse(sessionStorage.getItem("Login_User"));
//var arry_userType = new Array();

$(document).ready(function ()
//בטעינת הדף
{
    //$("#btnEdit").style.visibility = "none";
    //$("#btnSave").style.visibility = "hidden";
    //GetUserType();
    //sessionStorage.setItem("arry_userType", JSON.stringify(arry_userType));
    //arry_userType = JSON.parse(sessionStorage.getItem("arry_userType"));
    //initUserType();
    ViewUserInfo();


});

//function GetUserType()
//// הפונקציה מביאה את סוגי המשתמשים מהמסד נתונים
//{
//    GlobalAjax("/api/UserType/GetAll", "GET", "", SuccessUserType, FailUserType);
//}

//function SuccessUserType(arry_userType) {
//    console.log(arry_userType);
//    sessionStorage.setItem("arry_userType", JSON.stringify(arry_userType));
//    initUserType();
//}

//function FailUserType() {
//    console.log("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
//    alert('שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.');
//}

//function initUserType()//data)
////הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
//{
//    for (i in arry_userType) {
//        if (arry_userType[i].user_type !== "מנהל")
//            $("#select_user_type").append(AddOption_UserType(arry_userType[i]));
//    }
//}

function AddOption_UserType(item)
//הפונקציה מוסיפה אופציה לרשימה הנגללת
{
    return '<option value="' + item.id + '">' + item.user_type + '</option>';
}

function ViewUserInfo()
//הצגת פרטים אישיים
{
    $("#user_first_name").val(userInfo.first_name);
    $("#user_last_name").val(userInfo.last_name);
    $("#user_email").val(userInfo.email);
    //מין המשתמש
    if (userInfo.gender === "F") {
        $("#female").prop('checked', true);
        $("#male").prop('checked', false); 
    }
    else {
        $("#female").prop('checked', false);
        $("#male").prop('checked', true);         
    }
    //סוג משתמש
    //$('#select_user_type[value="' + userInfo.user_type + '"]').attr('selected', true);
}

function Edit()
//עריכת פרטים אישיים
{
    //מאפשר את הקלטים לצורך עריכה
    $("#user_first_name").prop('disabled', false); 
    $("#user_last_name").prop('disabled', false); 
    $("#user_email").prop('disabled', false); 
    //$("#select_user_type").prop('disabled', false); 
    $("#female").prop('disabled', false); 
    $("#male").prop('disabled', false); 
    //משנה את כפתור העריכה לשמירה עבור השינויים
    //$("#btnEdit").style.display = 'none';//.prop('visibility', 'hidden');//.style.visibility = "hidden";
    //$("#btnSave").style.display = 'inline';//.visibility = "visible";//$("#btnSave").prop('visibility', 'visible');  
    $("#btnSave").prop('disabled', false);
}

function Check_valid_Email() {
    var old_email = userInfo.email;
    var new_email = $("#user_email").val();
    if (new_email != null) {
        if (new_email == old_email)
            valid_user_info.email = true;
        else {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(new_email).toLowerCase()) == true)
                valid_user_info.email = true;
            else {
                valid_user_info.email = false;
                console.log("email is not valid");
            }
        }
    }
    else {
        valid_user_info.email = false;
        console.log("email is not valid");
    }
}

function Check_EmailFree() {
    var new_email = $("#user_email").val();
    GlobalAjax("/api/User/" + new_email + "/CheckMailAvailable", "GET", "", Success_CheckMailFree, Fail_CheckMailFree);
}

function Success_CheckMailFree() {
    valid_user_info.email = true;
    console.log("the email " + $("#user_email").val() + " is free");
    //
    SaveChanges();
}

function Fail_CheckMailFree() {
    valid_user_info.email = false;
    console.log("the email " + $("#user_email").val() + " is not free");
}

function Check_validation()
//הפונקציה בודקת את התקינות של שדות הטופס
{
    //בודק האם ריק
    var new_user_info = {
        first_name: $("#user_first_name").val(),
        last_name: $("#user_last_name").val(),
        email: $("#user_email").val()
    };
    for (var i in new_user_info) {
        if (new_user_info[i] == "") {
            valid_user_info[i] = false;
            console.log(i + " is missing.");
            // לרשומות החסרות יופיעו תוויות הערה למשתמש
        }
        else
            valid_user_info[i] = true;

    }
    //בודק האם חוקי
    Check_valid_Email();
    if (valid_user_info.email == true)
            Check_EmailFree();
}

function SaveChanges()
//שמירת שינויים בפרטים אישיים
{
        if (confirm("האם אתה רוצה לשמור את השינוי?")) {

            //שמירת הפרטים המעודכנים בsesstion storage
            userInfo.first_name = $("#user_first_name").val();
            userInfo.last_name = $("#user_last_name").val();
            userInfo.email = $("#user_email").val();
            userInfo.gender = $("input[name='gender']:checked").val();
            //userInfo.user_type = $('#select_user_type').find(":selected").val();
            sessionStorage.setItem("Login_User", JSON.stringify(userInfo));

            //עדכון פרטים אישיים בשרת
            GlobalAjax("/api/User/UpdateUserInfo", "PUT", userInfo, SuccessUpdate, FailUpdate);

            //שינוי מצב הכפתורים והקלטים
            $("#user_first_name").prop('disabled', true);
            $("#user_last_name").prop('disabled', true);
            $("#user_email").prop('disabled', true);
            //$("#select_user_type").prop('disabled', true);
            $("#female").prop('disabled', true);
            $("#male").prop('disabled', true);

            $("#btnSave").prop('disabled', true);
            $("#btnEdit").prop('disabled', false);
        }
}

function SuccessUpdate(isHasProfile) // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
{
    console.log('הפרטים האישיים עודכני בהצלחה!.');
    alert('הפרטים האישיים עודכני בהצלחה!.');
}
function FailUpdate(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בעדכון פרטים אישיים.");
    console.log(data);
    alert('שגיאה בעדכון פרטים אישיים.');
}
