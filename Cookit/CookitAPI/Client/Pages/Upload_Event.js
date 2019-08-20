//משתנים גלובליים
//רשימת הערים ממסד הנתונים
var arry_city = new Array();
//דגל האם כבר הבנו את הערים
var isCity = false;

//***************************************************************************//
function GetCities()
    //הפונקציה מביאה את רשימת הערים ממסד הנתונים
{
    if (isCity === false)     //כדי שיקרא רק פעם אחת
    {
        isCity = true;
        // קריאה לפונקצית ajax של Get מהשרת עבור נתוני cities
        GlobalAjax("/api/City", "GET", "", SuccessCity, FailCity);
    }
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
function UploadEvent() { }