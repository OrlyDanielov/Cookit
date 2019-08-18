using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;
using CookitAPI.DTO;


namespace Cookit.Controllers
{
    public class UserController : ApiController
    {
        /*
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        */

        
        // GET api/<controller>/5
        [Route("api/User/{email}/{pass}")]
        //public HttpResponseMessage Get([FromBody]dynamic user_email_pass)
        public HttpResponseMessage Get(string email,string pass)
        {
            bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
            //TBL_User user = CookitDB.DB_Code.CookitQueries.LogIn(user_email_pass.Email, user_email_pass.Pass); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.
            TBL_User user = CookitDB.DB_Code.CookitQueries.LogIn(email, pass); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

            if (user == null) // אם אין משתמש שכזה
                return Request.CreateResponse(HttpStatusCode.NotFound, "this user does not exist.");
            else
            {
                //המרה של רשימת של אופני המדידה למבנה נתונים מסוג DTO
                UserDTO result = new UserDTO();
                //result.id = user.Id_User;
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
       

        /*
        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }
        */
        [Route("api/User/AddNewUser")]
        public HttpResponseMessage Post ([FromBody]TBL_User newUser)
        {
            Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות

            var is_saved = CookitDB.DB_Code.CookitQueries.AddNewUser(newUser);
            if(is_saved == true)
                return Request.CreateResponse(HttpStatusCode.OK, is_saved);
            else
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the user.");
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}