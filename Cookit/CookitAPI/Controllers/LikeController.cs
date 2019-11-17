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

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

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