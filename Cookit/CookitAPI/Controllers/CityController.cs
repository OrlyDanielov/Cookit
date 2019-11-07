using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitAPI.DTO;
using CookitDB;


namespace CookitAPI.Controllers
{
    [RoutePrefix("api/City")]
    public class CityController : ApiController
    {
        /*
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        */
        //מחזיר את כל הערים מבסיס הנתונים
        [Route("GetAllCities")]
        [HttpGet]
        public HttpResponseMessage GetAllCities()
        {
           // bgroup36_prodConnection db = new bgroup36_prodConnection();
            Cookit_DBConnection db = new Cookit_DBConnection();
            // קורא לפונקציה שמחזירה את של הערים מהDB
            var cities = CookitDB.DB_Code.CookitQueries.Get_all_cities();
            if (cities == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no cities in DB.");
            else
            {
                //המרה של רשימת הערים למבנה נתונים מסוג DTO
                List<CityDTO> result = new List<CityDTO>();
                foreach (TBL_City item in cities)
                {

                    result.Add(new CityDTO
                    {
                        id_city = item.Id_City,
                        city_name = item.CityName.ToString(),
                        id_region = item.Id_Region
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }

        //מחזיר את כל המחוזות מבסיס הנתונים
        [Route("GetRegions")]
        [HttpGet]
        public HttpResponseMessage GetRegions()
        {
           // bgroup36_prodConnection db = new bgroup36_prodConnection();
            Cookit_DBConnection db = new Cookit_DBConnection();
            // קורא לפונקציה שמחזירה את רשימת מחוזות בשם מהDB
            var regs = CookitDB.DB_Code.CookitQueries.Get_all_Regions();
            if (regs == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "did not manage to get regions from DB.");
            else
            {
                //המרה של רשימת המחוזות לערים למבנה נתונים מסוג DTO
                List<RegionDTO> result = new List<RegionDTO>();
                foreach (TBL_City item in regs)
                {

                    result.Add(new RegionDTO
                    {
                        name = item.Region.ToString()
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }


        //מחזיר את כל הערים לפי מחוז
        [Route("{c_reg}/GetCitiesByRegion")] //c_reg= choosen region
        [HttpGet]
        public HttpResponseMessage GetCitiesByRegion(string c_reg)
        {
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            Cookit_DBConnection db = new Cookit_DBConnection();
            // קורא לפונקציה שמחזירה את שם הערים מהDB
            var cities = CookitDB.DB_Code.CookitQueries.Get_all_cities().Where(a => a.Region == c_reg);//מסנן את הערים רק לפי מחוז רצוי
            if (cities == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no cities in DB.");
            else
            {
                //המרה של רשימת הערים למבנה נתונים מסוג DTO
                List<CityDTO> result = new List<CityDTO>();
                foreach (TBL_City item in cities)
                {

                    result.Add(new CityDTO
                    {
                        region = item.Region.ToString(),
                        city_name = item.CityName.ToString()
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