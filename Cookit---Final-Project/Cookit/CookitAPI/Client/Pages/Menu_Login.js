//פונקציות של דפים של משתמש מחובר
// פונקצית התנתקות
function Logout() {
       //ניקוי של הערכים בזיכרון
    sessionStorage.clear();
    //מעבר לדף הבית הלא מחובר
    window.location.replace("Home_logout.html");
}