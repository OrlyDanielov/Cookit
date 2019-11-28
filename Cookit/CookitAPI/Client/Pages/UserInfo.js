//*******************************************************************************************
// GLOBAL VARIABLE
//*******************************************************************************************
var ARRY_USER_TYPE = JSON.parse(sessionStorage.getItem("ARRY_USER_TYPE"));// var arry_userType = JSON.parse(sessionStorage.getItem("arry_userType"));//= JSON.parse(sessionStorage.getItem("arry_userType")); 
var ARRY_REGION = JSON.parse(sessionStorage.getItem("ARRY_CITY"));
var ARRY_CITY = JSON.parse(sessionStorage.getItem("ARRY_REGION"));

var USER_INFORMATION = JSON.parse(sessionStorage.getItem("Login_User"));
var PROFILE_INFORMATION = JSON.parse(sessionStorage.getItem("Login_Profile"));

var IS_PROFILE = false;
if (USER_INFORMATION.user_type == 2 || USER_INFORMATION.user_type == 3)
    IS_PROFILE = true;
else
    IS_PROFILE = false;
var old_user_type;

var USER_VALIDATION = {
    first_name: false,
    last_name: false,
    email: false,
    user_type: false
};
var PROFILE_VALIDATION = {
    name: false,
    description: false,
    city: false,
    region: false
};

//*******************************************************************************************
// UPLOAD PAGE
//*******************************************************************************************
$(document).ready(function ()
//בטעינת הדף
{
    EnterUserType();
    ViewUserInfo();
    if (IS_PROFILE) {
        document.getElementById("profile_view").style.display = "block";
        document.getElementById("profile_view").reload;
        ViewProfileInfo();
        GetCity();
    }
});
//*******************************************************************************************
// View Select One Opt Information
//*******************************************************************************************

function ViewSelectOneOptInformation(list_id, selected_value)
// מחפש את הערך המבוקש ברשימה והופך אותו לנחבר ע"מ שיראו אותו
{
    var slct_list = document.getElementById(list_id);
    var opt;
    for (var i = 0; i < slct_list.options.length; i++) {
        opt = slct_list.options[i];
        if (opt.value == selected_value)
            opt.selected = true;
    }
}

//*******************************************************************************************
// INIT DATA INTO DROP DOWN LIST
//*******************************************************************************************
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function EnterData2DDList(arry, ddList) {
    for (i in arry) {
        $("#" + ddList).append(AddOption(arry[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption(item) {
    var values = Object.values(item);//Object.keys(item);
    var x = values[0];
    var y = values[1];
    return '<option value="' + x + '">' + y + '</option>';
}

//*******************************************************************************************
// Enter User Type
//*******************************************************************************************

function EnterUserType() {
    var arr = ARRY_USER_TYPE;
    if (USER_INFORMATION.user_type != 4) { //אם לא מנהל
        for (var i = 0; i < ARRY_USER_TYPE.length; i++) {
            if (arr[i].id == 4)//מנהל
                arr.splice(i, 1);
        }
    }
    EnterData2DDList(arr, "select_user_type");
}

//*******************************************************************************************
// Check User Type
//*******************************************************************************************
function CheckUserType() {
    var ols_user_type = USER_INFORMATION.user_type;
    var new_user_type = $('#select_user_type').find(":selected").val();
    //אם יש פרופיל
    if (new_user_type == 2 || new_user_type == 3) {
        IS_PROFILE = true;
        GetCity();
        GetRegions();
        document.getElementById("profile_view").style.display = "block";
        document.getElementById("profile_view").reload;
        Edit_Profile_info();
        if (ols_user_type == 2 || ols_user_type == 3)
            ViewProfileInfo();        
    }
    else {
        IS_PROFILE = false;
        document.getElementById("profile_view").style.display = "none";
        document.getElementById("profile_view").reload;
    }   
}
//*******************************************************************************************
// GET CITY
//*******************************************************************************************
function GetCity() {
    if (ARRY_CITY == null)
        GlobalAjax("/api/City/GetAllCities", "GET", "", SuccessCity, FailCity);
    else
        EnterData2DDList(ARRY_CITY, "profile_city");
}

function SuccessCity(arry_city) {
    ARRY_CITY = arry_city;
    sessionStorage.setItem("ARRY_CITY", JSON.stringify(ARRY_CITY));
    document.getElementById("profile_city").length = 0;//מסיר את כל האיברים הקודמים
    EnterData2DDList(ARRY_CITY, "profile_city");
    GetRegions();
}

function FailCity() {
    console.log("שגיאה במשיכת נתוני הערים מהשרת.");
    alert('שגיאה במשיכת נתוני הערים מהשרת.');
}

//*******************************************************************************************
// GET REGION
//*******************************************************************************************
function GetRegions() {
    if (JSON.parse(sessionStorage.getItem('ARRY_REGION')) == null) {
        GlobalAjax("/api/Region/GetAllRegion", "GET", "", SuccessGetRegion, FailGetRegion);
    }
    else
        EnterData2DDList(ARRY_REGION, "profile_region");
}

function SuccessGetRegion(arry_region) {
    ARRY_REGION = arry_region;
    sessionStorage.setItem("ARRY_REGION", JSON.stringify(ARRY_REGION));
    document.getElementById("profile_region").length = 0;//מסיר את כל האיברים הקודמים
    EnterData2DDList(ARRY_REGION, "profile_region");
    ViewProfileInfo();

}

function FailGetRegion() {
    console.log("שגיאה במשיכת נתוני מחוזות מהשרת.");
    alert('שגיאה במשיכת נתוני מחוזות מהשרת.');
}
//*******************************************************************************************
// VIEW USER INFORMATION
//*******************************************************************************************
function ViewUserInfo()
//הצגת פרטים אישיים
{
    $("#user_first_name").val(USER_INFORMATION.first_name);
    $("#user_last_name").val(USER_INFORMATION.last_name);
    $("#user_email").val(USER_INFORMATION.email);
    if (USER_INFORMATION.gender === "F") {
        $("#female").prop('checked', true);
        $("#male").prop('checked', false); 
    }
    else {
        $("#female").prop('checked', false);
        $("#male").prop('checked', true);         
    }
    ViewSelectOneOptInformation("select_user_type", USER_INFORMATION.user_type);
}
//*******************************************************************************************
// VIEW PROFILE INFORMATION
//*******************************************************************************************
function ViewProfileInfo()
//הצגת פרטי פרופיל
{
    $("#profile_name").val(PROFILE_INFORMATION.name);
    $("#profile_description").val(PROFILE_INFORMATION.description);
    ViewSelectOneOptInformation("profile_city", PROFILE_INFORMATION.id_city);
    ViewSelectOneOptInformation("profile_region", PROFILE_INFORMATION.id_region);
}

//*******************************************************************************************
// EDIT
//*******************************************************************************************
function Edit()
//עריכת פרטים אישיים
{
    //מאפשר את הקלטים לצורך עריכה
    Edit_User_info();
    if (IS_PROFILE)
        Edit_Profile_info();
  //משנה את כפתור העריכה לשמירה עבור השינויים
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
    $("#profile_region").prop('disabled', false);

}
//*****************************************************************************************//

function Check_valid_Email() {
    var new_email = $("#user_email").val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(new_email).toLowerCase()) == true)
        user_validation.email = true;
    else {
        user_validation.email = false;
        console.log("email is not valid");
        alert("אנא הכנס אימייל חוקי");
        return false;
    }
    return true;   
}
//*******************************************************************************************
// CHECK IS EMAIL FREE
//*******************************************************************************************
function Check_EmailFree() {
    var new_email = $("#user_email").val();
    var old_email = USER_INFORMATION.email;
    if (new_email != old_email)
        GlobalAjax("/api/User/" + new_email + "/CheckMailAvailable", "GET", "", Success_CheckMailFree, Fail_CheckMailFree);
    else
        Success_CheckMailFree(true);
}

function Success_CheckMailFree(data) {
    /*
    user_validation.email = true;
    console.log("the email " + $("#user_email").val() + " is free");
    
    SaveChanges();
    */
    if (data)//אם חופשי
    {
        console.log("the email " + $("#email").val() + " is free");
        USER_VALIDATION.email = true;
        if ($("#email").hasClass("not_valid"))
            $("#email").removeClass("not_valid");
        SaveChanges();
    }
    else {
        USER_VALIDATION.email = false;
        $("#email").addClass(" not_valid");
        console.log("the email " + $("#email").val() + " is not free");
        alert("כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.");
    }
}

function Fail_CheckMailFree() {
    /*
    user_validation.email = false;
    console.log("the email " + $("#user_email").val() + " is not free");
    alert("כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.");
    */
    user_validation.email = false;
    console.log("ישנה תקלה בשרת, אנא נסה להרשם המועד אחר!.");
    Console.log(data);
    alert("ישנה תקלה בשרת, אנא נסה להרשם המועד אחר!.");
} 
//*******************************************************************************************
// CHANGE STYLE BY VALIDATION
//*******************************************************************************************
function Change_style_by_validation()
//הפונקציה בודקת איזה פריט לא תקין ומסמנת אותו
{
    var flag = true;
    var user_inputs = {
        first_name: $("#user_first_name"),
        last_name: $("#user_last_name"),
        email: $("#user_email"),
        user_type: $("#select_user_type")
    };

    for (var i in USER_VALIDATION) {
        if (USER_VALIDATION[i] == false) {
            user_inputs[i].addClass(" not_valid");
            flag = false;
        }
        else {
            if (user_inputs[i].hasClass("not_valid"))
                user_inputs[i].removeClass("not_valid");
        }
    }
    if (IS_PROFILE) {
        var profile_inputs = {
            name: $("#profile_name"),
            description: $("#profile_description"),
            city: $("#profile_city"),
            region: $("#profile_region")
        };
        for (var i in PROFILE_VALIDATION) {
            if (PROFILE_VALIDATION[i] == false) {
                profile_inputs[i].addClass(" not_valid");
                flag = false;
            }
            else {
                if (profile_inputs[i].hasClass("not_valid"))
                    profile_inputs[i].removeClass("not_valid");
            }
        }
    }
    return flag;
}
//*******************************************************************************************
// CHECK USER INPUTS
//*******************************************************************************************
function CheckUserInputs()
//בודק את הרשומות של המשתמש
{
    var user_inputs = {
        first_name: $("#user_first_name").val(),
        last_name: $("#user_last_name").val(),
        email: $("#user_email").val(),
        user_type: $('#select_user_type').find(":selected").val()
    };
    var user_feedback = {
        first_name: document.getElementById("feedback_first_name"),
        last_name: document.getElementById("feedback_last_name"),
        email: document.getElementById("feedback_email"),
        user_type: document.getElementById("feedback_user_type")
    };

    // first_name
    if (user_inputs.first_name == "") {
        USER_VALIDATION.first_name = false;
        user_feedback.first_name.innerHTML = "אנא הכנס שם פרטי!";
    }
    else if (!(user_inputs.first_name.length >= 2 && user_inputs.first_name.length <= 20)) {
        USER_VALIDATION.first_name = false;
        user_feedback.first_name.innerHTML = "אנא הכנס שם פרטי באורך 2 עד 20 תווים!";
    }
    else {
        USER_VALIDATION.first_name = true;
        user_feedback.first_name.innerHTML = "";
    }
    // last_name
    if (user_inputs.last_name == "") {
        USER_VALIDATION.last_name = false;
        user_feedback.last_name.innerHTML = "אנא הכנס שם משפחה!";
    }
    else if (!(user_inputs.last_name.length >= 2 && user_inputs.last_name.length <= 30)) {
        USER_VALIDATION.last_name = false;
        user_feedback.last_name.innerHTML = "אנא הכנס שם משפחה באורך 2 עד 30 תווים!";
    }
    else {
        USER_VALIDATION.last_name = true;
        user_feedback.last_name.innerHTML = "";
    }
    // email
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (user_inputs.email == "") {
        USER_VALIDATION.email = false;
        user_feedback.email.innerHTML = "אנא הכנס אימייל!";
    }
    else if (!(user_inputs.email.length <= 50)) {
        USER_VALIDATION.email = false;
        user_feedback.email.innerHTML = "אנא הכנס אמייל באורך עד 50 תווים!";
    }
    else if (re.test(String(user_inputs.email).toLowerCase()) == false) {
        USER_VALIDATION.email = false;
        user_feedback.email.innerHTML = "אנא הכנס אימייל תקין!.";
    }
    else {
        USER_VALIDATION.email = true;
        user_feedback.email.innerHTML = "";
    }   
    // user_type
    if (user_inputs.user_type == "") {
        USER_VALIDATION.user_type = false;
        user_feedback.user_type.innerHTML = "אנא בחר סוג משתמש!";
    }
    else {
        USER_VALIDATION.user_type = true;
        user_feedback.user_type.innerHTML = "";
    }
}

//*******************************************************************************************
// CHECK PROFILE INPUTS
//*******************************************************************************************
function CheckProfileInputs() {
    var profile_inputs = {
        name: $("#profile_name").val(),
        description: $("#profile_description").val(),
        city: $('#profile_city').find(":selected").val(),
        region: $('#profile_region').find(":selected").val()
    };
    var profile_feedback = {
        name: document.getElementById("feedback_profile_name"),
        description: document.getElementById("feedback_profile_description"),
        city: document.getElementById("feedback_profile_city"),
        region: document.getElementById("feedback_profile_region")
    };
    // name
    if (profile_inputs.name == "") {
        PROFILE_VALIDATION.name = false;
        profile_feedback.name.innerHTML = "אנא הכנס שם פרופיל!";
    }
    else if (!(profile_inputs.name.length >= 2 && profile_inputs.name.length <= 30)) {
        PROFILE_VALIDATION.name = false;
        profile_feedback.name.innerHTML = "אנא הכנס שם פרופיל באורך 2 עד 30 תווים!";
    }
    else {
        PROFILE_VALIDATION.name = true;
        profile_feedback.name.innerHTML = "";
    }
    // description
    if (profile_inputs.description == "") {
        PROFILE_VALIDATION.description = false;
        profile_feedback.description.innerHTML = "אנא הכנס תיאור פרופיל!";
    }
    else if (!(profile_inputs.description.length >= 2 && profile_inputs.description.length <= 250)) {
        PROFILE_VALIDATION.description = false;
        profile_feedback.description.innerHTML = "אנא הכנס שם פרופיל באורך 2 עד 250 תווים!";
    }
    else {
        PROFILE_VALIDATION.description = true;
        profile_feedback.description.innerHTML = "";
    }
    // city
    if (profile_inputs.city == "") {
        PROFILE_VALIDATION.city = false;
        profile_feedback.city.innerHTML = "אנא בחר עיר!";
    }
    else {
        PROFILE_VALIDATION.city = true;
        profile_feedback.city.innerHTML = "";
    }
    // region
    if (profile_inputs.region == "") {
        PROFILE_VALIDATION.region = false;
        profile_feedback.region.innerHTML = "אנא בחר מחוז!";
    }
    else {
        PROFILE_VALIDATION.region = true;
        profile_feedback.region.innerHTML = "";
    }
}
//*******************************************************************************************
// CHECK FORM VALIDATION
//*******************************************************************************************
/*function Check_validation()
//הפונקציה בודקת את התקינות של שדות הטופס
{
        //בודק האם ריק
        if (Check_ifEmpty()) {
        //בודק האם התוכן באורך הנכון
        if (Check_Length()) {
            //בודק האם חוקי
            if (Check_valid_Email()) {
                Check_EmailFree();
            }
        }
    }
    Change_style_by_validation();
}
*/
function Check_validation() // הפונקציה בודקת הנתוני הטופס תקינים
{
    CheckUserInputs();
    if (IS_PROFILE)
        CheckProfileInputs();
    if (Change_style_by_validation()) {
        Check_EmailFree();
    }
    else
        alert("אנא תקן את המקומות המסומנים!.");
}
//*******************************************************************************************
// BLOCK PROFILE INFORMATION FOR EDUT BUTTON FUNCTION
//*******************************************************************************************
function Block_Profile_btn()
//לא מאפשר את לעריכה את פרטי פרופיל
{
    $("#profile_name").prop('disabled', true);
    $("#profile_description").prop('disabled', true);
    $("#profile_city").prop('disabled', true);
    $("#profile_region").prop('disabled', true);
}
//*******************************************************************************************
// BLOCK USER INFORMATION FOR EDUT BUTTON FUNCTION
//*******************************************************************************************
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
//*******************************************************************************************
// UPDATE USER INFORMATION
//*******************************************************************************************
function Save_User() {
    //שמירת הפרטים המעודכנים בsesstion storage
    USER_INFORMATION.first_name = $("#user_first_name").val();
    USER_INFORMATION.last_name = $("#user_last_name").val();
    USER_INFORMATION.email = $("#user_email").val();
    USER_INFORMATION.gender = $("input[name='gender']:checked").val();
    USER_INFORMATION.user_type = $('#select_user_type').find(":selected").val();

    sessionStorage.setItem("Login_User", JSON.stringify(USER_INFORMATION));

    //עדכון פרטים אישיים בשרת
    GlobalAjax("/api/User/UpdateUserInfo", "PUT", USER_INFORMATION, SuccessUpdateUser, FailUpdateUser);
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
        var user_id = USER_INFORMATION.id;
        //אם קיים למתשמש פרופיל לא פעיל
        //צריך לבדוק אם קיים פרופיל לא פעיל של משתמש זה ולעדכן אותו אחרת הוספה
        GlobalAjax("/api/Profile/CheckProfileExsistByUserId/" + user_id, "GET", "", UpdateUnactiveProfile, AddNewProfile);
    }
    //עדכון פרופיל
    else if ((old_user_type == 2 || old_user_type == 3) && (new_user_type == 2 || new_user_type == 3))
        Update_profile();
    else
        AlertSuccsses2User();
}

function FailUpdateUser(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בעדכון פרטים אישיים.");
    console.log(data);
    alert('שגיאה בעדכון פרטים אישיים.');
}
//*******************************************************************************************
// UPDATE PROFILE INFORMATION
//*******************************************************************************************
function Save_Profile() {
    var new_user_type = $('#select_user_type').find(":selected").val();
    //מקרה של הוספת פרופיל
    if (old_user_type == 1 && (new_user_type == 2 || new_user_type == 3)) {
        var user_id = USER_INFORMATION.user_id;
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
    PROFILE_INFORMATION.status = 0;
    sessionStorage.removeItem("Login_Profile");
    GlobalAjax("/api/Profile/UpdateProfileInfo", "PUT", PROFILE_INFORMATION, SuccessUpdateProfile, FailUpdateProfile);
}

function AddNewProfile() {//הוספת פרופיל חדש לחלוטין
    var new_user_type = $('#select_user_type').find(":selected").val();
    var type;
    if (new_user_type == 2)
        type = "F";
    else
        type = "B";
    var new_profile = {
        user_id: USER_INFORMATION.id,
        type: type,
        name: $("#profile_name").val(),
        description: $("#profile_description").val(),
        id_city: $('#profile_city').find(":selected").val(),
        id_region: $('#profile_region').find(":selected").val(),
        status: true
    };
    sessionStorage.setItem("Login_Profile", JSON.stringify(new_profile));

    GlobalAjax("/api/Profile/AddNewProfile", "POST", new_profile, SuccessUpdateProfile, FailUpdateProfile);
}

function UpdateUnactiveProfile(profile) {//עדכון פרופיל לא פעי ע םי נתונים מהשרת
    var new_user_type = $('#select_user_type').find(":selected").val();
    var type;
    if (new_user_type == 2)
        type = "F";
    else
        type = "B";
    var p = {
        id: profile.id,
        user_id: profile.user_id,
        type: type,
        name: $("#profile_name").val(),
        description: $("#profile_description").val(),
        id_city: $('#profile_city').find(":selected").val(),
        id_region: $('#profile_region').find(":selected").val(),
        status: true
    };

    sessionStorage.setItem("Login_Profile", JSON.stringify(p));

    GlobalAjax("/api/Profile/UpdateProfileInfo", "PUT", p, SuccessUpdateProfile, FailUpdateProfile);
}

function Update_profile() {//עדכון פרופיל לפי נתוני האתר
    var new_user_type = $('#select_user_type').find(":selected").val();
        if (new_user_type == 2)
            PROFILE_INFORMATION.type = "F";
    else
            PROFILE_INFORMATION.type = "B";
    PROFILE_INFORMATION.name = $("#profile_name").val();
    PROFILE_INFORMATION.description = $("#profile_description").val();
    PROFILE_INFORMATION.id_city = $('#profile_city').find(":selected").val();
    PROFILE_INFORMATION.id_region = $('#profile_region').find(":selected").val();

    sessionStorage.setItem("Login_Profile", JSON.stringify(PROFILE_INFORMATION));

    GlobalAjax("/api/Profile/UpdateProfileInfo", "PUT", PROFILE_INFORMATION, SuccessUpdateProfile, FailUpdateProfile);
}
function SuccessUpdateProfile() // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
{
    console.log('פרטי הפרופיל עודכני בהצלחה!.');
    if (IS_PROFILE)
        AlertSuccsses2User();
}

function FailUpdateProfile(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בעדכון פרטי פרופיל.");
    console.log(data);
    alert('שגיאה בעדכון פרטי פרויפל.');
}

//*******************************************************************************************
// SAVE CHANGES BUTTON FUNCTION
//*******************************************************************************************
function SaveChanges()
//שמירת שינויים בפרטים אישיים
{
    old_user_type = USER_INFORMATION.user_type;
    if (confirm("האם אתה רוצה לשמור את השינוי?")) {
        //שינוי מצב הכפתורים והקלטים
        Block_User_btn();
        Block_Profile_btn();
        $("#btnSave").prop('disabled', true);
        $("#btnEdit").prop('disabled', false);
        //user
        Save_User();   
        }
}

function AlertSuccsses2User() {
        alert('הפרטים עודכנו בהצלחה!.');
}

//*******************************************************************************************
// ShowCityByRegion
//*******************************************************************************************
function ShowCityByRegion()
// מציג את הערים השייכות למחוז שנבחר
{
    var region = $('#profile_region').find(":selected").val();
    if (region == "")
        $("#profile_city").prop('disabled', true);
    else {
        var cities2region = new Array();
        for (var i = 0; i < ARRY_CITY.length; i++) {
            if (ARRY_CITY[i].id_region == region)
                cities2region.push(ARRY_CITY[i]);
        }
        var city = document.getElementById("profile_city").length = 0;//.remove;
        $("#profile_city").prop('disabled', false);
        EnterData2DDList(cities2region, "profile_city");
    }
}
//*******************************************************************************************
// SHOW HIDE EXPLANATION
//*******************************************************************************************
var EXPLANATION_USER_TYPE = "למשתמש יצירתי אין פרופיל, ולכן אי אפשר לעקוב אחריו ומשתמשים לא רשומים לא יכולים לצפות במתכונים שלו.\n למשתמש אנין טעם יש פרופיל, אחריו יכולים לעקוב משתמשים אחרים.בנוסף יכול להעלות סדנאות לקהילה באתר.";
EXPLANATION_USER_TYPE = EXPLANATION_USER_TYPE + "\n למשתמש עסקי יש פרופיל, אחריו יכולים לעקוב משתמשים אחרים לעקוב.בנוסף הוא יכול להעלות סדנאות לקהילה באתר, הוא יכול להעלוןת אירוע עסקי לאתר. ";
var EXPLANATION_EMAIL = "אימייל צריך להיות באנגלית ועם הסימנים @ו .";
/*
function ShowHideExplanation(btn_cliked_id) {
    var div_name = "explanation_";
    var words = btn_cliked_id.split('_');
    div_name = div_name.concat(words[2]);
    if (words.length > 3)
        div_name = div_name.concat("_" + words[3]);
    //display on\off the span
    var str = document.getElementById(div_name).innerHTML;
    if (str == "") {
        if (btn_cliked_id == "btn_explanation_email")//אם מייל
            document.getElementById(div_name).innerHTML = EXPLANATION_EMAIL;
        else//סוג משתמש
            document.getElementById(div_name).innerHTML = EXPLANATION_USER_TYPE;
    }
    else
        document.getElementById(div_name).innerHTML = "";
}
*/
function ShowPopup(_id) {
    var words = _id.split('_');
    var name = words[2];
    if (words.length > 3)
        name = name.concat("_" + words[3]);
    name = name.concat("_popup");
    var popup = document.getElementById(name);
    popup.classList.toggle("show");
}