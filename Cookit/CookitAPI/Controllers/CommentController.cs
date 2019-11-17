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

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

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
                   CommentDate = newComment.comment_date,
                   CommentStatus = newComment.comment_status
                };
                int id_comment = CookitDB.DB_Code.CookitQueries.AddNewComment(comment);
                if (id_comment != -1)
                    return Request.CreateResponse(HttpStatusCode.OK, true);
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

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}