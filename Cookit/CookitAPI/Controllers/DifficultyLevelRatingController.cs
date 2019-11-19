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
    [RoutePrefix("api/DifficultyLevelRating")]
    public class DifficultyLevelRatingController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        #region GetDifficultyLevelRating
        [Route("GetDifficultyLevelRating/{user_id}/{recipe_id}")]
        [HttpGet]
        public HttpResponseMessage GetDifficultyLevelRating(int user_id, int recipe_id)
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                TBL_RecpLevelByBU rating = CookitDB.DB_Code.CookitQueries.GetDifficultyLevelRatingByUserIdAndRecipeId(user_id, recipe_id); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.

                if (rating == null) 
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this diff level rating does not exist.");
                else
                {
                    //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                    DifficultyLevelRatingDTO result = new DifficultyLevelRatingDTO();
                    result.recipe_id = rating.Id_Recp;
                    result.user_id = rating.Id_User;
                    result.diff_level_id = rating.Id_Level;
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion        
        
        #region AddNewDiffLevelRating
        [Route("AddNewDiffLevelRating")]
        [HttpPost]
        public HttpResponseMessage AddNewDiffLevelRating([FromBody]DifficultyLevelRatingDTO newRating)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_RecpLevelByBU rating = new TBL_RecpLevelByBU()
                {
                    Id_Recp = newRating.recipe_id,
                    Id_User = newRating.user_id,
                    Id_Level = newRating.diff_level_id
                };
                bool is_saved = CookitDB.DB_Code.CookitQueries.AddNewDiffLevelRating(rating);
                if (is_saved)
                    return Request.CreateResponse(HttpStatusCode.OK, true);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the rating.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region UpdateDiffLevelRating
        [Route("UpdateDiffLevelRating")]
        [HttpPut]
        public HttpResponseMessage UpdateDiffLevelRating([FromBody]DifficultyLevelRatingDTO rating)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_RecpLevelByBU updated_rating = new TBL_RecpLevelByBU()
                {
                    //Id_User = user.id,
                    Id_Recp = rating.recipe_id,
                    Id_User = rating.user_id,
                    Id_Level = rating.diff_level_id
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.UpdateDiffLevelRating(updated_rating);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the difficulty level rating updated seccussfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't update difficulty level rating.");
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