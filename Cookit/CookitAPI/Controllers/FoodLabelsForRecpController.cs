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
    [RoutePrefix("api/FoodLabelsForRecp")]
    public class FoodLabelsForRecpController : ApiController
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

        #region  Add NewFood Lable 2 Recipe
        //Add New Food Lable 2 Recipe
        [Route("AddNewFoodLable2Recipe")]
        [HttpPost]
        public HttpResponseMessage FoodLable2Recipe([FromBody]List<FoodLable2RecipeDTO> newFl2Recipe)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_LabelsForRecp> list_lbl_2_recp = new List<TBL_LabelsForRecp>();
                TBL_LabelsForRecp food_lbl2recp;
                for (int i = 0; i < newFl2Recipe.Count; i++)
                {

                    food_lbl2recp = new TBL_LabelsForRecp()
                    {
                       Id_FoodLabel = newFl2Recipe[i].id_food_lable,
                       Id_Recp = newFl2Recipe[i].id_recipe
                    };
                    list_lbl_2_recp.Add(food_lbl2recp);
                }
                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewFoodLables2Recipe(list_lbl_2_recp);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the food lables added Successfully to the recipe.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the food lables.");

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