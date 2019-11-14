using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;
using CookitAPI.DTO;

namespace CookitAPI.Controllers
{
    [RoutePrefix("api/Region")]
    public class RegionController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        #region GetAllRegion
        //מחזיר את כל הערים מבסיס הנתונים
        [Route("GetAllRegion")]
        [HttpGet]
        public HttpResponseMessage GetAllRegion()
        {
            bgroup36_prodConnection db = new bgroup36_prodConnection();
            var regions = CookitDB.DB_Code.CookitQueries.GetAllRegion();
            if (regions == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no regions in DB.");
            else
            {
                //המרה של רשימת הערים למבנה נתונים מסוג DTO
                List<RegionDTO> result = new List<RegionDTO>();
                foreach (TBL_Region item in regions)
                {

                    result.Add(new RegionDTO{
                  id = item.Id_Region,
                  region = item.Region
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

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