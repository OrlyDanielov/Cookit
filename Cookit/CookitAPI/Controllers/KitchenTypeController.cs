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
    public class KitchenTypeController : ApiController
    {
        // GET api/<controller>
        //מחזיר את כל סוגי המטבחים מבסיס הנתונים
        [Route("api/KitchenType")]
        public HttpResponseMessage Get()
        {
            bgroup36_prodConnection db = new bgroup36_prodConnection();
            var kitchenType = CookitDB.DB_Code.CookitQueries.Get_all_KitchenType();
            if (kitchenType == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no KitchenType in DB.");
            else
            {
                //המרה של רשימת סוגי המבטבחים למבנה נתונים מסוג DTO
                List<KitchenTypeDTO> result = new List<KitchenTypeDTO>();
                foreach (TBL_KitchenType item in kitchenType)
                {
                    result.Add(new KitchenTypeDTO
                    {
                        id = item.Id_Kitchen,
                        kitchen_type = item.Kitchen_Name.ToString()
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