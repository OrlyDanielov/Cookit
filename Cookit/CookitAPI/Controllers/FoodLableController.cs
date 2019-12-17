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
    [RoutePrefix("api/FoodLable")]
    public class FoodLableController : ApiController
    {
        #region Get All Food Lable
        [Route("GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            try
            {
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                var food_lable = CookitDB.DB_Code.CookitQueries.Get_all_FoodLable();
                if (food_lable == null) // אם אין נתונים במסד נתונים
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no holidays in DB.");
                else
                {
                    //המרה של רשימת סןגי משתמשים למבנה נתונים מסוג DTO
                    List<FoodLableDTO> result = new List<FoodLableDTO>();
                    foreach (TBL_FoodLabel item in food_lable)
                    {
                        result.Add(new FoodLableDTO
                        {
                            id = item.Id_FoodLabel,
                            food_label = item.Name_FoodLabel.ToString()
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