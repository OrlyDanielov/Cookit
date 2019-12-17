using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
//using CookitDB;
using CookitAPI;
using CookitAPI.DB_Code;
using Cookit.DTO;

namespace Cookit.Controllers
{
    public class DishTypeController : ApiController
    {
        //מחזיר את כל הסוגי מנה מבסיס הנתונים
        [Route("api/DishType")]
        public HttpResponseMessage Get()
        {
            // קורא לפונקציה שמחזירה את כל הסוגי מנה מהDB
            var dishType =  CookitQueries.Get_all_DishType(); 
            if (dishType == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound,"there is no DishType in DB.");
            else {
                //המרה של רשימת הסוגי מנות למבנה נתונים מסוג DTO
                List<DishTypeDTO> result =  new List<DishTypeDTO>();
                    foreach (TBL_DishType item in dishType)
                    {
                        result.Add(new DishTypeDTO
                        {
                            id = item.Id_DishType,
                            dish_type = item.Name_DishType.ToString()
                        });
                    }
                    return Request.CreateResponse(HttpStatusCode.OK,result);
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