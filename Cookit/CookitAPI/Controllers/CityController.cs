﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitAPI.DTO;
using CookitDB;


namespace CookitAPI.Controllers
{
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
        [Route("api/City")]
        public HttpResponseMessage Get()
        {
            bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
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
                        region_id = item.Id_Region,
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