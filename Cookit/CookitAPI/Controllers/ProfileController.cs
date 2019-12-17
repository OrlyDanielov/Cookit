using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitAPI.DTO;
using CookitDB;
using System.IO;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace CookitAPI.Controllers
{
    [System.Web.Http.RoutePrefix("api/Profile")]
    public class ProfileController : ApiController
    {
        #region GetAllActiveProfiles
        [Route("GetAllActiveProfiles")]
        [HttpGet]
        public HttpResponseMessage GetAllActiveProfiles()
        {
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
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
                        name = item.Name_Prof,
                        description = item.ProfDescription,
                        id_city = item.Id_City,
                        id_region = item.Id_Region,
                        status = item.ProfStatus,
                        img_path = item.Image_Path,
                        img_name = item.Image_Name
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);                
            }
        }
        #endregion

        #region Get Recommended Profiles
        //מביא את הפרופילים המומלצים - שקיבלנו מעל 2 עוקבים
        [Route("GetRecommendedProfiles")]
        [HttpGet]
        public HttpResponseMessage GetRecommendedProfiles()
        {
            try
            {
                const int MINIMUM_FOLLOW_FOR_PROFILE = 10;
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_Profile> profile_list = CookitDB.DB_Code.CookitQueries.GetAllActiveProfiles();
                if (profile_list == null)
                    return Request.CreateResponse(HttpStatusCode.OK, profile_list);
                else
                {
                    int follow_count;
                    //המרה של רשימת סןגי משתמשים למבנה נתונים מסוג DTO
                    List<ProfileDTO> result = new List<ProfileDTO>();
                    foreach (TBL_Profile item in profile_list)
                    {
                        follow_count = CookitDB.DB_Code.CookitQueries.GetProfileFollowByProfileId(item.Id_Prof).Count;//מביא את מספר הלייקים של מתכון
                        if (follow_count >= MINIMUM_FOLLOW_FOR_PROFILE)
                            result.Add(new ProfileDTO
                            {
                                id = item.Id_Prof,
                                user_id = item.Id_User,
                                name = item.Name_Prof,
                                description = item.ProfDescription,
                                id_city = item.Id_City,
                                id_region = item.Id_Region,
                                status = item.ProfStatus,
                                img_path = item.Image_Path,
                                img_name = item.Image_Name
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

        #region GetProfileByProfileId
        [Route("GetProfileByProfileId/{id_profile}")]
        [HttpGet]
        public HttpResponseMessage GetProfileByProfileId(int id_profile)
        {
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
            TBL_Profile profile = CookitDB.DB_Code.CookitQueries.GetProfileByProfileId(id_profile);

            if (profile == null) // אם אין משתמש שכזה
                return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
            else
            {
                //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                ProfileDTO result = new ProfileDTO();
                result.id = profile.Id_Prof;
                result.user_id = profile.Id_User;
                result.name = profile.Name_Prof;
                result.description = profile.ProfDescription;
                result.id_city = profile.Id_City;
                result.id_region = profile.Id_Region;
                result.status = profile.ProfStatus;
                result.img_path = profile.Image_Path;
                result.img_name = profile.Image_Name;

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

        #region GetProfileByUserId
        [Route("GetProfileByUserId/{userId}")]
        [HttpGet]
        public HttpResponseMessage GetProfileByUserId(int userId)
        {
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
            TBL_Profile profile = CookitDB.DB_Code.CookitQueries.GetProfileByUserId(userId); 

            if (profile == null) // אם אין משתמש שכזה
                return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
            else
            {
                //המרה של רשימת נתוני משתמש למבנה נתונים מסוג DTO
                ProfileDTO result = new ProfileDTO();
                result.id = profile.Id_Prof;
                result.user_id = profile.Id_User;
                result.name = profile.Name_Prof;
                result.description = profile.ProfDescription;
                result.id_city = profile.Id_City;
                result.id_region = profile.Id_Region;
                result.status = profile.ProfStatus;
                result.img_path = profile.Image_Path;
                result.img_name = profile.Image_Name;

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        #endregion

        #region GetFollowsProfilesByUserId
        //פרופילים נעקבים
        [Route("GetFollowsProfilesByUserId/{user_id}")]
        [HttpGet]
        public HttpResponseMessage GetFollowsProfilesByUserId(int user_id)
        {
            try
            {
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
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
                        //מביא רק את הפרופילים הפעילים
                        if (profile.ProfStatus == true)
                        {
                            profiles_list.Add(new ProfileDTO
                            {
                                id = profile.Id_Prof,
                                user_id = profile.Id_User,
                                name = profile.Name_Prof,
                                description = profile.ProfDescription,
                                id_city = profile.Id_City,
                                id_region = profile.Id_Region,
                                status = profile.ProfStatus,
                                img_path = profile.Image_Path,
                                img_name = profile.Image_Name
                            });
                        }
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
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //תז הפרופילים העוקבים אחרי לפי תז משתמש 
                List<TBL_Followers> follows_list = CookitDB.DB_Code.CookitQueries.GetProfilesFollowsAfterUserByProfileId(profile_id);
                if (follows_list == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, follows_list);
                }
                else
                {
                    //הפרופילים העוקבים אחרי
                    List<ProfileDTO> profiles_list = new List<ProfileDTO>();
                    TBL_Profile profile;//= new TBL_Profile;
                                        //בודק האם העוקב הוא פרופיל או משתמש. אם פרופיל מוסיף לרשימה
                                        //מביא את הפרופיל לפי התז שלו ודוחף לרשימה
                    foreach (TBL_Followers item in follows_list)
                    {
                        profile = CookitDB.DB_Code.CookitQueries.GetProfileByUserId(item.Id_User);
                        if (profile != null)
                        {
                            //תציג רק פרופילים פעילים
                            if (profile.ProfStatus == true)
                            {
                                profiles_list.Add(new ProfileDTO
                                {
                                    id = profile.Id_Prof,
                                    user_id = profile.Id_User,
                                    name = profile.Name_Prof,
                                    description = profile.ProfDescription,
                                    id_city = profile.Id_City,
                                    id_region = profile.Id_Region,
                                    status = profile.ProfStatus,
                                    img_path = profile.Image_Path,
                                    img_name = profile.Image_Name
                                });
                            }
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
                //Cookit_DBConnection DB = new Cookit_DBConnection();
                TBL_Profile p = CookitDB.DB_Code.CookitQueries.CheckProfileExsistByUserId(user_id);
                if (p == null)
                    return Request.CreateResponse(HttpStatusCode.OK, p);
                //return Request.CreateResponse(HttpStatusCode.NotFound, "this profile does not exist.");
                else
                {
                    ProfileDTO result = new ProfileDTO();
                    result.id = p.Id_Prof;
                    result.user_id = p.Id_User;
                    result.name = p.Name_Prof;
                    result.description = p.ProfDescription;
                    result.id_city = p.Id_City;
                    result.id_region = p.Id_Region;
                    result.status = p.ProfStatus;
                    result.img_path = p.Image_Path;
                    result.img_name = p.Image_Name;

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
        public HttpResponseMessage AddNewProfile([FromBody]ProfileDTO new_profile)//, HttpPostedFileBase postedFile)
        {
            try
            {   
                //שמירת הפרופיל בשרת
                //Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                TBL_Profile p = new TBL_Profile()
                {
                    Id_User = new_profile.user_id,
                    Name_Prof = new_profile.name,
                    ProfDescription = new_profile.description,
                    Id_City = new_profile.id_city,
                    Id_Region = new_profile.id_region,
                    ProfStatus = new_profile.status,
                    Image_Path = new_profile.img_path,
                    Image_Name = new_profile.img_name
                };
                int id_profile = CookitDB.DB_Code.CookitQueries.AddNewProfile(p);
                if (id_profile > -1)
                {
                    new_profile.id = id_profile;
                    return Request.CreateResponse(HttpStatusCode.OK, new_profile);

                }
                else
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "the server can't add the profile.");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, e.Message);
            }
        }
        #endregion

        #region AddProfileImage
        //AddProfileImage
        [Route("AddProfileImage")]
        [HttpPut]
        public void AddProfileImage()
        {
            HttpPostedFile file = HttpContext.Current.Request.Files["file"];//מביא את הקובץ
            string ext = Path.GetExtension(file.FileName); // מביא את סיומת הקובץ
            int profile_id = int.Parse(HttpContext.Current.Request.Params["id"]); //מביא את התז פרופיל

            //string pull_path = "~/Images/Profiles/" + profile_id.ToString() + ext;
            string pull_path = "/Images/Profiles/" + profile_id.ToString() + ext;
            string img_name = profile_id.ToString();

            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            //Cookit_DBConnection db = new Cookit_DBConnection();
            //עדכון פרטי תמונה אצל הפרופיל
            bool is_updated = CookitDB.DB_Code.CookitQueries.UpdateProfileImage(profile_id, img_name, pull_path);
            if (is_updated) //כאשר מוצאים את הפרופיל המתאים
            {
                //שמירת התמונה בתקייה של הפרויקט
                //file.SaveAs(HttpContext.Current.Server.MapPath("~") + "/Images/Profiles/" + profile_id + ext);
                file.SaveAs(HttpContext.Current.Server.MapPath("/Images/Profiles/") + profile_id + ext);
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
                    Name_Prof = profile.name,
                    ProfDescription = profile.description,
                    Id_City = profile.id_city,
                    Id_Region = profile.id_region,
                    ProfStatus = profile.status,
                    Image_Path = profile.img_path,
                    Image_Name = profile.img_name
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
            //Cookit_DBConnection db = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
            int p_id = CookitDB.DB_Code.CookitQueries.GetProfileIDOfUserByID(id);
            if (p_id != -1)
                return Request.CreateResponse(HttpStatusCode.OK, p_id);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, "the server could not find the profile number of user by user id.");
        }
        #endregion
             
    }
}