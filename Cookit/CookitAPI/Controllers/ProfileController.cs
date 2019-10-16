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
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות

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