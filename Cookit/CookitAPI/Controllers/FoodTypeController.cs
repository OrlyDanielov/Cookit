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
    [RoutePrefix("api/FoodType")]
    public class FoodTypeController : ApiController
    {

        #region GetAllFoodType
        //מחזיר את כל סוגי האוכל מבסיס הנתונים
        [Route("GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            bgroup36_prodConnection db = new bgroup36_prodConnection();
            // קורא לפונקציה שמחזירה את כל סוגי האוכל מהDB
            var foodType = CookitDB.DB_Code.CookitQueries.Get_all_FoodType();
            if (foodType == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no FoodType in DB.");
            else
            {
                //המרה של רשימת סוגי האוכל למבנה נתונים מסוג DTO
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