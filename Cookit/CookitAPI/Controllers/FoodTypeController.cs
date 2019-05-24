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
    public class FoodTypeController : ApiController
    {
        public object CookitLibrary { get; private set; }

        // GET api/<controller>
        [Route("api/FoodType")]
        public HttpResponseMessage Get()
        {
            Cookit_DBConnection db = new Cookit_DBConnection();
            // קורא לפונקציה שמחזירה את של סוגי האוכל מהDB
            var foodType = CookitDB.DB_Code.CookitQueries.Get_all_FoodType();
            if (foodType == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no FoodType in DB.");
            else
            {
                //המרה של רשימת של סוגי האוכל למבנה נתונים מסוג DTO
                List<FoodTypeDTO> result = new List<FoodTypeDTO>();
                foreach (TBL_FoodType item in foodType)
                {
                    result.Add(new FoodTypeDTO
                    {
                        id = item.Id_FoodType,
                        food_type = item.Name_FoodType.ToString()
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