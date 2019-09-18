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
    public class UserController : ApiController
    {
        #region Login
        [Route("api/User/{email}/{pass}")]
        public HttpResponseMessage Get(string email,string pass)
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


        //check if mail exsist
        [Route("api/User/CheckMail/{email}")]
        //[HttpGet("Get_CheckMail")]
        public HttpResponseMessage Get(string email)//Get_CheckMail
        {
            Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
            bool isExsist = CookitDB.DB_Code.CookitQueries.CheckMail(email);
            if(isExsist)
                return Request.CreateResponse(HttpStatusCode.OK, "");
            else
                return Request.CreateResponse(HttpStatusCode.NotFound, "this user does not exist.");
        }

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


        //add new user
        [Route("api/User/AddNewUser")]
        public HttpResponseMessage Post([FromBody]TBL_User newUser)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות

                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewUser(newUser);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, is_saved);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the user.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        // PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}


        [Route("api/User/UpdateUserInfo")]
        public void Post([FromBody]string email)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
            }
            catch(Exception e)
            {
                //return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
            }
        }

        //update user info
        [HttpPost]
        [Route("api/User/UpdateUserInfo")]
        public HttpResponseMessage UpdateUserInfo([FromBody]UserDTO newUser)
        {
            Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
            TBL_User new_TBL_User = CookitDB.DB_Code.CookitQueries.GetUserByEmail(newUser.email);
            if (new_TBL_User != null)
            {
                new_TBL_User.FirstName = newUser.first_name;
                new_TBL_User.LastName = newUser.last_name;
                new_TBL_User.Email = newUser.email;
                new_TBL_User.Gender = newUser.gender;
                new_TBL_User.Id_Type = newUser.user_type;
                //TBL_User new_TBL_User = new TBL_User()
                //{
                //    Id_User = newUser.id,
                //    Id_Type = newUser.user_type,
                //    FirstName = newUser.first_name,
                //    LastName = newUser.last_name,
                //    Email = newUser.email,
                //    Gender = newUser.gender,
                //};

                var is_saved = CookitDB.DB_Code.CookitQueries.UpdateUserInfo(new_TBL_User);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, is_saved);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't update user information.");
            }
            else
                return Request.CreateResponse(HttpStatusCode.NotFound, "server can't fount the current user.");
        }





        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}