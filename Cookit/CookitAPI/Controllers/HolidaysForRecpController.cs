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
    [RoutePrefix("api/HolidaysForRecpController")]
    public class HolidaysForRecpController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        #region Add New Holiday 2 Recipe
        //Add New Holiday 2 Recipe
        [Route("AddNewHoliday2Recipe")]
        [HttpPost]
        public HttpResponseMessage AddNewHoliday2Recipe([FromBody]List<Holidays2RecipeDTO> newholiday2Recipe)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_HolidaysForRecp> list_holiday_2_recp = new List<TBL_HolidaysForRecp>();
                TBL_HolidaysForRecp hd2recp;
                for (int i = 0; i < newholiday2Recipe.Count; i++)
                {

                    hd2recp = new TBL_HolidaysForRecp()
                    {
                        Id_Holiday = newholiday2Recipe[i].id_holiday,
                        Id_Recp = newholiday2Recipe[i].id_recp
                    };
                    list_holiday_2_recp.Add(hd2recp);
                }
                var is_saved = CookitDB.DB_Code.CookitQueries.AddHolidays2Recipe(list_holiday_2_recp);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the holidays added Successfully to the recipe.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the holidays to the recipe.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

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