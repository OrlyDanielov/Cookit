using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;
using Cookit.DTO;

namespace Cookit.Controllers
{
    public class IngriditansController : ApiController
    {
        // GET api/<controller>
        //מחזיר את כל המצרכים מבסיס הנתונים
        [Route("api/Ingridiants")]
        public HttpResponseMessage Get()
        {
            bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
            // קורא לפונקציה שמחזירה את כל המצרכים מהDB
            var ingridiants = CookitDB.DB_Code.CookitQueries.Get_all_Ingridiants();
            if (ingridiants == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no Ingridiants in DB.");
            else
            {
                //המרה של רשימת המצרכים למבנה נתונים מסוג DTO
                List<IngridiantsDTO> result = new List<IngridiantsDTO>();
                foreach (TBL_Ingridiants item in ingridiants)
                {
                    result.Add(new IngridiantsDTO
                    {
                        id = item.Id_Ingridiants,
                        ingridinat = item.Name_Ingridiants.ToString()
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