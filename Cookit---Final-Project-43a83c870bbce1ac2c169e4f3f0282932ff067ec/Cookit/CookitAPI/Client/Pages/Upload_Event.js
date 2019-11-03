// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    //רשימת הערים ממסד הנתונים
    var arry_city = new Array();
    // הבאת הערים
    GetCities();
});


//***************************************************************************//
//הפונקציה מביאה את רשימת הערים ממסד הנתונים
function GetCities()
{
        // קריאה לפונקצית ajax של Get מהשרת עבור נתוני cities
        GlobalAjax("/api/City", "GET", "", SuccessCity, FailCity);
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
        $("#event_select_city").append(AddOption_city(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_city(item) {
    return '<option value="' + item.city_name + '">' + item.city_name + '</option>';
}

//***************************************************************************//

function UploadEvent() //הפונקציה שולחת את פרטי האיוע לשרת
{ //אירוע חדש
    var new_event = {
        id: parseInt(122),
        profile_id: parseInt(11),
        name: $('#event_name').val(),
        /*
        var d = new Date("2015-03-25T12:00:00Z");*/
        // date_time: $('#event_date') + $('#event_time_start'),//תאריך ושעת התחלה
        date_time: Date($('#event_date') + 'T' + $('#event_time_start')),
        city: null,//$("#event_select_city").options[$("#event_select_city").selectedIndex].value,
        description: $('#txt_event_description').val(),
        statusCancel: false
    };
    
    //שמירת האובייקטים בsseion storage
    sessionStorage.setItem("newEvent", JSON.stringify(new_event));
    
    //שליחת הנתונים לשרת
    GlobalAjax("/api/Event", "POST", new_event, SuccessEvent, FailEvent);

}


function SuccessEvent() // פונקציה המתבצעת אחרי הוספה מוצלחת של אירוע
{
    console.log("האירוע נוסף לשרת בהצלחה.");
}

function FailEvent()// פונקציה המתבצעת אחרי כישלון הוספה  של אירוע
{
    sessionStorage.removeItem("new_event");

    console.log("שגיאה בהוספת האירוע לשרת.");
    alert('שגיאה בהוספת האירוע לשרת.');
}


