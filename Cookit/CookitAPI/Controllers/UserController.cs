using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using CookitDB;
using CookitAPI.DTO;


namespace Cookit.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {

        #region Login
        [Route("{email}/{pass}")]
        [HttpGet]
        public HttpResponseMessage Login(string email, string pass)
        {
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            Cookit_DBConnection db = new Cookit_DBConnection();
            TBL_User user = CookitDB.DB_Code.CookitQueries.LogIn(email, pass); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

            if (user == null) // אם אין משתמש שכזה
                return Request.CreateResponse(HttpStatusCode.NotFound, "this user does not exist.");
            else
            {
                //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                UserDTO result = new UserDTO();
                result.id = user.Id_User;
                result.user_type = user.Id_Type;
                result.first_name = user.FirstName;
                result.last_name = user.LastName;
                result.email = user.Email;
                result.gender = user.Gender;
                result.pasword = user.UserPass;
                result.status = user.UserStatus;
                result.number_of_draw_recipe = user.NumDrawRecp;

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

        #region Check Mail Exsist
        //check if mail available. if available return true, else return false.
        [Route("{new_email}/CheckMailAvailable")]
        [HttpGet]
        public HttpResponseMessage CheckMailAvailable(string new_email)
        {
            Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
            bool flag = CookitDB.DB_Code.CookitQueries.CheckMailAvailable(new_email);
            if (flag)
                return Request.CreateResponse(HttpStatusCode.OK, "");
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, "this email already exsist.");
        }
        #endregion

        #region send mail with the password
        //[Route("/api/User/SendMail/{email}/{2}")]
        ////[HttpGet("Get_SendMail")]
        //public HttpResponseMessage Get(string email,int num)//Get_SendMail
        //{
        //    try
        //    {
        //        Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
        //        bool isSent = CookitDB.DB_Code.CookitQueries.SendMail(email);
        //        if (isSent)
        //            return Request.CreateResponse(HttpStatusCode.OK, "");
        //        else
        //            return Request.CreateResponse(HttpStatusCode.NotFound, "the mail can't sent now.");
        //    }
        //    catch (Exception e)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
        //    }
        //}
        #endregion

        #region Get User Information
        ////get user information
        //[Route("api/User/info/{email}")]
        //[HttpGet("GetUserInfo")]
        //public HttpResponseMessage GetUserInfo(string email)
        //{
        //    Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
        //    bool isExsist = CookitDB.DB_Code.CookitQueries.GetUserInfo(email);
        //    if (isExsist)
        //        return Request.CreateResponse(HttpStatusCode.OK, "");
        //    else
        //        return Request.CreateResponse(HttpStatusCode.NotFound, "this mail does not exist.");
        //}
        #endregion

        #region Get UserId By Email
        //get user id by email, becuse mail is unique
        [Route("{user_email}/GetIdByEmail")]
        [HttpGet]
        public HttpResponseMessage GetIdByEmail(string user_email)//)
        {
            Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
            int id = CookitDB.DB_Code.CookitQueries.GetUserIdByEmail(user_email);
            if(id != -1)
                return Request.CreateResponse(HttpStatusCode.OK,id);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, "the server could not find the user by this email.");
        }
        #endregion

        #region Add New User
        [Route("AddNewUser")]
        [HttpPost]
        public HttpResponseMessage AddNewUser([FromBody]TBL_User newUser)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewUser(newUser);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the user added seccussfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the user.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion        

        #region Update User Info
        [Route("UpdateUserInfo")]
        [HttpPut]
        public HttpResponseMessage UpdateUserInfo([FromBody]UserDTO user)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_User u = new TBL_User() {
                    Id_User = user.id,
                    Id_Type = user.user_type,
                    FirstName = user.first_name,
                    LastName = user.last_name,
                    Email = user.email,
                    Gender = user.gender,
                    UserPass = user.pasword,
                    UserStatus = true,
                    NumDrawRecp = 0
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.UpdateUserInfo(u);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the user information updated seccussfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't update user information.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
            #endregion

            // DELETE api/<controller>/5
            public void Delete(int id)
        {
        }
    }
}