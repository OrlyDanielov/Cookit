using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
//using CookitDB;
using CookitAPI;
using CookitAPI.DB_Code;
using CookitAPI.DTO;

namespace CookitAPI.Controllers
{
    [RoutePrefix("api/Like")]
    public class LikeController : ApiController
    {        
        #region GetLikeByUserId
        [Route("GetLikeByUserId/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetLikeByUserId(int user_id)
        {
            try
            {
                var list_like = CookitQueries.GetLikeByUserId(user_id); 
                if (list_like == null) // אם אין משתמש שכזהd
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this like does not exist.");
                else
                {
                    List<LikesDTO> result = new List<LikesDTO>();
                    foreach (TBL_Likes item in list_like)
                    {
                        result.Add(new LikesDTO {
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

        #region GetCountLikeOfRecipe
        [Route("GetCountLikeOfRecipe/{recipe_id}")]
        [HttpGet]
        public HttpResponseMessage GetCountLikeOfRecipe(int recipe_id)
        {
            try
            {
                int count_like = CookitQueries.GetCountLikeOfRecipe(recipe_id);
                if (count_like > -1 )
                    return Request.CreateResponse(HttpStatusCode.OK, count_like);
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this like does not exist.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion   

        #region GetLikeByUserIdAndRecipeId
        [Route("GetLikeByUserIdAndRecipeId/{user_id}/{recipe_id}")]
        [HttpGet]
        public HttpResponseMessage GetLikeByUserIdAndRecipeId(int user_id, int recipe_id)
        {
            try
            {
                TBL_Likes like = CookitQueries.GetLikeByUserIdAndRecipeId(user_id, recipe_id); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

                if (like == null) // אם אין משתמש שכזה
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this like does not exist.");
                else
                {
                    //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                    LikesDTO result = new LikesDTO();
                    result.id = like.Id;
                    result.id_recipe = like.Id_Recp;
                    result.id_user = like.Id_User;

                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion        

        #region AddNewLike
        [Route("AddNewLike")]
        [HttpPost]
        public HttpResponseMessage AddNewLike([FromBody]LikesDTO newLike)
        {
            try
            {
                TBL_Likes like = new TBL_Likes()
                {
                    Id = newLike.id,
                    Id_Recp = newLike.id_recipe,
                   Id_User = newLike.id_user                  
                };
                bool is_saved = CookitQueries.AddNewLike(like);
                if (is_saved)
                    return Request.CreateResponse(HttpStatusCode.OK, newLike);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the Like.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region DeleteLike
        [Route("DeleteLike")]
        [HttpDelete]
        public HttpResponseMessage DeleteLike([FromBody]LikesDTO delete_like)
        {
            try
            {
                TBL_Likes _like = new TBL_Likes()
                {
                    Id = delete_like.id,
                    Id_Recp = delete_like.id_recipe,
                    Id_User = delete_like.id_user
                }; 
                var is_saved = CookitQueries.DeleteLike(_like);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, delete_like);
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