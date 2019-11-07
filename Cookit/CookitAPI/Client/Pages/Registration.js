//משתנים גלובליים
//רשימת הערים ממסד הנתונים
var arry_city = new Array();
// רשימת סוגי המשתמשים
var arry_userType = null;
//האם למשתמש יש פרופיל
var isHasProfile = false;
//רשימת הנתונים התקינים בטופס
var user_validation = {
    first_name: true,
    last_name: true,
    email: true,
    password: true,
    pass_auth: true,
    user_type: true
};
var profile_validation = {
    name: true,
    description: true,
    city: true
};
//תז משתמש
var user_id;
//***************************************************************************//
// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    // הבאת סוגי המשתמשים
    GetUserType();
});
//***************************************************************************//
function GetUserType()
// הפונקציה מביאה את סוגי המשתמשים מהמסד נתונים
{
    if (JSON.parse(sessionStorage.getItem('arry_userType')) == null)
    // כדי לקורא רק פעם אחת
    {
        GlobalAjax("/api/UserType/GetAll", "GET", "", SuccessUserType, FailUserType);
    }
    else
        SuccessUserType(JSON.parse(sessionStorage.getItem('arry_userType')));
}

function SuccessUserType(arry_userType) {
    console.log(arry_userType);
    sessionStorage.setItem("arry_userType", JSON.stringify(arry_userType));
    initUserType(arry_userType);
}

function FailUserType() {
    console.log("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.');
}
function initUserType(data)
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
{
    var str;
    for (i in data) {
        if (data[i].user_type !== "מנהל")
            $("#select_user_type").append(AddOption_UserType(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_UserType(item) {
    return '<option value="' + item.id + '">' + item.user_type + '</option>';
}
//***************************************************************************//
function GetCities()
//הפונקציה מביאה את רשימת הערים ממסד הנתונים
{
    if (JSON.parse(sessionStorage.getItem('arry_city')) == null)
    // כדי לקורא רק פעם אחת
    {
        GlobalAjax("/api/City/GetAllCities", "GET", "", SuccessCity, FailCity);
    }
    //else
    //    SuccessCity(JSON.parse(sessionStorage.getItem('arry_city')));
}

function SuccessCity(arry_city) {
    sessionStorage.setItem("arry_city", JSON.stringify(arry_city));
    initCities(arry_city);
}

function FailCity() {
    console.log("שגיאה במשיכת נתוני הערים מהשרת.");
    alert('שגיאה במשיכת נתוני הערים מהשרת.');
}
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initCities(data) {
    var str;
    for (i in data) {
        $("#select_city").append(AddOption_city(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_city(item) {
    return '<option value="' + item.city_name + '">' + item.city_name + '</option>';
}

//***************************************************************************//
// פונקציה שבודקת האם הלקוח הוא מסוג שדורש פרופיל
// אם כן - מציגה בטופס את החלק אותו צריך למלא
function IsProfile() {
    var user_type = $('#select_user_type').find(":selected").text();
    if(user_type === "אנין טעם" || user_type === "עסקי") 
    {
        isHasProfile = true;
        //הבאת הערים ממסד הנתונים
        GetCities();        
        //הצגת פרטי הפרופיל       
        document.getElementById("Profile_details").style.display = "block";
    }
    else {
        isHasProfile = false;
        document.getElementById("Profile_details").style.display = "none";
    }
    document.getElementById("Profile_details").reload; // טעינת הדף מחדש

}
//***************************************************************************//
function Check_valid_Email() {
    var new_email = $("#email").val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(new_email).toLowerCase()) == true)
        user_validation.email = true;
    else {
        user_validation.email = false;
        console.log("email is not valid");
        alert("אנא הכנס אימייל חוקי!.");
        return false;
    }
    return true;
}
//***************************************************************************//

function Check_EmailFree() {
    var new_email = $("#email").val();
    GlobalAjax("/api/User/" + new_email + "/CheckMailAvailable", "GET", "", IsEmailFree, Fail_CheckMailFree);//Success_CheckMailFree, Fail_CheckMailFree);   
}
function IsEmailFree(data) {
    if (data)//אם חופשי
    {
        user_validation.email = true;
        console.log("the email " + $("#user_email").val() + " is free");
        Registration();
    }
    else {
        user_validation.email = false;
        console.log("the email " + $("#user_email").val() + " is not free");
        alert("כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.");
    }
}
function Fail_CheckMailFree(data) {
    user_validation.email = false;
    console.log("ישנה תקלה בשרת, אנא נסה להרשם המועד אחר!.");
    Console.log(data);
    alert("ישנה תקלה בשרת, אנא נסה להרשם המועד אחר!.");
} 
/*
function Success_CheckMailFree() {
    user_validation.email = true;
    console.log("the email " + $("#user_email").val() + " is free");

    Registration();
}

function Fail_CheckMailFree() {
    user_validation.email = false;
    console.log("the email " + $("#user_email").val() + " is not free");
    alert("כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.");
} 
*/
//***************************************************************************//
function Check_Password() // פונקציה בודקת שהסיסמה זהה לאימות סיסמה
{
    var password = $("#password").val(); //הסיסמה
    var flag = true;
    //Validate length
    if (!(password.length >= 6 && password.length <= 12)) {
        user_validation.password = false;
        flag = false;
    }
    //Validate lowercase and uppercase letters
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    if (!(password.match(lowerCaseLetters) || password.match(upperCaseLetters))) {
        user_validation.password = false;
        flag = false;
    }
    //Validate numbers
    var numbers = /[0-9]/g;
    if (!(password.match(numbers))) {
        user_validation.password = false;
        flag = false;
    }
    if (flag) {
        user_validation.password = true;
        //password authentication
        var pass2 = $("#password_authentication").val();
        if (!(password === pass2)) {
            user_validation.pass_auth = false;
            flag = false;
            alert("אנא וודא שהסיסמה זהה לאימות סיסמה.");
        }
        else
            user_validation.pass_auth = true;
    }
    else {
                alert("הסיסמה צריכה להיות באורך של 6 עד 12 תווים המורכבת ממספרים ואותיות קטנות או גדולות באנגלית!.");
    }
    return flag;
    /*
    let password = $("#password").val(); //הסיסמה
    let flag = true;
    //Validate length
    if (password.length >= 6 && password.length <= 12) {
        user_validation.password = true;
    }
    else {
        user_validation.password = false;
        flag = false;
    }
    if (flag) {
        //Validate lowercase and  letters
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        if (password.match(lowerCaseLetters) || password.match(upperCaseLetters)) {
            user_validation.password = true;
        }
        else {
            user_validation.password = false;
            flag = false;
        }
        if (flag) {
            //Validate numbers
            var numbers = /[0-9]/g;
            if (password.match(numbers)) {
                user_validation.password = true;
            }
            else {
            user_validation.password = false;
                flag = false;
            }
            if (flag) {
                //if password equal to password authentication
                let pass1 = $("#password").val();
                let pass2 = $("#password_authentication").val();
                if (pass1 === pass2) {
                    user_validation.pass_auth = true;
                }
                else {
                    user_validation.pass_auth = false;
                    flag = false;
                    alert("אנא וודא שהסיסמה זהה לאימות סיסמה.");
                }
            }
            else
                alert("הסיסמה צריכה להיות באורך של 6 עד 12 תווים המורכבת ממספרים ואותיות קטנות או גדולות באנגלית!.");
        }
    }
    return flag;
    */
}
//***************************************************************************//
function Check_ifEmpty() {
    var user_info = {
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        pass_auth: $("#password_authentication").val(),
        user_type: $('#select_user_type').find(":selected").val()
    };
    var flag = true;
    for (var i in user_info) {
        if (user_info[i] == "") {
            user_validation[i] = false;
            console.log(i + " is missing.");
            flag = false;
        }
        else {
            user_validation[i] = true;
        }
    }
    if (isHasProfile) {
        var profile_info = {
            name: $("#profile_name").val(),
            description: $("#profile_description").val(),
            city: $('#select_city').find(":selected").val()
        };
        for (var j in profile_info) {
            if (profile_info[j] == "") {
                profile_validation[j] = false;
                console.log(i + " is missing.");
                flag = false;
            }
            else {
                profile_validation[j] = true;
            }
        }
    }
    if (!flag)
        alert("אנא מלא את הפרטים החסרים המסומנים באדום!.");
    return flag;
}

//***************************************************************************//

function Check_Length()
//הפונקציה בודקת האם השדות באורך בנכון
{
    var new_user_info = {
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        email: $("#email").val()
    };
   
    var flag = true;
    //פרטים אישיים
    //שם פרטי
    if (new_user_info.first_name.length >= 2 && new_user_info.first_name.length <= 20)
        user_validation.first_name = true;
    else {
        user_validation.first_name = false;
        alert("שם פרטי ושם משפחה חייבים להיות באורך של לפחות 2 תווים");
        flag = false;
    }
    //שם משפחה
    if (new_user_info.last_name.length >= 2 && new_user_info.last_name.length <= 30)
        user_validation.last_name = true;
    else {
        user_validation.last_name = false;
        alert("שם פרטי ושם משפחה חייבים להיות באורך של לפחות 2 תווים");
        flag = false;
    }
    //אימייל
    if (new_user_info.email.length >= 2 && new_user_info.email.length <= 30)
        user_validation.email = true;
    else {
        user_validation.email = false;
        alert("שם פרטי, שם משפחה ואימייל חייבים להיות באורך של לפחות 2 תווים");
        flag = false;
    }
    //פרטי פרופיל
    if (isHasProfile) {
        var new_profile_info = {
        name: $("#profile_name").val(),
        desc: $("#profile_description").val()
        };
        //שם פרופיל
        if (new_profile_info.name.length > 30) {
            profile_validation.name = false;
            flag = false;
        }
        else
            profile_validation.name = true;
        //תיאור פרופיל
        if (new_profile_info.desc > 250) {
            profile_validation.description = false;
            flag = false;
        }
        else
            profile_validation.description = true;
    }
    return flag;
}
//*****************************************************************************************//

function Change_style_by_validation()
//הפונקציה בודקת איזה פריט לא תקין ומסמנת אותו
{
    var user_inputs =
    {
        first_name: $("#first_name"),
        last_name: $("#last_name"),
        email: $("#email"),
        password: $("#password"),
        pass_auth: $("#password_authentication"),
        user_type: $('#select_user_type')
    };

    for (var i in user_validation) {
        if (user_validation[i] == false)
            user_inputs[i].addClass(" not_valid");
        else {
            if (user_inputs[i].hasClass("not_valid"))
                user_inputs[i].removeClass("not_valid");
        }
    }
    if (isHasProfile) {
        var profile_inputs = {
                name: $("#profile_name"),
                description: $("#profile_description"),
            city: $('#select_city')
        };
        for (var j in profile_validation) {
            if (profile_validation[j] == false)
                profile_inputs[j].addClass(" not_valid");
            else {
                if (profile_inputs[j].hasClass("not_valid"))
                    profile_inputs[j].removeClass("not_valid");
            }
        }
    }
}
//*****************************************************************************************//
    function IsFormValid() // הפונקציה בודקת הנתוני הטופס תקינים 
    {
        if (Check_ifEmpty()) {
            if (Check_Length()) {
                if (Check_Password())
                {
                    if (Check_valid_Email()) {
                        Check_EmailFree();
                    }
                }
            }
        }
        Change_style_by_validation();
    }

    //***************************************************************************//
    //פונקצית הרשמה
function Registration() {
    AddNewUser();
    
}
    //***************************************************************************//
    function SuccessRegistration() {
        //כאשר ההרשמה בוצע בהצלחה
        console.log("הרשמה בוצעה בהצלחה!.");
        alert("ההרשמה בוצעה בהצלחה. כעת את יכול להתחבר לחשבונך.");
    }
    //***************************************************************************//

    function AddNewUser()// הפונקציה שולחת את פרטי המשתמש לשרת
    {    //משתמש חדש
        var new_user = {
            user_type: parseInt($('#select_user_type').find(":selected").val()),
            first_name: ($("#first_name").val()).toString(),
            last_name: ($("#last_name").val()).toString(),
            email: ($("#email").val()).toString(),
            gender: ($("input[name='gender']:checked").val()).toString(),
            pasword: ($("#password").val()).toString(),
            status: true,
            number_of_draw_recipe: 0
        };
        //שליחת הנתונים לשרת
        GlobalAjax("/api/User/AddNewUser", "POST", new_user, SuccessUser, FailUser);
    }

    function SuccessUser() // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
    {
        console.log("המשתמש נוסף לשרת בהצלחה.");
        if (isHasProfile)
            GetUserIdByEmail();
        else
            alert('ההרשמה בוצעה בהצלחה.');
    }

    function FailUser(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
    {
        console.log("שגיאה בהוספת המשתמש לשרת.");
        console.log(data.T);
        alert('שגיאה בהוספת המשתמש לשרת.');
    }
//***************************************************************************//
function GetUserIdByEmail() {
    var email = $("#email").val();
    GlobalAjax("/api/User/"+ email+"/GetUserIdByEmail", "GET", "", Success_GetUserIdByEmail, Fail_GetUserIdByEmail);
}

function Success_GetUserIdByEmail(user_id) {
    console.log("user id = " + user_id);
    AddNewProfile(user_id);
}

function Fail_GetUserIdByEmail(data) {
    console.log("error, can't get user id by his mail.");
    console.log(data);
    alert("ישנה תקלה כעת בשרת, אנא נסה להרשם במועד אחר!.");
}
//***************************************************************************//

    function AddNewProfile(user_id)// הפונקציה שולחת את פרטי משתמש לשרת
    {
        var profile_type = $('#select_user_type').find(":selected").text(); // סוג פרופיל
        let _type;
        if (profile_type === 'עסקי')
            _type = 'B';
        else
            _type = 'F';
        //פרופיל חדש
        var new_profile = {
            user_id: user_id,
            type: _type,
            name: $("#profile_name").val(),
            description: $("#profile_description").val(),
            city: $('#select_city').find(":selected").val(),
            status: true
        };
        //שליחת הנתונים לשרת
        GlobalAjax("/api/Profile/AddNewProfile", "POST", new_profile, SuccessProfile, FailProfile);
    }

    function SuccessProfile() // פונקציה המתבצעת אחרי הוספה מוצלחת של פרופיל
    {
        console.log("הפרופיל נוסף לשרת בהצלחה.");
        alert('ההרשמה בוצעה בהצלחה.');
    }

    function FailProfile()// פונקציה המתבצעת אחרי כישלון הוספה  של פרופיל
    {
        console.log("שגיאה בהוספת הפרופיל לשרת.");
        alert('שגיאה בהוספת הפרופיל לשרת.');
}
//***************************************************************************//
function DisplayFormDirection(btn_cliked_id) {
    // get the id of the mutch span
    var span_name = "div_question";
    var words = btn_cliked_id.split('_');
    for (var i = 0; i < words.length; i++) {
        if (i !== 0) {
            span_name = span_name.concat("_"+words[i]);
        }
    }
    // יש בעיה בהצגה, בכל פעם מרענן את כל הדף ומחק מידע שנרשם
    //display on\off the span
    var display_state = $("#" + span_name).css('display');
    if (display_state == 'none')
        //$("#" + span_name).show('slow');
        $("#" + span_name).style.display = "block";
    else
        //$("#" + span_name).hide('slow');    
        $("#" + span_name).style.display = "none";
    //$("#" + span_name).reload; // טעינת הדף מחדש
    
}


