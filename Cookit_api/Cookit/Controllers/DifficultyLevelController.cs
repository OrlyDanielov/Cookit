using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Cookit.DTO;
using CookitLibrary;

namespace Cookit.Controllers
{
    public class DifficultyLevelController : ApiController
    {
        // GET api/<controller>
        //מחזיר את כל דרגות הקושי למתכון מבסיס הנתונים
        [Route("api/DifficultyLevel")]
        public HttpResponseMessage Get()
        {
            Cookit_DB db = new Cookit_DB();
            // קורא לפונקציה שמחזירה את של דגרות הקושי מהDB
            var diffLevel = CookitLibrary.DB_Code.CookitQuery.Get_all_DifficultyLevel();
            if (diffLevel == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no DifficultyLevel in DB.");
            else
            {
                //המרה של רשימת של קטגוריות המנות למבנה נתונים מסוג DTO
                List<DifficultyLevelDTO> result = new List<DifficultyLevelDTO>();
                foreach (TBL_RecipeDifficultyLevel item in diffLevel)
                {
                    result.Add(new DifficultyLevelDTO
                    {
                        id = item.Id_Level,
                        difficulty_level = item.Name_Level.ToString()
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