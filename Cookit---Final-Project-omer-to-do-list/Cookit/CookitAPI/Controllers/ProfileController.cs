using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitAPI.DTO;
using CookitDB;

namespace CookitAPI.Controllers
{
    [RoutePrefix("api/Profile")]
    public class ProfileController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        
        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        /*
        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }
        */

        //add new profile
        [Route("AddNewProfile")]
        [HttpPost]
        public HttpResponseMessage AddNewProfile([FromBody]TBL_Profile new_profile)
        {
            try
            {
                bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות

                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewProfile(new_profile);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, is_saved);
                else
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "the server can't add the profile.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }



        [Route("{user_id}/GetProfileIDByUserID")]
        [HttpGet]
        public HttpResponseMessage GetProfileIDByUserID(int id)
        {
            bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
            int p_id = CookitDB.DB_Code.CookitQueries.GetProfileIDOfUserByID(id);
            if (p_id != -1)
                return Request.CreateResponse(HttpStatusCode.OK, p_id);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, "the server could not find the profile number of user by user id.");
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