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
    public class EventController : ApiController
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

        [Route("api/Event/UploadEvent")]
        //הוספת אירוע לבסיס הנתונים
        public HttpResponseMessage Post([FromBody]TBL_Event newEvent)
        {
            Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות

            var is_saved = CookitDB.DB_Code.CookitQueries.AddNewEvent(newEvent);
            if (is_saved == true)
                return Request.CreateResponse(HttpStatusCode.OK, is_saved);
            else
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the event.");
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