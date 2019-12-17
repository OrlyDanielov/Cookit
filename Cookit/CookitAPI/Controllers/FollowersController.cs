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
            var follow_profiles = CookitQueries.GetProfileFollowByUser(user_id);

            if (follow_profiles == null) // אם אין משתמש שכזה
                return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
            else
            {
                List<FollowersDTO> result = new List<FollowersDTO>();
                foreach (TBL_Followers item in follow_profiles)
                {
                    result.Add(new FollowersDTO
                    {
                        id = item.Id,
                        user_id = item.Id_User,
                        profile_id = item.Id_Prof
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

        #region GetProfileFollowByProfileId
        //מביא את העוקבים של פרופיל
        [Route("GetProfileFollowByProfileId/{profile_id}")]
        [HttpGet]
        public HttpResponseMessage GetProfileFollowByProfileId(int profile_id)
        {
            var user_follows = CookitQueries.GetProfileFollowByProfileId(profile_id);
            if (user_follows == null) 
                return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
            else
            {
                List<FollowersDTO> result = new List<FollowersDTO>();
                foreach (TBL_Followers item in user_follows)
                {
                    result.Add(new FollowersDTO
                    {
                        id = item.Id,
                        user_id = item.Id_User,
                        profile_id = item.Id_Prof
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

                TBL_Followers follow = new TBL_Followers()
                {
                    Id = new_follow.id,
                    Id_User = new_follow.user_id,
                   Id_Prof = new_follow.profile_id
                };
                var is_saved = CookitQueries.AddNewFollow(follow);
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

        #region RemoveFollow
        [Route("RemoveFollow")]
        [HttpDelete]
        public HttpResponseMessage RemoveFollow([FromBody]FollowersDTO follow2remove)
        {
            try
            {
                TBL_Followers follow = new TBL_Followers()
                {
                    Id = follow2remove.id,
                    Id_User = follow2remove.user_id,
                    Id_Prof = follow2remove.profile_id
                };
                var is_saved = CookitQueries.RemoveFollow(follow);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, follow2remove.profile_id);
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't delete the ingridiant.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion
    }
}