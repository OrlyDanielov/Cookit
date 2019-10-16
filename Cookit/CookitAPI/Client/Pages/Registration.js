//משתנים גלובליים
//רשימת הערים ממסד הנתונים
var arry_city = new Array();
// רשימת סוגי המשתמשים
var arry_userType = null;
//האם למשתמש יש פרופיל
var isHasProfile = false;

//האם נתוני ההרשמה תקינים
var form_validation = true;
//רשימת הנתונים התקינים בטופס
var user_validation = {
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    pass_2: false,
    pass_auth: false,
    user_type: false
};
var profile_validation = {
    prof_name: false,
    prof_description: false,
    city: false
};

//תז משתמש
var user_id = -1;
//***************************************************************************//
// הפונקציה קוראת בתחילת הקריאה לדף
$(document).ready(function () {
    // הבאת סוגי המשתמשים
    GetUserType();
});
//***************************************************************************//
function GetUserType()
// הפונקציה מביאה את סוגי המשתמשים מהמסד נתונים
{
    if (sessionStorage.getItem('arry_userType') == null)
    // כדי לקורא רק פעם אחת
    {
        GlobalAjax("/api/UserType/GetAll", "GET", "", SuccessUserType, FailUserType);
    }
    else
        SuccessUserType(sessionStorage.getItem("arry_userType"));
}

function SuccessUserType(arry_userType) {
    console.log(arry_userType);
    sessionStorage.setItem("arry_userType", arry_userType);
    initUserType(arry_userType);
}

function FailUserType() {
    console.log("שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.");
    alert('שגיאה במשיכת נתוני סוגי המשתמשים מהשרת.');
}
function initUserType(data)
//הפונקציה מכניסה את ערכי מהבסיס נתונים באופן דינמי אל רשימה נגללת
{
    var str;
    for (i in data) {
        if (data[i].user_type !== "מנהל")
            $("#select_user_type").append(AddOption_UserType(data[i]));
    }
}

//הפונקציה מוסיפה אופציה לרשימה הנגללת
function AddOption_UserType(item) {
    return '<option value="' + item.id + '">' + item.user_type + '</option>';
}
//***************************************************************************//
function GetCities()
//הפונקציה מביאה את רשימת הערים ממסד הנתונים
{
    if (sessionStorage.getItem('arry_city') == null)
    // כדי לקורא רק פעם אחת
    {
        GlobalAjax("/api/City", "GET", "", SuccessCity, FailCity);
    }
    else
        SuccessCity(sessionStorage.getItem("arry_city"));
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
// פונקציה שבודקת האם הלקוח הוא מסוג שדורש פרופיל
// אם כן - מציגה בטופס את החלק אותו צריך למלא
function IsProfile() {
    var user_type = $('#select_user_type').find(":selected").text();
    if(user_type === "אנין טעם" || user_type === "עסקי") 
    {
        isHasProfile = true;
        //הבאת הערים ממסד הנתונים
        GetCities();        
        //הצגת פרטי הפרופיל
        document.getElementById("div_Profile_details").style.display = "block";
        document.getElementById("div_Profile_details").reload;
    }
    else {
        isHasProfile = false;
        document.getElementById("div_Profile_details").style.display  = "none";
        document.getElementById("div_Profile_details").reload; // טעינת הדף מחדש
    }
}
//***************************************************************************//
function CheckIfMailExsist()
//בודק האם כבר קיים מייל כזה במערכת
{
    var email = $("#email").val();
    GlobalAjax("/api/User/CheckMail/" + email, "GET", "", Success_CheckMail, Fail_CheckMail);
}

function Success_CheckMail()
//מייל זה לא קיים במערכת
{
  
}

function Fail_CheckMail(data)
// כבר קיים מייל כזה במערכת
{
    console.log(data.T);
    console.log("מייל זה כבר קיים במערכת " + $("#email").val());
    if (confirm("אימייל זה כבר קיים במערכת. האם אתה רוצה להתחבר עם מייל זה ?"))
        location.replace("Login.html");
    }
//***************************************************************************//
function Check_Password() // פונקציה בודקת שהסיסמה זהה לאימות סיסמה
{
    //When the user starts to type something inside the password field
    //myInput.onkeyup = function () {
    let password = $("#password").val(); //הסיסמה
    let flag = true;
    //Validate length
    if (password.length >= 6 && password.length <= 12) {
        form_validation = true;        
        //length.classList.remove("invalid");
        //length.classList.add("valid");
    }
    else {
        form_validation = false;
        flag = false;
        //length.classList.remove("valid");
        //length.classList.add("invalid");
    }
    if (flag) {
        //Validate lowercase and  letters
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        if (password.match(lowerCaseLetters) || password.match(upperCaseLetters)) {
            form_validation == true;
            //letter.classList.remove("invalid");
            //letter.classList.add("valid");
        }
        else {
            form_validation = false;
            flag = false;
            //letter.classList.remove("valid");
            //letter.classList.add("invalid");
        }
        /*
        //Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (password.match(upperCaseLetters)) {
            form_validation = true;
            //break;
            //capital.classList.remove("invalid");
            //capital.classList.add("valid");
        }
        else {
            form_validation = false;
            //capital.classList.remove("valid");
            //capital.classList.add("invalid");
        }
        */
        if (flag) {
            //Validate numbers
            var numbers = /[0-9]/g;
            if (password.match(numbers)) {
                form_validation = true;
                //number.classList.remove("invalid");
                //number.classList.add("valid");
            }
            else {
                form_validation = false;
                flag = false;
                //number.classList.remove("valid");
                //number.classList.add("invalid");
            }
            if (flag) {
                //if password equal to password authentication
                let pass1 = $("#password").val();
                let pass2 = $("#password_authentication").val();
                if (pass1 === pass2)
                    form_validation = true;
                else {
                    form_validation = false;
                    alert("אנא וודא שהסיסמה זהה לאימות סיסמה.");
                }
            }
        }
    }
}
//***************************************************************************//
function Check_Personal_Data()
//בודק את תקינות הפרטים האישיים
{
    var personalData = {
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        email: $("#email").val(),
        gender: $("input[name='gender']:checked").val(),
        pasword: $("#password").val(),
        pass2: $("#password_authentication").val(),
        user_type: $('#select_user_type').find(":selected").val()
    };
    let degel = true;
    for (var i in personalData) {
        if (personalData[i] == "") {
            form_validation = false;
            degel = false;
            console.log(i + " is missing.");
            // לרשומות החסרות יופיעו תוויות הערה למשתמש
        }
    }
    if (degel == true)
        form_validation = true;
}
//***************************************************************************//
function Check_Profile_Data()
//בודק את תקינות הפרטים האישיים
{
    var profileData = {
        name: $("#profile_name").val(),
        description: $("#profile_description").val(),
        city: $("#select_city").find(":selected").val(),
        type: $('#select_user_type').find(":selected").val()
    };
    let degel = true;
    for (var i in profileData) {
        if (profileData[i] == "") {
            form_validation = false;
            degel = false;
            console.log(i + " is missing.");
            // לרשומות החסרות יופיעו תוויות הערה למשתמש
        }
    }
    if (degel == true)
        form_validation = true;
}
//***************************************************************************//

//function Form_Validation() {
//    window.addEventListener('load', function () {
//        // Fetch all the forms we want to apply custom Bootstrap validation styles to
//        var forms = document.getElementsByClassName('needs-validation');

//        // Loop over them and prevent submission
//        Array.prototype.filter.call(forms, function (form) {
//            form.addEventListener('submit', function (event) {
//                if (form.checkValidity() === false) {
//                    event.preventDefault();
//                    event.stopPropagation();
//                }
//                form.classList.add('was-validated');
//            }, false);
//        });
//    }, false);
//}

//***************************************************************************//
    function IsFormValid() // הפונקציה בודקת הנתוני הטופס תקינים 
    {
        //בדיקת פרטים אישיים
        Check_Personal_Data();  
        //CheckIfMailExsist();
        if (form_validation == true) {
            //בדיקת תקינות סיסמה
            Check_Password();
            if (form_validation == true) {
                // האם יש פרופיל
                let user_type = $('#select_user_type').find(":selected").val();
                if (user_type !== "1") //אם יש גם פרופיל //יצירתי
                {
                    //פרטי פרופיל
                    Check_Profile_Data();
                }
            }
        }
    }

    //***************************************************************************//
    //פונקצית הרשמה
function Registration() {
    //Form_Validation();
        //בדיקת תקינות הטופס
        IsFormValid();
        //ביצוע ההרשמה
        if (form_validation === true) {
            //הוספת משתמש חדש
            AddNewUser();
            //קבלת תז המשתמש החדש שהוסף
            //GetUserIdByEmail();
            ////הוספת פרופיל חדש
            //if (isHasProfile === true)
            //    AddNewProfile();
        }
        else {
            alert("אנא תקן את פרטי ההרשמה במקומות המסומנים.");
        }
    }
    //***************************************************************************//
    //function SuccessRegistration() {
    //    //כאשר ההרשמה בוצע בהצלחה
    //    console.log("הרשמה בוצעה בהצלחה!.");
    //    alert("ההרשמה בוצעה בהצלחה. כעת את יכול להתחבר לחשבונך.");
    //    //window.location.replace("Home_logout.html");

    //    //window.confirm("ההרשמה בוצעה בהצלחה. כעת את יכול להתחבר לחשבונך.");
    //    //if (confirm("Press a button!")) {
    //    //    txt = "You pressed OK!";
    //    //} else {
    //    //    txt = "You pressed Cancel!";
    //    //}
    //}



    //***************************************************************************//

    function AddNewUser()// הפונקציה שולחת את פרטי המשתמש לשרת
    {    //משתמש חדש
        var new_user = {
            Id_Type: parseInt($('#select_user_type').find(":selected").val()),
            FirstName: ($("#first_name").val()).toString(),
            LastName: ($("#last_name").val()).toString(),
            Email: ($("#email").val()).toString(),
            Gender: ($("input[name='gender']:checked").val()).toString(),
            UserPass: ($("#password").val()).toString(),
            status: parseInt(1),
            number_of_draw_recipe: 0
        };
        //שליחת הנתונים לשרת
        GlobalAjax("/api/User/AddNewUser", "POST", new_user, SuccessUser, FailUser);
    }

    function SuccessUser()//isHasProfile) // פונקציה המתבצעת אחרי הוספה מוצלחת של משתמש
    {
        console.log("המשתמש נוסף לשרת בהצלחה.");
        
        if (!(isHasProfile)) {
            alert('ההרשמה בוצעה בהצלחה.\n אנא התחבר לחשבונך.');
            window.location.replace("Home_logout.html");
        }
        else        //אם יש גם פרופיל
        {
            //get user id
            GetUserIdByEmail();
        }

    }

    function FailUser(data)// פונקציה המתבצעת אחרי כישלון הוספה  של משתמש
    {
        console.log("שגיאה בהוספת המשתמש לשרת.");
        console.log(data.T);
        alert('שגיאה בהוספת המשתמש לשרת.');
}
//***************************************************************************//
function GetUserIdByEmail()
//משיג את התז של המשתמש לפי האימייל שלו
{
    var user_email = ($("#email").val()).toString();
    GlobalAjax("/api/User/" + user_email + "/GetIdByEmail", "GET", "", Success_GetId, Fail_GetId);
}

function Success_GetId(data) {
    user_id = data;
    console.log("user id :" + user_id);
    //add the new profile
    AddNewProfile();
}

function Fail_GetId(data) {
    console.log("cant get user id");
    console.log(data);
}
    //***************************************************************************//
    function AddNewProfile()// הפונקציה שולחת את פרטי משתמש לשרת
    {
        //בודק את סוג הפרופיל
        var profile_type = $('#select_user_type').find(":selected").text(); // סוג פרופיל
        let _type;
        if (profile_type === 'עסקי')
            _type = 'B';
        else
            _type = 'F';       
        //פרופיל חדש
        var new_profile = {
            Id_User: user_id,
            ProfType: _type,
            Name_Prof: $("#profile_name").val(),
            ProfDescription: $("#profile_description").val(),
            CityName: $('#select_city').find(":selected").val(),
            ProfStatus: 1
        };
        //שליחת הנתונים לשרת
        GlobalAjax("/api/Profile/AddNewProfile", "POST", new_profile, SuccessProfile, FailProfile);
    }

    function SuccessProfile() // פונקציה המתבצעת אחרי הוספה מוצלחת של פרופיל
    {
        console.log("הפרופיל נוסף לשרת בהצלחה.");
        alert('ההרשמה בוצעה בהצלחה.\n אנא התחבר לחשבונך.');
        window.location.replace("Home_logout.html");
    }

    function FailProfile()// פונקציה המתבצעת אחרי כישלון הוספה  של פרופיל
    {
        console.log("שגיאה בהוספת הפרופיל לשרת.");
        alert('שגיאה בהוספת הפרופיל לשרת.');
}
//***************************************************************************//
function DisplayFormDirection(btn_cliked_id) {
    // get the id of the mutch span
    var span_name = "div_question";
    var words = btn_cliked_id.split('_');
    for (var i = 0; i < words.length; i++) {
        if (i !== 0) {
            span_name = span_name.concat("_"+words[i]);
        }
    }
    /* יש בעיה בהצגה, בכל פעם מרענן את כל הדף ומחק מידע שנרשם
    //display on\off the span
    var display_state = $("#" + span_name).css('display');
    if (display_state == 'none')
        //$("#" + span_name).show('slow');
        $("#" + span_name).style.display = "block";
    else
        //$("#" + span_name).hide('slow');    
        $("#" + span_name).style.display = "none";
    //$("#" + span_name).reload; // טעינת הדף מחדש
    */
}


