// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    //רשימת הערים ממסד הנתונים
    var arry_city = new Array();
    // הבאת הערים
    GetCities()
});


//***************************************************************************//
//הפונקציה מביאה את רשימת הערים ממסד הנתונים
function GetCities() {
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
        $("#workshop_select_city").append(AddOption_city(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_city(item) {
    return '<option value="' + item.city_name + '">' + item.city_name + '</option>';
}

//***************************************************************************//

function UploadWorkshop() //הפונקציה שולחת את פרטי האיוע לשרת
{ //אירוע חדש
    var new_workshop = {
        id: parseInt(121),
        profile_id: parseInt(11),
        name: $('#workshop_name').val(),
        /*
        var d = new Date("2015-03-25T12:00:00Z");*/
        // date_time: $('#workshop_date') + $('#workshop_time_start'),//תאריך ושעת התחלה
        date_time: Date($('#workshop_date') + 'T' + $('#workshop_time_start')),
        city: $("#workshop_select_city").options[$("#workshop_select_city").selectedIndex].value,
        description: $('#txt_workshop_description').val(),
        max_participants: parseInt($('#workshop_max_participants').val()),
        statusCancel: false,
        status_available: true
    }

    //שמירת האובייקטים בsseion storage
    sessionStorage.setItem("newWorkshop", JSON.stringify(new_workshop));

    //שליחת הנתונים לשרת
    GlobalAjax("/api/Workshop", "POST", JSON.stringify(new_workshop), SuccessWorkshop, FailWorkshop);

}


function SuccessWorkshop() // פונקציה המתבצעת אחרי הוספה מוצלחת של אירוע
{
    console.log("הסדנא נוסף לשרת בהצלחה.");
}

function FailWorkshop()// פונקציה המתבצעת אחרי כישלון הוספה  של אירוע
{
    sessionStorage.removeItem("new_workshop");

    console.log("שגיאה בהוספת הסדנא לשרת.");
    alert('שגיאה בהוספת הסדנא לשרת.');
}


