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
    [RoutePrefix("api/Favorite")]
    public class FavoriteController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        #region GetFavoriteByUserIdAndRecipeId
        [Route("GetFavoriteByUserIdAndRecipeId/{user_id}/{recipe_id}")]
        [HttpGet]
        public HttpResponseMessage GetFavoriteByUserIdAndRecipeId(int user_id, int recipe_id)
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                TBL_FavoriteRecp favorite = CookitDB.DB_Code.CookitQueries.GetFavoriteByUserIdAndRecipeId(user_id, recipe_id); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

                if (favorite == null) // אם אין משתמש שכזה
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this favorite recipe does not exist.");
                else
                {
                    //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                    FavoriteRecipeDTO result = new FavoriteRecipeDTO();
                    result.id_recipe = favorite.Id_Recp;
                    result.id_user = favorite.Id_User;
                    result.status = favorite.RecpStatus;

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
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_FavoriteRecp favorite = new TBL_FavoriteRecp()
                {
                    Id_Recp = newFavorite.id_recipe,
                    Id_User = newFavorite.id_user,
                    RecpStatus = newFavorite.status
                };
                bool is_saved = CookitDB.DB_Code.CookitQueries.AddNewFavorite(favorite);
                if (is_saved)
                    return Request.CreateResponse(HttpStatusCode.OK, true);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the recipe to the favorite.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion


        #region UpdateFavorite
        [Route("UpdateFavorite")]
        [HttpPut]
        public HttpResponseMessage UpdateFavorite([FromBody]FavoriteRecipeDTO updated_favorite)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_FavoriteRecp fav = new TBL_FavoriteRecp()
                {
                    Id_Recp = updated_favorite.id_recipe,
                    Id_User = updated_favorite.id_user,
                    RecpStatus = updated_favorite.status
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.UpdateFavorite(fav);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the favorite recipe updated seccussfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't update favorite recipe.");
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