var valid_user_info = {
    first_name: false,
    last_name: false,
    email: false
};

var form_inputs =
{
    first_name: $("#user_first_name"),
    last_name: $("#user_last_name"),
    email: $("#user_email")
};

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
    var new_email = $("#user_email").val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(new_email).toLowerCase()) == true)
        valid_user_info.email = true;
    else {
        valid_user_info.email = false;
        console.log("email is not valid");
        alert("אנא הכנס אימייל חוקי");
        //Change_style_by_validation();
        return false;
    }
    //Change_style_by_validation();
    return true;   
}

function Check_EmailFree() {
    var new_email = $("#user_email").val();
    var old_email = userInfo.email;
    if (new_email != old_email)
        GlobalAjax("/api/User/" + new_email + "/CheckMailAvailable", "GET", "", Success_CheckMailFree, Fail_CheckMailFree);
    else
        Success_CheckMailFree();
}

function Success_CheckMailFree() {
    valid_user_info.email = true;
    //Change_style_by_validation();
    console.log("the email " + $("#user_email").val() + " is free");
    //
    Change_style_by_validation();
    SaveChanges();
}

function Fail_CheckMailFree() {
    valid_user_info.email = false;
    console.log("the email " + $("#user_email").val() + " is not free");
    alert("כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.");
    //Change_style_by_validation();
} 

function Check_ifEmpty()
// הפונקציה בודקת האם השדות לא ריקים
{
    var form_inputs = {
        first_name: $("#user_first_name"),
        last_name: $("#user_last_name"),
        email: $("#user_email")
    };
var new_user_info = {
        first_name: $("#user_first_name").val(),
        last_name: $("#user_last_name").val(),
        email: $("#user_email").val()
    };
    var flag =true;
    for (var i in new_user_info) {
        if (new_user_info[i] == "") {
            valid_user_info[i] = false;
            console.log(i + " is missing.");
            // לרשומות החסרות יופיעו תוויות הערה למשתמש
            //form_inputs[i].addClass(" not_valid");
            //return false;
            flag = false;
        }
        else {
            valid_user_info[i] = true;
            //if (form_inputs[i].hasClass("not_valid"))
            //    form_inputs[i].removeClass("not_valid");
        }
    }
    //Change_style_by_validation();
    //return true;
    return flag;
}

function Check_Length()
//הפונקציה בודקת האם השדות באורך בנכון
{
    var new_user_info = {
        first_name: $("#user_first_name").val(),
        last_name: $("#user_last_name").val(),
        email: $("#user_email").val()
    };
    var flag = true;
//שם פרטי
    if (new_user_info.first_name.length >= 2 && new_user_info.first_name.length <= 20)
        valid_user_info.first_name = true;
    else {
        valid_user_info.first_name = false;
        alert("שם פרטי ושם משפחה חייבים להיות באורך של לפחות 2 תווים");
        //return false;
        flag = false;
    }
    //שם משפחה
    if (new_user_info.last_name.length >= 2 && new_user_info.last_name.length <= 30)
        valid_user_info.last_name = true;
    else {
        valid_user_info.last_name = false;
        alert("שם פרטי ושם משפחה חייבים להיות באורך של לפחות 2 תווים");
        //return false;
        flag = false;
    }
    //אימייל
    if (new_user_info.email.length >= 2 && new_user_info.email.length <= 30)
        valid_user_info.email = true;
    else {
        valid_user_info.email = false;
        alert("שם פרטי, שם משפחה ואימייל חייבים להיות באורך של לפחות 2 תווים");
        //return false;
        flag = false;
    }
    //הכל טוב
    //return true;
    //Change_style_by_validation();
    return flag;
}

function Change_style_by_validation()
//הפונקציה בודקת איזה פריט לא תקין ומסמנת אותו
{
    var form_inputs =
    {
        first_name: $("#user_first_name"),
        last_name: $("#user_last_name"),
        email: $("#user_email")
    };
    for (var i in valid_user_info)
    {
        if (valid_user_info[i] == false)
            form_inputs[i].addClass(" not_valid");
        else
        {
            if (form_inputs[i].hasClass("not_valid"))
                form_inputs[i].removeClass("not_valid");
        }
    }    
}

function Check_validation()
//הפונקציה בודקת את התקינות של שדות הטופס
{
        //בודק האם ריק
    //if (!(Check_ifEmpty()))
    //alert("אנא מלא את השדות הריקים!.");
    if (Check_ifEmpty()) {
    //else {
        //בודק האם התוכן באורך הנכון
        if (Check_Length()) {
            //בודק האם חוקי
            if (Check_valid_Email()) {
                //if (valid_user_info.email == true)
                Check_EmailFree();
            }
            //else
            //    alert("אנא הכנס אימייל חוקי");
        }
        //else
        //    alert("שם פרטי ושם משפחה חייבים להיות באורך של לפחות 2 תווים");
    }
    Change_style_by_validation();
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
