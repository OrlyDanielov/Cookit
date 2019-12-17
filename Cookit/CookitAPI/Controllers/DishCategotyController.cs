using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Cookit.DTO;
using CookitDB;

namespace Cookit.Controllers
{
    public class DishCategotyController : ApiController
    {
        
        //מחזיר את כל המאפייני מנה מבסיס הנתונים
        [Route("api/DishCategoty")]
        public HttpResponseMessage Get()
        {
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
            // קורא לפונקציה שמחזירה את כל המאפייני מנה מהDB
            var dishCategory = CookitDB.DB_Code.CookitQueries.Get_all_DishCategory();
            if (dishCategory == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no DishCategiry in DB.");
            else
            {
                //המרה של רשימת המאפייני מנות למבנה נתונים מסוג DTO
                List<DishCategoryDTO> result = new List<DishCategoryDTO>();
                foreach (TBL_DishCategory item in dishCategory)
                {
                    result.Add(new DishCategoryDTO
                    {
                        id = item.Id_DishCategory,
                        dish_category = item.Name_DishCategory.ToString()
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