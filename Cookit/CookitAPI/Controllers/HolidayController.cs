using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using CookitDB;
using CookitAPI.DTO;

namespace CookitAPI.Controllers
{
    [RoutePrefix("api/Holiday")]
    public class HolidayController : ApiController
    {
        #region Get All Holidays
        [Route("GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                var holiday = CookitDB.DB_Code.CookitQueries.Get_all_Holidays();
                if (holiday == null) // אם אין נתונים במסד נתונים
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no holidays in DB.");
                else
                {
                    //המרה של רשימת סןגי משתמשים למבנה נתונים מסוג DTO
                    List<HolidayDTO> result = new List<HolidayDTO>();
                    foreach (TBL_Holiday item in holiday)
                    {
                        result.Add(new HolidayDTO
                        {
                            id = item.Id_Holiday,
                            holiday_name = item.Name_Holiday.ToString()
                        });
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
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