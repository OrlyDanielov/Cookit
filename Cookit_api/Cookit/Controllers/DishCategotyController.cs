using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using CookitLibrary;

namespace Cookit.Controllers
{
    public class DishCategotyController : ApiController
    {
        /*
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        */

        //מחזיר את כל המאפייני מנה מבסיס הנתונים
        [Route("api/DishCategoty")]
        public dynamic Get()
        {
            Cookit_DB db = new Cookit_DB();
            return db.TBL_DishCategory.Select(x => new
            {
                id = x.Id_DishCategory,
                category = x.Name_DishCategory
            }).ToList();
          // return new string[] { "value1", "value2" };
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