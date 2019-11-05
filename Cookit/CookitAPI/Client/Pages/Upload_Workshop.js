//משתנה גלובלי לבדיקת תקינות טופס
var form_valid = false;
//משתנים לבדיקת תקינות נתוני שדות הנדרש לסדנא
var workshop_validation = {
    workshop_name: true,
    workshop_date: true,
    workshop_time: true,
    workshop_maxParticipant: true,
    workshop_region: true,
    workshop_city: true,
    workshop_address: true,
    workshop_description: true
}


// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    //רשימת מחוזות של ערים
    var arr_regions = new Array;
    GetRegions();
});

//***************************************************************************//

function GetRegions() {
    GlobalAjax("/api/City/GetRegions", "GET", "", SuccessRegion, FailRegion);
    //רשימת הערים ממסד הנתונים
    var arry_city = new Array();
    // הבאת הערים
    GetCities()
}


function SuccessRegion(arr_regions) {
    sessionStorage.setItem("arr_regions", JSON.stringify(arr_regions));
    initRegions(arr_regions);
}

function FailRegion() {
    console.log("שגיאה במשיכת נתוני המחוזות מהשרת.");
    alert('שגיאה במשיכת נתוני המחוזות מהשרת.');
}

//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
function initRegions(data) {
    var str;
    for (i in data) {
        $("#select_workshop_region").append(AddOption_Region(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_Region(item) {
    return '<option value="' + item.name + '">' + item.name + '</option>';
}

//***************************************************************************//
//הפונקציה מביאה את רשימת הערים לפי מחוז רצוי ממסד הנתונים
function GetCities() {
    var region_choice = $("#select_workshop_region").options[$("#select_workshop_region").selectedIndex].value;
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני cities
    GlobalAjax("/api/City/" + region_choice + "/GetCitiesByRegion", "GET", "", SuccessCity, FailCity);
}


function SuccessCity(arry_city) {
    //  sessionStorage.setItem("arry_city", JSON.stringify(arry_city));
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
        $("#select_workshop_city").append(AddOption_city(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_city(item) {
    return '<option value="' + item.city_name + '">' + item.city_name + '</option>';
}

//*****************************************************************************************//
//****************************************************************************************//
//****************************************************************************************//
function FormValid_Emptyness() {
    var WorkshopData = {
        workshop_name: $('#workshop_name').val(),
        workshop_time: $('#workshop_time_start').val(),
        /*var date = new Date($('#date-input').val());*/
        workshop_date: $('#workshop_date').val(),
        workshop_region: $("#select_workshop_region").find(":selected").val(),
        workshop_city: $("#select_workshop_city").find(":selected").val(),
        workshop_address: $('#workshop_address').val(),
        workshop_description: $('#txt_workshop_description').val(),
        workshop_maxParticipant: $("#workshop_max_participants").val()
    };
    var unempty_flag = true;

    for (var details in WorkshopData) {
        if (WorkshopData[details] == "") {
            //form_valid = false;
            workshop_validation[details] = false;
            unempty_flag = false;
            console.log(details + " is missing.");
        }
        else
            workshop_validation[details] = true;
    }

    if (unempty_flag == false)
        alert("אנא מלא את הפרטים החסרים המסומנים באדום!.");

    return unempty_flag;
}

//****************************************************************************************//
function FormValid_Length_Check() {
    var workshop_details = {
        workshop_name: $('#workshop_name').val(),
        workshop_address: $('#workshop_address').val(),
        workshop_description: $('#txt_workshop_description').val(),
        workshop_maxParticipant: $("#workshop_max_participants").val()
    };
    var len_flag = true;

    //בדיקת אורך שם האירוע
    if (workshop_details.workshop_name.length > 1 && workshop_details.workshop_name.length < 30)
        workshop_validation.workshop_name = true;
    else {
        workshop_validation.workshop_name = false;
        alert("שם האירוע חייב להיות לפחות 2 תווים ולא יותר מ-30 תווים");
        len_flag = false;
    }
    //בדיקת אורך הכתובת
    if (workshop_details.workshop_address.length > 2 && workshop_details.workshop_address.length < 120)
        workshop_validation.workshop_address = true;
    else {
        workshop_validation.workshop_address = false;
        len_flag = false;
        alert("הכתובת לאירוע חייבת להיות פחות מ120 תווים");
    }
    //בדיקת אורך התיאור
    if (workshop_details.workshop_description.length > 100) {
        workshop_validation.workshop_description = false;
        len_flag = false;
        alert("תיאור לאירוע חייב להכיל פחות מ-100 תווים");
    }
    else
        workshop_validation.workshop_description = true;

    //בדיקת כמות המשתתפים המקסימלית בסדנא
    if (workshop_details.workshop_maxParticipant < 2) {
        workshop_validation.workshop_maxParticipant = false;
        len_flag = false;
        alert("סדנא חייבת להכיל לפחות שני אנשים");
    }
    else
        workshop_validation.workshop_maxParticipant = true;

    return len_flag;
}

//*****************************************************************************************//
function Change_style_by_validation()
    //הפונקציה בודקת איזה שדה לא תקין ומסמנת אותו
{
    var workshop_inputs = {
        workshop_name: $('#workshop_name'),
        workshop_time: $('#workshop_time_start'),
        workshop_date: $('#workshop_date'),
        workshop_region: $("#select_workshop_region"),
        workshop_city: $("#select_workshop_city"),
        workshop_address: $('#workshop_address'),
        workshop_description: $('#txt_workshop_description'),
        workshop_maxParticipant: $("#workshop_max_participants")
    };

    for (var field in workshop_validation) {
        if (workshop_validation[field] == false)
            workshop_inputs[field].addClass(" not_valid");
        else {
            if (workshop_inputs[field].hasClass("not_valid"))
                workshop_inputs[field].removeClass("not_valid");
        }
    }

    //****************************************************************************************//
    function FormValidationCheck() // הפונקציה בודקת האם הנתוני הטופס תקינים 
    {
        if (FormValid_Emptyness()) {
            if (FormValid_Length_Check()) {
                form_valid = true;
            }
        }
        Change_style_by_validation();
    }


    //*****************************************************************************//
    //***************************************************************************//

    function GetProfileID()
        //השגת תז מספר הפרופיל לפי תז של משתמש מחובר
    {
        var logged_user = new Array();
        //השגת פרטי המשתמש שהתחבר
        logged_user = JSON.parse(sessionStorage.getItem("Login_User"));
        //תז המשתמש המחובר לתוך משתנה, ממנו נשיג מספר פרופיל
        var user_id = logged_user.id;
        GlobalAjax("/api/Profile/" + user_id + "/GetProfileIDByUserID", "GET", "", Success_GetProfileID, Fail_GetProfileID);
    }

    function Success_GetProfileID(data) {
        var prof_id = data;
        console.log("profile id :" + prof_id);
    }

    function Fail_GetProfileIdD(data) {
        console.log("cant get profile id");
        console.log(data);
    }
    //***************************************************************************//
    //***************************************************************************//

    function UploadWorkshop() //הפונקציה שולחת את פרטי הסדנא לשרת
    { //סדנא חדשה
        FormValidationCheck();
        if (form_valid == true) {
            GetProfileID();
            var new_workshop = {
                //id: parseInt(121),
                profile_id: prof_id,
                name: $('#workshop_name').val(),

                /*var d = new Date("2015-03-25T12:00:00Z");*/
                date_time: Date($('#workshop_date') + 'T' + $('#workshop_time_start')),  //תאריך ושעת התחלה

                city: $("#select_workshop_city").find(":selected").val(),
                description: $('#txt_workshop_description').val(),
                max_participants: parseInt($('#workshop_max_participants').val()),
                statusCancel: false,
                status_available: true
            }

            //שמירת האובייקטים בsseion storage
            sessionStorage.setItem("newWorkshop", JSON.stringify(new_workshop));

            //שליחת הנתונים לשרת
            GlobalAjax("/api/Workshop/AddNewWorkshop", "POST", new_workshop, SuccessWorkshop, FailWorkshop);
        }
        else
            alert("טופס העלאת סדנא לא תקין. נא לתקן את השדות השגויות");
    }


    function SuccessWorkshop() // פונקציה המתבצעת אחרי הוספה מוצלחת של סדנא
    {
        console.log("הסדנא נוספה לשרת בהצלחה.");
        alert('הוספת סדנא חדשה');
    }

    function FailWorkshop()// פונקציה המתבצעת אחרי כישלון הוספה  של הסדנא
    {
        sessionStorage.removeItem("new_workshop");

        console.log("שגיאה בהוספת הסדנא לשרת.");
        alert('לא הצלחנו להוסיף את הסדנא החדשה.');
    }


}