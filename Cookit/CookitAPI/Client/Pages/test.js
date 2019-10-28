function UpdateProfileStatus() {//הסרת פרופיל - כלומר עדכון הסטאטוס ללא פעיל
    var p = {
        id:10,
        user_id: 24,
        type: "B",
        name: "בר רפאל",
        description: "בר הדוגמן",
        city: "אלון שבות",
        status: 0
    };
    //profileInfo.status = 0;
    //sessionStorage.removeItem("Login_Profile");
    GlobalAjax("/api/Profile/UpdateProfileInfo", "PUT", p, SuccessUpdateProfile, FailUpdateProfile);
}
function SuccessUpdateProfile() // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
{
    console.log('פרטי הפרופיל עודכני בהצלחה!.');
    //if (isProfile)
    //    AlertSuccsses2User();
}

function FailUpdateProfile(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
{
    console.log("שגיאה בעדכון פרטי פרופיל.");
    console.log(data);
    alert('שגיאה בעדכון פרטי פרויפל.');
}
