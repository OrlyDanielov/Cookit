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
    [RoutePrefix("api/Workshop")]
    public class WorkshopController : ApiController
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

        [Route("AddNewWorkshop")]
        //הוספת סדנא לבסיס הנתונים
        [HttpPost]
        public HttpResponseMessage AddNewWorkshop([FromBody]TBL_Workshop newWorkshop)
        {
           // bgroup36_prodConnection db = new bgroup36_prodConnection();
            Cookit_DBConnection db = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות

            var is_saved = CookitDB.DB_Code.CookitQueries.AddNewWorkshop(newWorkshop);
            if (is_saved == true)
                return Request.CreateResponse(HttpStatusCode.OK, is_saved);
            else
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the workshop.");
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