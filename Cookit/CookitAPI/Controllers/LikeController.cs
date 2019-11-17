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
    [RoutePrefix("api/Like")]
    public class LikeController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        #region GetLikeByUserIdAndRecipeId
        [Route("GetLikeByUserIdAndRecipeId/{user_id}/{recipe_id}")]
        [HttpGet]
        public HttpResponseMessage GetLikeByUserIdAndRecipeId(int user_id, int recipe_id)
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                TBL_Likes like = CookitDB.DB_Code.CookitQueries.GetLikeByUserIdAndRecipeId(user_id, recipe_id); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

                if (like == null) // אם אין משתמש שכזה
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this like does not exist.");
                else
                {
                    //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                    LikesDTO result = new LikesDTO();
                    result.id_recipe = like.Id_Recp;
                    result.id_user = like.Id_User;
                    result.status = like.LikeStatus;
                    result.date_like = like.LikeDate;

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
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Likes like = new TBL_Likes()
                {
                   Id_Recp = newLike.id_recipe,
                   Id_User = newLike.id_user,
                   LikeStatus = newLike.status,
                   LikeDate = newLike.date_like
                };
                bool is_saved = CookitDB.DB_Code.CookitQueries.AddNewLike(like);
                if (is_saved)
                    return Request.CreateResponse(HttpStatusCode.OK, true);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the Like.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region UpdateLike
        [Route("UpdateLike")]
        [HttpPut]
        public HttpResponseMessage UpdateLike([FromBody]LikesDTO like)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Likes l = new TBL_Likes()
                {
                    //Id_User = user.id,
                    Id_Recp = like.id_recipe,
                    Id_User = like.id_user,
                    LikeDate = like.date_like,
                    LikeStatus = like.status
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.UpdateLike(l);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the user information updated seccussfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't update user information.");
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