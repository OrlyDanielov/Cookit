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
    [RoutePrefix("api/Followers")]
    public class FollowersController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        #region GetProfileFollowByUser
        [Route("GetProfileFollowByUser/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetPrGetProfileFollowByUserofileByUserId(int user_id)
        {
            Cookit_DBConnection db = new Cookit_DBConnection();
            var follow_profiles = CookitDB.DB_Code.CookitQueries.GetProfileFollowByUser(user_id);

            if (follow_profiles == null) // אם אין משתמש שכזה
                return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
            else
            {
                List<FollowersDTO> result = new List<FollowersDTO>();
                foreach (TBL_Followers item in follow_profiles)
                {
                    result.Add(new FollowersDTO
                    {
                        user_id = item.Id_User,
                        profile_id = item.Id_Prof,
                        status = item.StatusFollower
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

        #region Add New Follow
        [Route("AddNewFollow")]
        [HttpPost]
        public HttpResponseMessage AddNewFollow([FromBody]FollowersDTO new_follow)
        {
            try
            {

                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Followers follow = new TBL_Followers()
                {
                   Id_User=new_follow.user_id,
                   Id_Prof = new_follow.profile_id,
                   StatusFollower = new_follow.status
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewFollow(follow);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, new_follow.profile_id);
                else
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "the server can't add the profile.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, e.Message);
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