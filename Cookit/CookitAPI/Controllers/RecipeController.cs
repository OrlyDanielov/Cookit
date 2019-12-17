using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;
using CookitAPI.DTO;
using System.IO;
using System.Web;

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
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
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
                            recp_steps = item.PreparationSteps,
                            img_name = item.Image_Name,
                            img_path = item.Image_Path
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
   
        #region Get Recommended Recipes
        //מביא את כל המתכונים המומלצים - שקיבלו מעל 10 לייקים
        [Route("GetRecommendedRecipes")]
        [HttpGet]
        public HttpResponseMessage GetRecommendedRecipes()
        {
            try
            {
                const int MINIMUM_LIKE_FOR_RECIPE = 10;
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_Recipe> recipe_list = CookitDB.DB_Code.CookitQueries.GetAllRecipes();
                if (recipe_list == null )
                    return Request.CreateResponse(HttpStatusCode.OK, recipe_list);
                else
                {
                    int like_count;
                    //המרה של רשימת סןגי משתמשים למבנה נתונים מסוג DTO
                    List<RecipeDTO> result = new List<RecipeDTO>();
                    foreach (TBL_Recipe item in recipe_list)
                    {
                        like_count = CookitDB.DB_Code.CookitQueries.GetCountLikeOfRecipe(item.Id_Recipe);//מביא את מספר הלייקים של מתכון
                        if(like_count >= MINIMUM_LIKE_FOR_RECIPE)
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
                            recp_steps = item.PreparationSteps,
                            img_name = item.Image_Name,
                            img_path = item.Image_Path
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
       
        #region Get Recipes Of Follow Profiles
        [Route("GetRecipesOfFollowProfiles/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetRecipesOfFollowProfiles(int user_id)
        {
            try
            {
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                //מביא רשימת המעקבים שלי
                List<TBL_Followers> user_follow_list = CookitDB.DB_Code.CookitQueries.GetProfileFollowByUser(user_id);
                //רשימת הפרופילים הנעקבים
                List<TBL_Profile> profile_follow_list = new List<TBL_Profile>();
                //רשימת המתכונים של הפרופילים
                List<RecipeDTO> profile_recipe_list = new List<RecipeDTO>();
                //עובר על רשימת מעקב ומביא את הפרופיל התואם
                if (user_follow_list.Count >0)
                {
                    int profile_id;
                    TBL_Profile profile;
                    foreach (TBL_Followers follow in user_follow_list)
                    {
                        profile_id = follow.Id_Prof;
                        profile = CookitDB.DB_Code.CookitQueries.GetProfileByProfileId(profile_id); // מביא את הפרופיל התואם
                        if (profile != null)
                        {
                            //מביא את המתכונים של הפרופיל הנוכחי
                            List<TBL_Recipe> profile_recipes = CookitDB.DB_Code.CookitQueries.GetRecipesByUserId(profile.Id_User);//מביא את המתכונים של הפרופיל
                            if(profile_recipes.Count > 0)
                            {
                                foreach(TBL_Recipe r in profile_recipes)
                                {
                                    profile_recipe_list.Add(new RecipeDTO
                                    {
                                        user_id = r.Id_Recipe_User,
                                        recp_id = r.Id_Recipe,
                                        recp_name = r.Name_Recipe,
                                        recp_dish_type = r.Id_Recipe_DishType,
                                        recp_dish_category = r.Id_Recipe_DishCategory,
                                        recp_food_type = r.Id_Recipe_FoodType,
                                        recp_kitchen_type = r.Id_Recipe_KitchenType,
                                        recp_level = r.Id_Recipe_Level,
                                        recp_total_time = r.RecipeTotalTime,
                                        recp_work_time = r.RecipeWorkTime,
                                        recp_steps = r.PreparationSteps,
                                        img_name = r.Image_Name,
                                        img_path = r.Image_Path
                                    });
                                }
                            }

                        }
                    }
                }
                    //מחזיר רשימת מתכונים 
                    return Request.CreateResponse(HttpStatusCode.OK, profile_recipe_list); 
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region Get_FU_Recipes
        [Route("Get_FU_Recipes")]
        [HttpGet]
        public HttpResponseMessage Get_FU_Recipes()
        {
            try
            {
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection();
                //מביא את כל המתכונים
                List<TBL_Recipe> list_recipes = CookitDB.DB_Code.CookitQueries.GetAllRecipes();
                //מביא את כל המשתמשים שהם מסוג אנין טעם
                List<TBL_User> FU_list = CookitDB.DB_Code.CookitQueries.GetFU();
                if (FU_list != null && list_recipes != null)
                {
                    //המתכונים שהם של משתמשים מסוג  ואנין טעם
                    List<TBL_Recipe> fu_recipes = new List<TBL_Recipe>();
                    foreach (TBL_User user in FU_list)
                    {
                        var user_id = user.Id_User;
                        foreach (TBL_Recipe recipe in list_recipes)
                        {
                            if (user_id == recipe.Id_Recipe_User)
                                fu_recipes.Add(recipe);
                        }
                    }
                    List<RecipeDTO> result = new List<RecipeDTO>();
                    foreach (TBL_Recipe item in fu_recipes)
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
                            recp_steps = item.PreparationSteps,
                            img_name = item.Image_Name,
                            img_path = item.Image_Path
                    });
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this recipe does not exist.");
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
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
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
                    result.img_name = recipe.Image_Name;
                    result.img_path = recipe.Image_Path;

                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region Get Recipes By User Id
        [Route("GetRecipesByUserId/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetRecipesByUserId(int user_id)
        {
            try
            {
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_Recipe> recipes = CookitDB.DB_Code.CookitQueries.GetRecipesByUserId(user_id);
                if (recipes == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this recipe does not exist.");
                else
                {
                    List<RecipeDTO> result = new List<RecipeDTO>();
                    foreach (TBL_Recipe item in recipes)
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
                            recp_steps = item.PreparationSteps,
                            img_name = item.Image_Name,
                            img_path = item.Image_Path
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

        #region get recipe by recipe id
        [Route("GetRecpByUserIdRecipe/{recipe_id}")]
        [HttpGet]
        public HttpResponseMessage GetRecpByUserIdRecipe(int recipe_id)
        {
            try
            {
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection(); 
                TBL_Recipe recipe = CookitDB.DB_Code.CookitQueries.GetRecpByUserIdRecipe(recipe_id);
                if (recipe == null)
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
                    result.img_name = recipe.Image_Name;
                    result.img_path = recipe.Image_Path;

                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        # region GetFavoriteUserRecipes
        //מיא את המתכונים שהמשתמש לא העלאה וגם שמר כמועדפים
        [Route("GetFavoriteUserRecipes/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetFavoriteUserRecipes(int user_id)
        {
            try
            {
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection();
                //המתכונים שנשמרו במועדפים אצל המשתמש
                List<TBL_FavoriteRecp> favorite_recp_list = CookitDB.DB_Code.CookitQueries.GetFavoriteByUserId(user_id);
                //המתכונים שמשתמש לא העלאה
                List<TBL_Recipe> recipe_list = CookitDB.DB_Code.CookitQueries.GetAllRecipesExpectOfUserId(user_id);
                if (favorite_recp_list != null && recipe_list != null)
                {
                    //המתכונים המועדפים שהמשתמש לא העלאה
                    List<TBL_Recipe> not_user_recipes = new List<TBL_Recipe>();
                    foreach(TBL_FavoriteRecp  favorite in favorite_recp_list)
                    {
                        var recipe_id = favorite.Id_Recp;
                        foreach(TBL_Recipe recipe in recipe_list)
                        {
                            if (recipe_id == recipe.Id_Recipe)
                                not_user_recipes.Add(recipe);
                        }
                    }
                    List<RecipeDTO> result = new List<RecipeDTO>();
                    foreach (TBL_Recipe item in not_user_recipes)
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
                            recp_steps = item.PreparationSteps,
                            img_name = item.Image_Name,
                            img_path = item.Image_Path
                        });
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this recipe does not exist.");
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
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
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
                    PreparationSteps = newRecipe.recp_steps,
                    Image_Path = newRecipe.img_path,
                    Image_Name = newRecipe.img_name
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

        #region AddRecipeImage
        //AddRecipeImage
        [Route("AddRecipeImage")]
        [HttpPut]
        public void AddRecipeImage()
        {
            HttpPostedFile file = HttpContext.Current.Request.Files["file"];//מביא את הקובץ
            string ext = Path.GetExtension(file.FileName); // מביא את סיומת הקובץ
            int recipe_id = int.Parse(HttpContext.Current.Request.Params["id"]); //מביא את התז פרופיל

            string pull_path = "/Images/Recipes/" + recipe_id.ToString() + ext;//"~/Images/Recipes/" + recipe_id.ToString() + ext;
            string img_name = recipe_id.ToString();

            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
            //עדכון פרטי תמונה אצל מתכון
            bool is_updated = CookitDB.DB_Code.CookitQueries.UpdateRecipeImage(recipe_id, img_name, pull_path);
            if (is_updated) //כאשר מוצאים את הפרופיל המתאים
            {
                //שמירת התמונה בתקייה של הפרויקט
                //file.SaveAs(HttpContext.Current.Server.MapPath("~") + "/Images/Recipes/" + recipe_id + ext);
                file.SaveAs(HttpContext.Current.Server.MapPath("/Images/Recipes/") + recipe_id + ext);

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
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
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
                   PreparationSteps = recipe.recp_steps,
                    Image_Path = recipe.img_path,
                    Image_Name = recipe.img_name

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

       
    }
}