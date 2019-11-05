//משתנה גלובלי לבדיקת תקינות טופס
var form_valid = false;
//משתנים לבדיקת תקינות נתוני שדות הנדרש לאירוע
var event_validation = {
    event_name: true,
    event_date: true,
    event_time: true,
    event_region: true,
    event_city: true,
    event_address: true,
    event_description: true
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
        $("#select_event_region").append(AddOption_Region(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_Region(item) {
    return '<option value="' + item.name + '">' + item.name + '</option>';
}

//***************************************************************************//
//הפונקציה מביאה את רשימת הערים לפי מחוז רצוי ממסד הנתונים
function GetCities() {
    var region_choice = $("#select_event_region").options[$("#select_event_region").selectedIndex].value;
    // קריאה לפונקצית ajax של Get מהשרת עבור נתוני cities
    GlobalAjax("/api/City/" + region_choice + "/GetCitiesByRegion", "GET", "", SuccessCity, FailCity);
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
        $("#select_event_city").append(AddOption_city(data[i]));
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
    var EventData = {
        event_name: $('#event_name').val(),
        event_time: $('#event_time_start').val(),
        /*var date = new Date($('#date-input').val());*/
        event_date: $('#event_date').val(),
        event_region: $("#select_event_region").find(":selected").val(),
        event_city: $("#select_event_city").find(":selected").val(),
        event_address: $('#event_address').val(),
        event_description: $('#txt_event_description').val()
    };
    var unempty_flag = true;

    for (var details in EventData) {
        if (EventData[details] == "") {
            //form_valid = false;
            event_validation[details] = false;
            unempty_flag = false;
            console.log(details + " is missing.");
        }
        else
            event_validation[details] = true;
    }

    if (unempty_flag == false)
        alert("אנא מלא את הפרטים החסרים המסומנים באדום!.");

    return unempty_flag;
}

//****************************************************************************************//
function FormValid_Length_Check() {
    var event_details = {
        event_name: $('#event_name').val(),
        event_address: $('#event_address').val(),
        event_description: $('#txt_event_description').val()
    };
    var len_flag = true;

    //בדיקת אורך שם האירוע
    if (event_details.event_name.length > 1 && event_details.event_name.length < 30)
        event_validation.event_name = true;
    else {
        event_validation.event_name = false;
        alert("שם האירוע חייב להיות לפחות 2 תווים ולא יותר מ-30 תווים");
        len_flag = false;
    }
    //בדיקת אורך הכתובת
    if (event_details.event_address.length > 2 && event_details.event_address.length < 120)
        event_validation.event_address = true;
    else {
        event_validation.event_address = false;
        len_flag = false;
        alert("הכתובת לאירוע חייבת להיות פחות מ120 תווים");
    }
    //בדיקת אורך התיאור
    if (event_details.event_description.length > 100) {
        event_validation.event_description = false;
        len_flag = false;
        alert("תיאור לאירוע חייב להכיל פחות מ-100 תווים");
    }
    else
        event_validation.event_description = true;


    return len_flag;
}

//*****************************************************************************************//
function Change_style_by_validation()
    //הפונקציה בודקת איזה שדה לא תקין ומסמנת אותו
{
    var event_inputs = {
        event_name: $('#event_name'),
        event_time: $('#event_time_start'),
        event_date: $('#event_date'),
        event_region: $("#select_event_region"),
        event_city: $("#select_event_city"),
        event_address: $('#event_address'),
        event_description: $('#txt_event_description')
    };

    for (var field in event_validation) {
        if (event_validation[field] == false)
            event_inputs[field].addClass(" not_valid");
        else {
            if (event_inputs[field].hasClass("not_valid"))
                event_inputs[field].removeClass("not_valid");
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

    function UploadEvent() //הפונקציה שולחת את פרטי האירוע לשרת
    { //אירוע חדש
        FormValidationCheck();
        if (form_valid == true) {
            GetProfileID();
            var new_event = {
                //id: parseInt(122),
                profile_id: prof_id,
                name: $('#event_name').val(),

                /*var d = new Date("2015-03-25T12:00:00Z");*/
                date_time: Date($('#event_date') + 'T' + $('#event_time_start')),//תאריך ושעת התחלה
                city: $('#select_event_city').find(":selected").val(),
                address: $('#event_address').val(),
                description: $('#txt_event_description').val(),
                statusCancel: false
            }

            //שמירת האובייקטים בsseion storage
            sessionStorage.setItem("newEvent", JSON.stringify(new_event));

            //שליחת הנתונים לשרת
            GlobalAjax("/api/Event/AddNewEvent", "POST", new_event, SuccessEvent, FailEvent);
        }
        else
            alert("טופס העלאת אירוע לא תקין. נא לתקן את השדות השגויות");

    }


    function SuccessEvent() // פונקציה המתבצעת אחרי הוספה מוצלחת של אירוע
    {
        console.log("האירוע נוסף לשרת בהצלחה.");
        alert('הוספת אירוע חדש');
    }

    function FailEvent()// פונקציה המתבצעת אחרי כישלון הוספה  של אירוע
    {
        sessionStorage.removeItem("new_event");

        console.log("שגיאה בהוספת האירוע לשרת.");
        alert('לא הצלחנו להוסיף את האירוע החדש.');
    }

}