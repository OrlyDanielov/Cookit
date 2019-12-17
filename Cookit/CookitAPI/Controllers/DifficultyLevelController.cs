using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Cookit.DTO;
//using CookitDB;
using CookitAPI;
using CookitAPI.DB_Code;

namespace Cookit.Controllers
{
    [RoutePrefix("api/DifficultyLevel")]
    public class DifficultyLevelController : ApiController
    {
        #region GetAllDifficultyLevel
        //מחזיר את כל דרגות הקושי למתכון מבסיס הנתונים
        [Route("GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            // קורא לפונקציה שמחזירה את דגרות הקושי של מתכון מהDB
            var diffLevel = CookitQueries.Get_all_DifficultyLevel();
            if (diffLevel == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no DifficultyLevel in DB.");
            else
            {
                //המרה של רשימת רמות קושי למתכון למבנה נתונים מסוג DTO
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
        #endregion

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