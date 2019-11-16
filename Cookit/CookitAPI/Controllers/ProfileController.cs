using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitAPI.DTO;
using CookitDB;

namespace CookitAPI.Controllers
{
    [RoutePrefix("api/Profile")]
    public class ProfileController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
            
         #region GetProfileByUserIdin
        [Route("GetProfileByUserId/{userId}")]
        [HttpGet]
        public HttpResponseMessage GetProfileByUserId(int userId)
        {
            Cookit_DBConnection db = new Cookit_DBConnection();
            TBL_Profile profile = CookitDB.DB_Code.CookitQueries.GetProfileByUserId(userId); 

            if (profile == null) // אם אין משתמש שכזה
                return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
            else
            {
                //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                ProfileDTO result = new ProfileDTO();
                result.id = profile.Id_Prof;
                result.user_id = profile.Id_User;
                result.type = profile.ProfType;
                result.name = profile.Name_Prof;
                result.description = profile.ProfDescription;
                result.id_city = profile.Id_City;
                result.id_region = profile.Id_Region;
                result.status = profile.ProfStatus;

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

        #region Check if Profile Exsist 
        //check if exsist profile match to user id
        [Route("CheckProfileExsistByUserId/{user_id}")]
        [HttpGet]
        public HttpResponseMessage CheckProfileExsistByUserId(int user_id)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection();
                TBL_Profile p = CookitDB.DB_Code.CookitQueries.CheckProfileExsistByUserId(user_id);
                if (p == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
                else
                {
                    ProfileDTO result = new ProfileDTO();
                    result.id = p.Id_Prof;
                    result.user_id = p.Id_User;
                    result.type = p.ProfType;
                    result.name = p.Name_Prof;
                    result.description = p.ProfDescription;
                    result.id_city = p.Id_City;
                    result.id_region = p.Id_Region;
                    result.status = p.ProfStatus;

                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion
             
        #region Add New Profile
        //add new profile
        [Route("AddNewProfile")]
        [HttpPost]
        public HttpResponseMessage AddNewProfile([FromBody]ProfileDTO new_profile)
        {
            try
            {
               
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Profile p = new TBL_Profile(){
                    Id_User = new_profile.user_id,
                    ProfType = new_profile.type,
                    Name_Prof = new_profile.name,
                    ProfDescription = new_profile.description,
                    Id_City = new_profile.id_city,
                    Id_Region = new_profile.id_region,
                    ProfStatus = new_profile.status
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewProfile(p);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, is_saved);
                else
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "the server can't add the profile.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, e.Message);
            }
}
        #endregion
         
        #region Update Profile Info
        [Route("UpdateProfileInfo")]
        [HttpPut]
        public HttpResponseMessage UpdateProfileInfo([FromBody]ProfileDTO profile)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Profile p = new TBL_Profile()
                {
                    Id_Prof = profile.id,
                    Id_User = profile.user_id,
                    ProfType = profile.type,
                    Name_Prof = profile.name,
                    ProfDescription = profile.description,
                    Id_City = profile.id_city,
                    Id_Region = profile.id_region,
                    ProfStatus = profile.status
                };
                var is_saved = CookitDB.DB_Code.CookitQueries.UpdateProfileInfo(p);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the profile information updated seccussfully.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't update profile information.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region GetProfileIDByUserID
        [Route("{user_id}/GetProfileIDByUserID")]
        [HttpGet]
        public HttpResponseMessage GetProfileIDByUserID(int id)
        {
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            Cookit_DBConnection db = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
            int p_id = CookitDB.DB_Code.CookitQueries.GetProfileIDOfUserByID(id);
            if (p_id != -1)
                return Request.CreateResponse(HttpStatusCode.OK, p_id);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, "the server could not find the profile number of user by user id.");
        }
        #endregion

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}