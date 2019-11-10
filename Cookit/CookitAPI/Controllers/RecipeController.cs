using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;
using CookitAPI.DTO;

namespace Cookit.Controllers
{
    [RoutePrefix("api/Recipe")]
    public class RecipeController : ApiController
    {
      
        #region get recipe by user id and recipe name
        [Route("GetRecpByUserIdAndRecpName/{user_id}/{recp_name}")]
        [HttpGet]
        public HttpResponseMessage GetRecpByUserIdAndRecpName(int user_id, string recp_name)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Recipe recipe = CookitDB.DB_Code.CookitQueries.GetRecpByUserIdAndRecpName(user_id, recp_name);
               if(recipe == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this recipe does not exist.");
               else
                {
                    //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                    RecipeDTO result = new RecipeDTO();
                    result.user_id = recipe.Id_Recipe_User;
                    result.recp_id = recipe.Id_Recipe;
                    result.recp_name = recipe.Name_Recipe;
                    result.recp_dish_type = recipe.Id_Recipe_DishType;
                    result.recp_dish_category = recipe.Id_Recipe_DishCategory;
                    result.recp_food_type = recipe.Id_Recipe_FoodType;
                    result.recp_kitchen_type = recipe.Id_Recipe_KitchenType;
                    result.recp_level = recipe.Id_Recipe_Level;
                    result.recp_total_time = recipe.RecipeTotalTime; //TimeSpan.Parse(recipe.RecipeTotalTime);
                    result.recp_work_time = recipe.RecipeWorkTime;// TimeSpan.Parse(recipe.RecipeWorkTime);
                    result.recp_steps = recipe.PreparationSteps;

                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region Add New Recipe
        [Route("AddNewRecipe")]
        [HttpPost]
        public HttpResponseMessage AddNewRecipe([FromBody]RecipeDTO newRecipe)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Recipe r = new TBL_Recipe()
                {
                    Id_Recipe_User = newRecipe.user_id,
                    Name_Recipe = newRecipe.recp_name,
                    Id_Recipe_DishType = newRecipe.recp_dish_type,
                    Id_Recipe_DishCategory = newRecipe.recp_dish_category,
                    Id_Recipe_FoodType = newRecipe.recp_food_type,
                    Id_Recipe_KitchenType = newRecipe.recp_kitchen_type,
                    RecipeTotalTime = newRecipe.recp_total_time, 
                    RecipeWorkTime = newRecipe.recp_work_time,
                    Id_Recipe_Level = newRecipe.recp_level,
                    PreparationSteps = newRecipe.recp_steps
                };
                //מחזיר את תז מתכון שהוסף לDB
                var new_id = CookitDB.DB_Code.CookitQueries.AddNewRecipe(r);
                if (new_id != -1)
                    return Request.CreateResponse(HttpStatusCode.OK, new_id);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the recipe.");

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