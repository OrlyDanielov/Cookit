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
    [RoutePrefix("api/Comment")]
    public class CommentController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        #region GetAGetCommentsByRecipeIdllCities
        //מחזיר את כל הערים מבסיס הנתונים
        [Route("GetCommentsByRecipeId/{recipe_id}")]
        [HttpGet]
        public HttpResponseMessage GetCommentsByRecipeId(int recipe_id)
        {
            bgroup36_prodConnection db = new bgroup36_prodConnection();
            List<TBL_Comments> comments = CookitDB.DB_Code.CookitQueries.GetCommentsByRecipeId(recipe_id);
            if (comments == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no comments to this recipe in DB.");
            else
            {
                //המרה של רשימת הערים למבנה נתונים מסוג DTO
                List<CommentsDTO> result = new List<CommentsDTO>();
                foreach (TBL_Comments item in comments)
                {

                    result.Add(new CommentsDTO
                    {
                        //id_city = item.Id_City,
                        id = item.Id_Comment,
                        recipe_id = item.Id_Recp,
                        user_id = item.Id_User,
                        comment = item.Comment,
                        comment_date = item.CommentDate//,
                        //comment_status = item.CommentStatus
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

        #region AddNewComment
        [Route("AddNewComment")]
        [HttpPost]
        public HttpResponseMessage AddNewComment([FromBody]CommentsDTO newComment)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Comments comment = new TBL_Comments()
                {
                   Id_Recp = newComment.recipe_id,
                   Id_User = newComment.user_id,
                   Comment = newComment.comment,
                   CommentDate = newComment.comment_date//,
                   //CommentStatus = newComment.comment_status
                };
                int id_comment = CookitDB.DB_Code.CookitQueries.AddNewComment(comment);
                if (id_comment != -1)
                    return Request.CreateResponse(HttpStatusCode.OK, id_comment);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the comment.");

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

        #region RemoveCommentById
        [Route("RemoveCommentById/{id}")]
        [HttpDelete]
        public HttpResponseMessage RemoveCommentById(int id)//([FromBody]List<FoodLable2RecipeDTO> deletelbl2Recp)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
               
                bool is_saved = CookitDB.DB_Code.CookitQueries.RemoveCommentById(id);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the comments deleted Successfully from the recipe.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't delete the comments.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion
    }
}