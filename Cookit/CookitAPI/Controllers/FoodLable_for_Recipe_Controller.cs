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
    [RoutePrefix("api/FoodLable2Recipe")]
    public class FoodLable_for_Recipe_Controller : ApiController
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

        /*
# region Add New Food Lable 2 Recipe
        [Route("AddNewFoodLable2Recipe")]
        [HttpPost]
        public HttpResponseMessage FoodLable2Recipe([FromBody]FoodLable2RecipeDTO newFl2Recipe)
        {

            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                tbl_l r = new TBL_Recipe()
                {
                    Id_Recipe_User = newRecipe.user_id,
                    Name_Recipe = newRecipe.recp_name,
                    Id_Recipe_DishType = newRecipe.recp_dish_type,
                    Id_Recipe_DishCategory = newRecipe.recp_dish_category,
                    Id_Recipe_FoodType = newRecipe.recp_food_type,
                    Id_Recipe_KitchenType = newRecipe.recp_kitchen_type,
                    RecipeTotalTime = newRecipe.recp_total_time, //TimeSpan.Parse(newRecipe.recp_total_time),
                    RecipeWorkTime = newRecipe.recp_work_time,//TimeSpan(newRecipe.recp_work_time),
                    Id_Recipe_Level = newRecipe.recp_level,
                    PreparationSteps = newRecipe.recp_steps
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewRecipe(r);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the recipe added Successfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the recipe.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion
        */
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