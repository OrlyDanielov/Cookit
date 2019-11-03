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
    GlobalAjax("/api/City/" +region_choice + "/GetCitiesByRegion", "GET", "", SuccessCity, FailCity);
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
        $("#select_event_city").append(AddOption_city(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_city(item) {
    return '<option value="' + item.city_name + '">' + item.city_name + '</option>';
}

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
    GetProfileID();
    var new_workshop = {
        //id: parseInt(121),
        profile_id: prof_id,
        name: $('#workshop_name').val(),

        /*var d = new Date("2015-03-25T12:00:00Z");*/
        date_time: Date($('#workshop_date') + 'T' + $('#workshop_time_start')),  //תאריך ושעת התחלה

        city: $("#workshop_select_city").options[$("#workshop_select_city").selectedIndex].value,
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


function SuccessWorkshop() // פונקציה המתבצעת אחרי הוספה מוצלחת של אירוע
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


