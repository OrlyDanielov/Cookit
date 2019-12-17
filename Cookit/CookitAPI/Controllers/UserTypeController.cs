using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;
using CookitAPI.DTO;

namespace CookitAPI.Controllers
{
    [RoutePrefix("api/UserType")]
    public class UserTypeController : ApiController
    {
        // GET api/<controller>
        //מחזיר את כל סוגי המשתמשים מבסיס הנתונים
        [Route("GetAll")]
        [HttpGet]
        public HttpResponseMessage Get_all_user_type()
        {
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
            // קורא לפונקציה שמחזירה את כל סוגי המשתמשים מהDB
            var userType = CookitDB.DB_Code.CookitQueries.Get_all_User_Type();
            if (userType == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no user type in DB.");
            else
            {
                //המרה של רשימת סןגי משתמשים למבנה נתונים מסוג DTO
                List<UserTypeDTO> result = new List<UserTypeDTO>();
                foreach (TBL_UserType item in userType)
                {
                    result.Add(new UserTypeDTO
                    {
                        id = item.Id_Type,
                        user_type = item.Name_Type.ToString()
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
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