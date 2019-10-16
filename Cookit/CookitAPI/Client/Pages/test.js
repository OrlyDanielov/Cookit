function test() {
    var user_email = "orlydanielov@gmail.com";//($("#email").val()).toString();
    //GlobalAjax("/api/User/GetIdByEmail/" + email, "GET", "", Success_GetId, Fail_GetId);
    //GlobalAjax("/api/User/GetIdByEmail/", "GET", "", Success_GetId, Fail_GetId);

    GlobalAjax("/api/User/" + user_email +"/GetIdByEmail", "GET", "", Success_GetId, Fail_GetId);


}

function Success_GetId(data) {
    user_id = data;
    console.log("user id :" + user_id);
}

function Fail_GetId(data) {
    //Console.log("cant get user id");
    console.log(data);
}
