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
        #region GetAllActiveProfiles
        [Route("GetAllActiveProfiles")]
        [HttpGet]
        public HttpResponseMessage GetAllActiveProfiles()
        {
            Cookit_DBConnection db = new Cookit_DBConnection();
            List< TBL_Profile > profiles = CookitDB.DB_Code.CookitQueries.GetAllActiveProfiles();
            if (profiles == null) // אם אין משתמש שכזה
                return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
            else
            {
                List<ProfileDTO> result = new List<ProfileDTO>();
                foreach (TBL_Profile item in profiles)
                {
                    result.Add(new ProfileDTO
                    {
                        id = item.Id_Prof,
                        user_id = item.Id_User,
                        type = item.ProfType,
                        name = item.Name_Prof,
                        description = item.ProfDescription,
                        id_city = item.Id_City,
                        id_region = item.Id_Region,
                        status = item.ProfStatus
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);                
            }
        }
        #endregion

        #region GetProfileByProfileId
        [Route("GetProfileByProfileId/{id_profile}")]
        [HttpGet]
        public HttpResponseMessage GetProfileByProfileId(int id_profile)
        {
            Cookit_DBConnection db = new Cookit_DBConnection();
            TBL_Profile profile = CookitDB.DB_Code.CookitQueries.GetProfileByProfileId(id_profile);

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

        #region GetProfileByUserId
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

        #region GetFollowsProfilesByUserId
        [Route("GetFollowsProfilesByUserId/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetFollowsProfilesByUserId(int user_id)
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                //תז הפרופילים הנעקבים עי המשתמש לפי תז משתמש
                List<TBL_Followers> follows_list = CookitDB.DB_Code.CookitQueries.GetProfileFollowByUser(user_id);
                if (follows_list == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, follows_list);
                }
                else
                {
                    //הפרופילים הנעקבים
                    List<ProfileDTO> profiles_list = new List<ProfileDTO>();
                    TBL_Profile profile;//= new TBL_Profile;
                                        //מביא את הפרופיל לפי התז שלו ודוחף לרשימה
                    foreach (TBL_Followers item in follows_list)
                    {
                        profile = CookitDB.DB_Code.CookitQueries.GetProfileByProfileId(item.Id_Prof);
                        profiles_list.Add(new ProfileDTO
                        {
                            id = profile.Id_Prof,
                            user_id = profile.Id_User,
                            type = profile.ProfType,
                            name = profile.Name_Prof,
                            description = profile.ProfDescription,
                            id_city = profile.Id_City,
                            id_region = profile.Id_Region,
                            status = profile.ProfStatus
                        });
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, profiles_list);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, e.Message);
            }
        }
        #endregion

        #region GetProfilesFollowsAfterUserByProfileId
        [Route("GetProfilesFollowsAfterUserByProfileId/{profile_id}")]
        [HttpGet]
        public HttpResponseMessage GetProfilesFollowsAfterUserByProfileId(int profile_id)
            //מביא את הפרופילים העוקבים אחרי פרופיל לפי התז שלו
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                //תז הפרופילים העוקבים אחרי לפי תז משתמש 
                List<TBL_Followers> follows_list = CookitDB.DB_Code.CookitQueries.GetProfilesFollowsAfterUserByProfileId(profile_id);
                if (follows_list == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, follows_list);
                }
                else
                {
                    //הפרופילים העוקבים אחרי
                    //List<ProfileDTO> profiles_list = new List<ProfileDTO>();
                    List<ProfileDTO> profiles_list = new List<ProfileDTO>();
                    TBL_Profile profile;//= new TBL_Profile;
                                        //בודק האם העוקב הוא פרופיל או משתמש. אם פרופיל מוסיף לרשימה
                                        //מביא את הפרופיל לפי התז שלו ודוחף לרשימה
                    foreach (TBL_Followers item in follows_list)
                    {
                        profile = CookitDB.DB_Code.CookitQueries.GetProfileByUserId(item.Id_User);
                        if (profile != null)
                        {
                            profiles_list.Add(new ProfileDTO
                            {
                                id = profile.Id_Prof,
                                user_id = profile.Id_User,
                                type = profile.ProfType,
                                name = profile.Name_Prof,
                                description = profile.ProfDescription,
                                id_city = profile.Id_City,
                                id_region = profile.Id_Region,
                                status = profile.ProfStatus
                            });
                        }
                        else
                            profiles_list.Add(null);

                    }
                    return Request.CreateResponse(HttpStatusCode.OK, profiles_list);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, e.Message);
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
                TBL_Profile p = new TBL_Profile()
                {
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
             
    }
}