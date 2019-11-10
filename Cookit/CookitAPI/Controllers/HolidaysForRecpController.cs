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

        #region GetHolidaysByRecpId
        [Route("GetHolidaysByRecpId/{recp_id}")]
        [HttpGet]
        public HttpResponseMessage GetHolidaysByRecpId(int recp_id)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_HolidaysForRecp> holidays4recp = CookitDB.DB_Code.CookitQueries.GetHolidaysByRecpId(recp_id);
                if (holidays4recp == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this holidays recipe does not exist.");
                else
                {
                    Holidays2RecipeDTO holiday;
                    List<Holidays2RecipeDTO> list_holidays_2_recp = new List<Holidays2RecipeDTO>();
                    for (int i = 0; i < holidays4recp.Count; i++)
                    {

                        holiday = new Holidays2RecipeDTO()
                        {
                            id = holidays4recp[i].Id,
                            id_recp = holidays4recp[i].Id_Recp,
                            id_holiday = holidays4recp[i].Id_Holiday
                        };
                        list_holidays_2_recp.Add(holiday);
                    }

                    return Request.CreateResponse(HttpStatusCode.OK, list_holidays_2_recp);
                }

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

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