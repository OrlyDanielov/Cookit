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
        #region Get All Recipes
        [Route("GetAllRecipes")]
        [HttpGet]
        public HttpResponseMessage GetAllRecipes()
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_Recipe> list_recipes = CookitDB.DB_Code.CookitQueries.GetAllRecipes();
                if (list_recipes == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "there is no recipes in the server");
                else
                {
                    //המרה של רשימת סןגי משתמשים למבנה נתונים מסוג DTO
                    List<RecipeDTO> result = new List<RecipeDTO>();
                    foreach (TBL_Recipe item in list_recipes)
                    {
                        result.Add(new RecipeDTO
                        {
                            user_id = item.Id_Recipe_User,
                            recp_id = item.Id_Recipe,
                            recp_name = item.Name_Recipe,
                            recp_dish_type = item.Id_Recipe_DishType,
                            recp_dish_category = item.Id_Recipe_DishCategory,
                            recp_food_type = item.Id_Recipe_FoodType,
                            recp_kitchen_type = item.Id_Recipe_KitchenType,
                            recp_level = item.Id_Recipe_Level,
                            recp_total_time = item.RecipeTotalTime,
                            recp_work_time = item.RecipeWorkTime,
                            recp_steps = item.PreparationSteps
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

        #region Update Recipe
        [Route("UpdateRecipe")]
        [HttpPut]
        public HttpResponseMessage UpdateRecipe([FromBody]RecipeDTO recipe)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Recipe r = new TBL_Recipe()
                {
                   Id_Recipe = recipe.recp_id,
                   Id_Recipe_User = recipe.user_id,
                   Name_Recipe = recipe.recp_name,
                   Id_Recipe_DishType = recipe.recp_dish_type,
                   Id_Recipe_DishCategory = recipe.recp_dish_category,
                   Id_Recipe_FoodType = recipe.recp_food_type,
                   Id_Recipe_KitchenType = recipe.recp_kitchen_type,
                   RecipeTotalTime = recipe.recp_total_time,
                   RecipeWorkTime = recipe.recp_work_time,
                   Id_Recipe_Level = recipe.recp_level,
                   PreparationSteps = recipe.recp_steps
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.UpdateRecipe(r);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the recipe information updated seccussfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't update recipe information.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}