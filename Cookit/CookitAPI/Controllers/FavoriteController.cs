using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitAPI;
using CookitAPI.DB_Code;
//using CookitDB;
using CookitAPI.DTO;

namespace CookitAPI.Controllers
{
    [RoutePrefix("api/Favorite")]
    public class FavoriteController : ApiController
    {
        #region GetFavoriteByUserId
        [Route("GetFavoriteByUserId/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetFavoriteByUserId(int user_id)
        {
            try
            {
              
                var list_favorite = CookitQueries.GetFavoriteByUserId(user_id);
                if (list_favorite == null) // אם אין משתמש שכזהd
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this like does not exist.");
                else
                {
                    List<FavoriteRecipeDTO> result = new List<FavoriteRecipeDTO>();
                    foreach (TBL_FavoriteRecp item in list_favorite)
                    {
                        result.Add(new FavoriteRecipeDTO
                        {
                            id = item.Id,
                            id_recipe = item.Id_Recp,
                            id_user = item.Id_User
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

        #region GetFavoriteByUserIdAndRecipeId
        [Route("GetFavoriteByUserIdAndRecipeId/{user_id}/{recipe_id}")]
        [HttpGet]
        public HttpResponseMessage GetFavoriteByUserIdAndRecipeId(int user_id, int recipe_id)
        {
            try
            {
                
                TBL_FavoriteRecp favorite = CookitQueries.GetFavoriteByUserIdAndRecipeId(user_id, recipe_id); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

                if (favorite == null) // אם אין משתמש שכזה
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this favorite recipe does not exist.");
                else
                {
                    //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                    FavoriteRecipeDTO result = new FavoriteRecipeDTO();
                    result.id = favorite.Id;
                    result.id_recipe = favorite.Id_Recp;
                    result.id_user = favorite.Id_User;

                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion       

        #region AddNewFavorite
        [Route("AddNewFavorite")]
        [HttpPost]
        public HttpResponseMessage AddNewFavorite([FromBody]FavoriteRecipeDTO newFavorite)
        {
            try
            {
               
                TBL_FavoriteRecp favorite = new TBL_FavoriteRecp()
                {
                    Id = newFavorite.id,
                    Id_Recp = newFavorite.id_recipe,
                    Id_User = newFavorite.id_user
                };
                bool is_saved = CookitQueries.AddNewFavorite(favorite);
                if (is_saved)
                    return Request.CreateResponse(HttpStatusCode.OK, newFavorite);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the recipe to the favorite.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region DeleteFavorite
        [Route("DeleteFavorite")]
        [HttpDelete]
        public HttpResponseMessage DeleteFavorite([FromBody]FavoriteRecipeDTO delete_favorite)
        {
            try
            {
                
                TBL_FavoriteRecp _favorite = new TBL_FavoriteRecp()
                {
                    Id = delete_favorite.id,
                    Id_Recp = delete_favorite.id_recipe,
                    Id_User = delete_favorite.id_user
                };
                var is_saved = CookitQueries.DeleteFavorite(_favorite);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, delete_favorite);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't delete the like.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

    }
}