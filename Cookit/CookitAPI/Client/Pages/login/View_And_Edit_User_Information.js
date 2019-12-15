//*******************************************************************************************
// GLOBAL VARIABLE
//*******************************************************************************************
var ARRY_USER_TYPE = JSON.parse(sessionStorage.getItem("ARRY_USER_TYPE"));// var arry_userType = JSON.parse(sessionStorage.getItem("arry_userType"));//= JSON.parse(sessionStorage.getItem("arry_userType")); 
var ARRY_REGION = JSON.parse(sessionStorage.getItem("ARRY_CITY"));
var ARRY_CITY = JSON.parse(sessionStorage.getItem("ARRY_REGION"));

var USER_INFORMATION = JSON.parse(sessionStorage.getItem("Login_User"));
var PROFILE_INFORMATION = JSON.parse(sessionStorage.getItem("Login_Profile"));

var IS_PROFILE = false;
if (USER_INFORMATION.user_type == 2)
    IS_PROFILE = true;
else
    IS_PROFILE = false;
var OLD_USER_TYPE = USER_INFORMATION.user_type;

var OLD_PROFILE_IMAGE = false;//האם החליף את התמונה הקיימת

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
    region: false,
    img: true
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
        GetCity(); 
       
        document.getElementById("profile_view").style.display = "block";
        document.getElementById("profile_view").reload;
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
    $("#" + ddList).innerHTML = "";
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
    document.getElementById("select_user_type").innerHTML = "";
    var arr = ARRY_USER_TYPE;
    EnterData2DDList(arr, "select_user_type");
}

//*******************************************************************************************
// Check User Type
//*******************************************************************************************
function CheckUserType() {
    var ols_user_type = USER_INFORMATION.user_type;
    var new_user_type = $('#select_user_type').find(":selected").val();
    //אם יש פרופיל
    if (new_user_type == 2) {
        IS_PROFILE = true;
        GetCity();
        document.getElementById("profile_view").style.display = "block";
        document.getElementById("profile_view").reload;
      
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
    document.getElementById("profile_city").innerHTML = "";//מסיר את כל האיברים הקודמים
    //if (ARRY_CITY == null)
        GlobalAjax("/api/City/GetAllCities", "GET", "", SuccessCity, FailCity);
    //else
        //EnterData2DDList(ARRY_CITY, "profile_city");
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
    document.getElementById("profile_region").innerHTML = "";//מסיר את כל האיברים הקודמים
    //if (ARRY_REGION == null) {
        GlobalAjax("/api/Region/GetAllRegion", "GET", "", SuccessGetRegion, FailGetRegion);
    //}
    //else
    //    EnterData2DDList(ARRY_REGION, "profile_region");
}

function SuccessGetRegion(arry_region) {
    ARRY_REGION = arry_region;
    sessionStorage.setItem("ARRY_REGION", JSON.stringify(ARRY_REGION));
    document.getElementById("profile_region").length = 0;//מסיר את כל האיברים הקודמים
    EnterData2DDList(ARRY_REGION, "profile_region");

    if (PROFILE_INFORMATION != null)
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
    $("#profile_image").attr("src", PROFILE_INFORMATION.img_path);
}

//*******************************************************************************************
// Check_valid_Email
//*******************************************************************************************
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
       if (data)//אם חופשי
       {
         document.getElementById("feedback_email").innerHTML = "";
        console.log("the email " + $("#email").val() + " is free");
        USER_VALIDATION.email = true;
        if ($("#email").hasClass("not_valid"))
            $("#email").removeClass("not_valid");
        SaveChanges();
    }
       else {
        document.getElementById("feedback_email").innerHTML = "כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.";
        USER_VALIDATION.email = false;
        $("#email").addClass(" not_valid");
        console.log("the email " + $("#email").val() + " is not free");
        alert("כתובת אימייל זו כבר שייכת למשתמש אחר, אנא הכנס אימייל אחר.");
    }
}

function Fail_CheckMailFree() {
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
            region: $("#profile_region"),
            img: $("#profile_upload_image")
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
        region: $('#profile_region').find(":selected").val(),
        img: $('#profile_upload_image').val()
    };
    var profile_feedback = {
        name: document.getElementById("feedback_profile_name"),
        description: document.getElementById("feedback_profile_description"),
        city: document.getElementById("feedback_profile_city"),
        region: document.getElementById("feedback_profile_region"),
        img: document.getElementById("feedback_profile_image")
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
    //img
    var img_end = profile_inputs.img.split(".")[1];
    var current_img = document.getElementById("profile_image").src;// $("#recipe_image").val();
    console.log("OLD_PROFILE_IMAGE " + OLD_PROFILE_IMAGE);
    if (OLD_PROFILE_IMAGE) { //תבדוק רק אם שינה את התמונה או שריק
        //תמונה חדשה
        //OLD_PROFILE_IMAGE = true;
        if (profile_inputs.img == "") {
            PROFILE_VALIDATION.img = false;
            profile_feedback.img.innerHTML = "אנא בחר תמונת פרופיל!";
        }
        else if (!(img_end == 'tiff' || img_end == 'pjp' || img_end == 'pjpeg' || img_end == 'jfif' || img_end == 'tif' || img_end == 'gif' || img_end == 'svg' || img_end == 'bmp' || img_end == 'png' || img_end == 'jpeg' || img_end == 'svgz' || img_end == 'jpg' || img_end == 'webp' || img_end == 'ico' || img_end == 'xbm' || img_end == 'dib')) {
            PROFILE_VALIDATION.img = false;
            profile_feedback.img.innerHTML = "אנא בחר קובץ מסוג תמונה!";
        }
        else {
            PROFILE_VALIDATION.img = true;
            profile_feedback.img.innerHTML = "";
        }
    }
    else {
        //תמונה ישנה בשימוש
        //OLD_PROFILE_IMAGE = false;

        PROFILE_VALIDATION.img = true;
        profile_feedback.img.innerHTML = "";
    }
}
//*******************************************************************************************
// CHECK FORM VALIDATION
//*******************************************************************************************
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
// SAVE CHANGES BUTTON FUNCTION
//*******************************************************************************************
function SaveChanges()
//שמירת שינויים בפרטים אישיים
{
    if (confirm("האם אתה רוצה לשמור את השינוי?")) {
        Save_User();
    }
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
    //בודק האם יש צורך לעדכון פרופיל או להוספת פרופיל חדש
    var new_user_type = $('#select_user_type').find(":selected").val();
    console.log("old_user_type " + OLD_USER_TYPE);
    if (OLD_USER_TYPE == 1 && new_user_type == 1)//אם אין פרופיל
        AlertSuccsses2User();
    else if (OLD_USER_TYPE == 1 && new_user_type == 2)//אם מוסיפים פרופיל
    {
        //צריל לבדוק האם למשתמש יש פרופיל לא פעילולעדכן אותו, או להוסיף פרופיל חדדש
        GlobalAjax("/api/Profile/CheckProfileExsistByUserId/" + USER_INFORMATION.id, "GET", "",
            function (_old_profile) {
                if (_old_profile == null) {
                    //הוספת פרופיל חדש
                    AddNewProfile();
                }
                else {

                    //עדכון פרופיל לא פעיל לפעיל
                    PROFILE_INFORMATION = _old_profile;
                    PROFILE_INFORMATION.status = true;
                    Update_profile();
                }
            },
            FailUpdateUser
        );
    }
    else if (OLD_USER_TYPE == 2 && new_user_type == 2) {
        //אם מעכנים פרופיל קיים
        Update_profile();
    }
    else {
        //אם מסירים פרופיל. מעבר ממשתמש אנין טעם למשתמש יצרתי
        PROFILE_INFORMATION.status = false;
        Update_profile();
    }
}

function FailUpdateUser(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בעדכון פרטים אישיים.");
    console.log(data);
    alert('שגיאה בעדכון פרטים אישיים.');
}
//*******************************************************************************************
// AlertSuccsses2User
//*******************************************************************************************
function AlertSuccsses2User() {
    alert('הפרטים עודכנו בהצלחה!.');
}
//*******************************************************************************************
// AddNewProfile
//*******************************************************************************************
function AddNewProfile() {//הוספת פרופיל חדש לחלוטין   
    var new_profile = {
        user_id: USER_INFORMATION.id,
        name: $("#profile_name").val(),
        description: $("#profile_description").val(),
        id_city: $('#profile_city').find(":selected").val(),
        id_region: $('#profile_region').find(":selected").val(),
        status: true,
        img_name: 0,
        img_path: 0
    };
    sessionStorage.setItem("Login_Profile", JSON.stringify(new_profile));

    GlobalAjax("/api/Profile/AddNewProfile", "POST", new_profile,
        function (_new_profile) {
            PROFILE_INFORMATION= _new_profile;
            sessionStorage.setItem("Login_Profile", JSON.stringify(PROFILE_INFORMATION));
            SuccessUpdateProfile();
        },
        FailUpdateProfile);
}
//*******************************************************************************************
// Update_profile
//*******************************************************************************************
function Update_profile() {//עדכון פרופיל לפי נתוני האתר
    PROFILE_INFORMATION.name = $("#profile_name").val();
    PROFILE_INFORMATION.description = $("#profile_description").val();
    PROFILE_INFORMATION.id_city = $('#profile_city').find(":selected").val();
    PROFILE_INFORMATION.id_region = $('#profile_region').find(":selected").val();
    //תמונה
    /*
    var profile_image_name = $("#profile_upload_image").val();
    var arry = profile_image_name.split('\\');
    var image_end = arry[arry.length - 1];
    image_end = image_end.split(".")[1];
    var path = "/Images/Profiles/";
    var image_path = path + PROFILE_INFORMATION.id + "." + image_end;//image_name;
    */
    PROFILE_INFORMATION.img_path = PROFILE_INFORMATION.img_path;// image_path;
    PROFILE_INFORMATION.img_name = PROFILE_INFORMATION.img_name;// PROFILE_INFORMATION.id;
    if (PROFILE_INFORMATION.status == true)
        sessionStorage.setItem("Login_Profile", JSON.stringify(PROFILE_INFORMATION));
    else
        sessionStorage.removeItem("Login_Profile");

    GlobalAjax("/api/Profile/UpdateProfileInfo", "PUT", PROFILE_INFORMATION, SuccessUpdateProfile, FailUpdateProfile);
}
function SuccessUpdateProfile() // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
{
    console.log('פרטי הפרופיל עודכני בהצלחה!.');
    if (OLD_PROFILE_IMAGE)//אם החליף את התמונה 
    {
        //עדכון תמונת פרופיל
        AddProfileImage();
    }
    else
        AlertSuccsses2User();
}

function FailUpdateProfile(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בעדכון פרטי פרופיל.");
    console.log(data);
    alert('שגיאה בעדכון פרטי פרויפל.');
}
//*******************************************************************************************
//add profile Image
//*******************************************************************************************
function AddProfileImage() {
    var profile_image_name = $("#profile_upload_image").val();
    var arry = profile_image_name.split('\\');
    var image_end = arry[arry.length - 1];
    image_end = image_end.split(".")[1];
    var path = "/Images/Profiles/";
    var image_path = path + PROFILE_INFORMATION.id + "." + image_end;//image_name;

    PROFILE_INFORMATION.img_path = image_path;
    PROFILE_INFORMATION.img_name = PROFILE_INFORMATION.id;
    sessionStorage.setItem("Login_Profile", JSON.stringify(PROFILE_INFORMATION));

    var img = $("#profile_upload_image")[0].files[0];

    var fd = new FormData();
    fd.append("id", PROFILE_INFORMATION.id);
    fd.append("file", img);
    $.ajax({
        url: '/api/Profile/AddProfileImage',
        type: 'PUT',
        data: fd,
        contentType: false,
        processData: false,
        success: function () {
            console.log("תמונת פרופיל נוספה בהצלחה!.");
            if (IS_PROFILE)
                AlertSuccsses2User();
        },
        error: function () {
            console.log('שגיאה בעדכון פרטי פרויפל.');
            alert('שגיאה בעדכון פרטי פרויפל.');
        }
    });
}

function SuccessAddProfileImage() {
    console.log("תמונת פרופיל נוספה בהצלחה!.");
    if (IS_PROFILE)
        AlertSuccsses2User();
}

function FailAddProfileImage() {
    console.log("שגיאה בהוספת תמונת פרופיל!.");
    alert("שגיאה בהוספת תמונת פרופיל!.");
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

function ShowPopup(_id) {
    var words = _id.split('_');
    var name = words[2];
    if (words.length > 3)
        name = name.concat("_" + words[3]);
    name = name.concat("_popup");
    var popup = document.getElementById(name);
    popup.classList.toggle("show_popup");
}

//*******************************************************************************************
//Show img Profile
//*******************************************************************************************
    function ShowImgProfile(_input) {
        //המשתמש שינה את התמונה
        OLD_PROFILE_IMAGE = true;
        PROFILE_VALIDATION.img = false;

        var img = $("#profile_upload_image").val();
        var img_end = img.split(".")[1];
        var reader = new FileReader();
        if (img_end == 'tiff' || img_end == 'pjp' || img_end == 'pjpeg' || img_end == 'jfif' || img_end == 'tif' || img_end == 'gif' || img_end == 'svg' || img_end == 'bmp' || img_end == 'png' || img_end == 'jpeg' || img_end == 'svgz' || img_end == 'jpg' || img_end == 'webp' || img_end == 'ico' || img_end == 'xbm' || img_end == 'dib') {
            reader.onload = function (e) {
                $('#profile_image')
                    .attr('src', e.target.result);
            };
            reader.readAsDataURL(_input.files[0]);
        }
        else {
            $("#profile_image").attr("src", "")//PROFILE_INFORMATION.image_path);
            }
    }