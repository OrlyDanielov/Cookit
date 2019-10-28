var userInfo = JSON.parse(sessionStorage.getItem("Login_User"));
var profileInfo = JSON.parse(sessionStorage.getItem("Login_Profile"));
var arry_userType = JSON.parse(sessionStorage.getItem("arry_userType"));//= JSON.parse(sessionStorage.getItem("arry_userType")); 

var isProfile = false;
var old_user_type;

var valid_user_info = {
    first_name: false,
    last_name: false,
    email: false
};

var profile_validation = {
    name: false,
    description: false,
    city: false
};

var cityArray = null;
//*****************************************************************************************//
$(document).ready(function ()
//בטעינת הדף
{
    initUserType();
    ViewUserInfo();
    if (userInfo.user_type != 4 && userInfo.user_type != 1) {
        isProfile = true;
        GetCity();
        document.getElementById("profile_view").style.display = "block";
        document.getElementById("profile_view").reload;
        ViewProfileInfo();
    }
});
//*****************************************************************************************//
function initUserType()
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
{
    var arry_userType = JSON.parse(sessionStorage.getItem("arry_userType"));
    for (var i in arry_userType) {
        if (arry_userType[i].user_type !== "מנהל")
            $("#select_user_type").append(AddOption_UserType(arry_userType[i]));
    }
}

function AddOption_UserType(item)
//הפונקציה מוסיפה אופציה לרשימה הנגללת
{
    return '<option value="' + item.id + '">' + item.user_type + '</option>';
}   
//*****************************************************************************************//


function CheckUserType() {
    var ols_user_type = userInfo.user_type;
    var new_user_type = $('#select_user_type').find(":selected").val();
    //אם יש פרופיל
    if (new_user_type == 2 || new_user_type == 3) {
        isProfile = true;
        GetCity();
        document.getElementById("profile_view").style.display = "block";
        document.getElementById("profile_view").reload;
        Edit_Profile_info();
        if (ols_user_type == 2 || ols_user_type == 3)
            ViewProfileInfo();        
    }
    else {
        isProfile = false;
        document.getElementById("profile_view").style.display = "none";
        document.getElementById("profile_view").reload;
    }   
}
//*****************************************************************************************//
function GetCity() {
    if (cityArray == null)
            GlobalAjax("/api/City", "GET", "", SuccessCity, FailCity);
}

function SuccessCity(arry_city) {
    cityArray = arry_city; 
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
        $("#profile_city").append(AddOption_city(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_city(item) {
    return '<option value="' + item.city_name + '">' + item.city_name + '</option>';
}
//*****************************************************************************************//

function ViewUserInfo()
//הצגת פרטים אישיים
{
    $("#user_first_name").val(userInfo.first_name);
    $("#user_last_name").val(userInfo.last_name);
    $("#user_email").val(userInfo.email);
    if (userInfo.gender === "F") {
        $("#female").prop('checked', true);
        $("#male").prop('checked', false); 
    }
    else {
        $("#female").prop('checked', false);
        $("#male").prop('checked', true);         
    }
    //$("#user_type").val(userInfo.user_type);
    //$('#select_user_type[value="' + userInfo.user_type + '"]').attr('selected', true);
    $('#select_user_type[value="' + userInfo.user_type + '"]').prop('selected', true);

}

function ViewProfileInfo()
//הצגת פרטי פרופיל
{
    $("#profile_name").val(profileInfo.name);
    $("#profile_description").val(profileInfo.description);
    $('#profile_city[value="' + profileInfo.city + '"]').prop('selected', true);   
}
//*****************************************************************************************//
function Edit()
//עריכת פרטים אישיים
{
    //מאפשר את הקלטים לצורך עריכה
    $("#user_first_name").prop('disabled', false); 
    $("#user_last_name").prop('disabled', false); 
    $("#user_email").prop('disabled', false); 
    $("#select_user_type").prop('disabled', false); 
    $("#female").prop('disabled', false); 
    $("#male").prop('disabled', false); 
    //משנה את כפתור העריכה לשמירה עבור השינויים
    Edit_User_info();
    if (isProfile)
        Edit_Profile_info();
  //משנה את כפתור העריכה לשמירה עבור השינויים
    //$("#btnEdit").style.display = 'none';//.prop('visibility', 'hidden');//.style.visibility = "hidden";
    //$("#btnSave").style.display = 'inline';//.visibility = "visible";//$("#btnSave").prop('visibility', 'visible');  
    $("#btnSave").prop('disabled', false);
}

function Edit_User_info() {
    //מאפשר את הקלטים לצורך עריכה
    $("#user_first_name").prop('disabled', false);
    $("#user_last_name").prop('disabled', false);
    $("#user_email").prop('disabled', false);
    $("#select_user_type").prop('disabled', false);
    $("#female").prop('disabled', false);
    $("#male").prop('disabled', false);
}

function Edit_Profile_info() {
    $("#profile_name").prop('disabled', false);
    $("#profile_description").prop('disabled', false);
    $("#profile_city").prop('disabled', false);
}
//*****************************************************************************************//

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
    //Change_style_by_validation();
    SaveChanges();
}

function Fail_CheckMailFree() {
    valid_user_info.email = false;
    console.log("the email " + $("#user_email").val() + " is not free");
    alert("כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.");
    //Change_style_by_validation();
} 
//*****************************************************************************************//

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
//*****************************************************************************************//

function Check_Length()
//הפונקציה בודקת האם השדות באורך בנכון
{
    var new_user_info = {
        first_name: $("#user_first_name").val(),
        last_name: $("#user_last_name").val(),
        email: $("#user_email").val()
    };
    var new_profile_info = {
        name: $("#profile_name").val(),
        desc: $("#profile_description").val(),
        city: profileInfo.city = $('#profile_city').find(":selected").val()
    };
    var flag = true;
    //פרטים אישיים
//שם פרטי
    if (new_user_info.first_name.length >= 2 && new_user_info.first_name.length <= 20)
        valid_user_info.first_name = true;
    else {
        valid_user_info.first_name = false;
        alert("שם פרטי ושם משפחה חייבים להיות באורך של לפחות 2 תווים");
        flag = false;
    }
    //שם משפחה
    if (new_user_info.last_name.length >= 2 && new_user_info.last_name.length <= 30)
        valid_user_info.last_name = true;
    else {
        valid_user_info.last_name = false;
        alert("שם פרטי ושם משפחה חייבים להיות באורך של לפחות 2 תווים");
        flag = false;
    }
    //אימייל
    if (new_user_info.email.length >= 2 && new_user_info.email.length <= 30)
        valid_user_info.email = true;
    else {
        valid_user_info.email = false;
        alert("שם פרטי, שם משפחה ואימייל חייבים להיות באורך של לפחות 2 תווים");
        flag = false;
    }
    //פרטי פרופיל
    if (isProfile) {
        if (new_profile_info.name.length > 30) {
            profile_validation.name = false;
            flag = false;
        }
        else
            profile_validation.name = true;

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
    var form_inputs =
    {
        user_first_name: $("#user_first_name"),
        user_last_name: $("#user_last_name"),
        user_email: $("#user_email"),
        profile_name: $("#profile_name"),
        profile_description: $("#profile_description")
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
    if (IsProfile) {
        for (var i in profile_validation) {
            if (profile_validation[i] == false)
                form_inputs[i].addClass(" not_valid");
            else {
                if (form_inputs[i].hasClass("not_valid"))
                    form_inputs[i].removeClass("not_valid");
            }
        }
    }
}
//*****************************************************************************************//

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
    //Change_style_by_validation();
}
//*****************************************************************************************//
function Block_Profile_btn()
//לא מאפשר את לעריכה את פרטי פרופיל
{
    $("#profile_name").prop('disabled', true);
    $("#profile_description").prop('disabled', true);
    $("#profile_city").prop('disabled', true);
}

function Block_User_btn()
//לא מאפשר את לעריכה את פרטי משתמש
{
    $("#user_first_name").prop('disabled', true);
    $("#user_last_name").prop('disabled', true);
    $("#user_email").prop('disabled', true);
    $("#select_user_type").prop('disabled', true);
    $("#female").prop('disabled', true);
    $("#male").prop('disabled', true);
}
/*function Save_User() {
    //שמירת הפרטים המעודכנים בsesstion storage
    userInfo.first_name = $("#user_first_name").val();
    userInfo.last_name = $("#user_last_name").val();
    userInfo.email = $("#user_email").val();
    userInfo.gender = $("input[name='gender']:checked").val();
    userInfo.user_type = $('#select_user_type').find(":selected").val();

    sessionStorage.setItem("Login_User", JSON.stringify(userInfo));

    //עדכון פרטים אישיים בשרת
    GlobalAjax("/api/User/UpdateUserInfo", "POST", userInfo, SuccessUpdateUser, FailUpdateUser);
}*/

function Save_Profile() {
    var new_user_type = $('#select_user_type').find(":selected").val();
    //מקרה של הוספת פרופיל
    if (old_user_type == 1 && (new_user_type == 2 || new_user_type == 3)) {
        var user_id = userInfo.user_id;
        //אם קיים למתשמש פרופיל לא פעיל
        //צריך לבדוק אם קיים פרופיל לא פעיל של משתמש זה ולעדכן אותו אחרת הוספה
        GlobalAjax("api/Profile/" + user_id+"/CheckProfileExsistByUserId", "GET", "", UpdateUnactiveProfile, AddNewProfile);
    }
    //עדכון פרופיל
    else if ((old_user_type == 2 && new_user_type == 3) || (old_user_type == 3 && new_user_type == 2))
        Update_profile();
    //הסרת פרופיל - כלומר עדכון הסטאטוס
    else if ((old_user_type == 2 || old_user_type == 3) && new_user_type == 1)
        UpdateProfileStatus();
}

function UpdateProfileStatus() {//הסרת פרופיל - כלומר עדכון הסטאטוס ללא פעיל
    profileInfo.status = 0;
    sessionStorage.removeItem("Login_Profile");
    GlobalAjax("/api/Profile/UpdateProfileInfo", "PUT", profileInfo, SuccessUpdateProfile, FailUpdateProfile);
}

function AddNewProfile() {//הוספת פרופיל חדש לחלוטין
    var new_user_type = $('#select_user_type').find(":selected").val();
    var type;
    if (new_user_type == 2)
        type = "F";
    else
        type = "B";
    var new_profile = {
        user_id: userInfo.id,
        type: type,
        name: $("#profile_name").val(),
        description: $("#profile_description").val(),
        city: $('#profile_city').find(":selected").val(),
        status: true
    };
    sessionStorage.setItem("Login_Profile", JSON.stringify(new_profile));

    GlobalAjax("/api/Profile/AddNewProfile", "POST", new_profile, SuccessUpdateProfile, FailUpdateProfile);
}

function UpdateUnactiveProfile(profile) {//עדכון פרופיל לא פעי ע םי נתונים מהשרת
    var p = { id, user_id, type, name, description, city, status };
    var new_user_type = $('#select_user_type').find(":selected").val();
    if (new_user_type == 2)
        p.type = "F";
    else
        p.type = "B";
    p.id = profile.id;
    p.user_id = profile.user_id;
    p.name = profile.name;
    p.description = profile.description;
    p.city = profile.city;
    p.status = true;

    sessionStorage.setItem("Login_Profile", JSON.stringify(p));

    GlobalAjax("/api/Profile/UpdateProfileInfo", "PUT", p, SuccessUpdateProfile, FailUpdateProfile);
}

function Update_profile() {//עדכון פרופיל לפי נתוני האתר
    var new_user_type = $('#select_user_type').find(":selected").val();
        if (new_user_type == 2)
        profileInfo.type = "F";
    else
        profileInfo.type = "B";
    profileInfo.name = $("#profile_name").val();
    profileInfo.description = $("#profile_description").val();
    profileInfo.city = $('#profile_city').find(":selected").val();

    sessionStorage.setItem("Login_Profile", JSON.stringify(profileInfo));

    GlobalAjax("/api/Profile/UpdateProfileInfo", "PUT", profileInfo, SuccessUpdateProfile, FailUpdateProfile);
}

function SaveChanges()
//שמירת שינויים בפרטים אישיים
{
    old_user_type = userInfo.user_type;
    if (confirm("האם אתה רוצה לשמור את השינוי?")) {
        //user
        //Save_User();
        /**/ 
        //שמירת הפרטים המעודכנים בsesstion storage
        userInfo.first_name = $("#user_first_name").val();
        userInfo.last_name = $("#user_last_name").val();
        userInfo.email = $("#user_email").val();
        userInfo.gender = $("input[name='gender']:checked").val();
        userInfo.user_type = $('#select_user_type').find(":selected").val();

        sessionStorage.setItem("Login_User", JSON.stringify(userInfo));

        //עדכון פרטים אישיים בשרת
        GlobalAjax("/api/User/UpdateUserInfo", "POST", userInfo, SuccessUpdateUser, FailUpdateUser);
        /**/
        //שינוי מצב הכפתורים והקלטים
        Block_User_btn();              
        $("#btnSave").prop('disabled', true);
        $("#btnEdit").prop('disabled', false);
/*
        if (isProfile) {
            //Profile
            Block_Profile_btn();
            Save_Profile(old_user_type);
        }
        */
    }
}

function SuccessUpdateUser() // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
{
    console.log('הפרטים האישיים עודכני בהצלחה!.');   

    var new_user_type = $('#select_user_type').find(":selected").val();
    //עבור הסרת פרופיל- מעדכנים סטאטוס ללא פעיל
    if ((old_user_type == 2 || old_user_type == 3) && new_user_type == 1)
        UpdateProfileStatus();
    //מקרה של הוספת פרופיל
    else if (old_user_type == 1 && (new_user_type == 2 || new_user_type == 3)) {
        var user_id = userInfo.user_id;
        //אם קיים למתשמש פרופיל לא פעיל
        //צריך לבדוק אם קיים פרופיל לא פעיל של משתמש זה ולעדכן אותו אחרת הוספה
        GlobalAjax("api/Profile/" + user_id + "/CheckProfileExsistByUserId", "GET", "", UpdateUnactiveProfile, AddNewProfile);
    }
    //עדכון פרופיל
    else if ((old_user_type == 2 && new_user_type == 3) || (old_user_type == 3 && new_user_type == 2))
        Update_profile();
    /*
    if (isProfile) {
        Block_Profile_btn();
        Save_Profile();
    }
    */
}

function FailUpdateUser(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בעדכון פרטים אישיים.");
    console.log(data);
    alert('שגיאה בעדכון פרטים אישיים.');
}

function SuccessUpdateProfile() // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
{
    console.log('פרטי הפרופיל עודכני בהצלחה!.');
    if (isProfile)
        AlertSuccsses2User();
}

function FailUpdateProfile(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בעדכון פרטי פרופיל.");
    console.log(data);
    alert('שגיאה בעדכון פרטי פרויפל.');
}

function AlertSuccsses2User() {
        alert('הפרטים עודכנו בהצלחה!.');
}
//*****************************************************************************************//
function DisplayFormDirection(btn_cliked_id) {
    // get the id of the mutch span
    var span_name = "span_question_";
    var words = btn_cliked_id.split('_');
    span_name = span_name.concat(words[1] + "_" + words[2]);    
    //display on\off the span
    var display_state = $("#" + span_name).css('display');
    if (display_state == 'none')
        $("#" + span_name).show('slow');
        //$("#" + span_name).prop('display', "block");
        //$("#" + span_name).style.display = 'block';
    else
        $("#" + span_name).hide('slow');
}