
// פונקצית התנתקות
function Logout() {
    // ניקוי פרטי המשתמש מה
    sessionStorage.removeItem("Login_User");
    //מעבר לדף הבית הלא מחובר
    window.location.replace("Home_not_login.html");
}