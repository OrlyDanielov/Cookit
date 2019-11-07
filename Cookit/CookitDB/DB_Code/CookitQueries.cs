﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookitDB.DB_Code
{
    public class CookitQueries
    {

        #region Get_DB
        public static Cookit_DBConnection Get_DB()
        {          
            Cookit_DBConnection db = new Cookit_DBConnection();
            //bgroup36_prodConnection db = new bgroup36_prodConnection();
            return db;

        }
        #endregion

        //שליפת נתונים סטטים 

        #region Get All User Type
        // הפוקנציה מביאה מהמסד את כל סוגי המשתמשים
        public static List<TBL_UserType> Get_all_User_Type()
        {
            try
            {
                var db = Get_DB();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_UserType.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get All City
        // הפוקנציה מביאה מהמסד את כל הערים
        public static List<TBL_City> Get_all_cities()
        {
            try
            {
                var db = Get_DB();
<<<<<<< HEAD
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_City.ToList();
=======
                return db.TBL_UserType.ToList();
>>>>>>> orly
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get All City_Regions
        // הפוקנציה מביאה מחוזות
        public static List<TBL_City> Get_all_Regions()
        {
            try
            {
                var db = Get_DB();
<<<<<<< HEAD
                // Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_City.GroupBy(o => new { o.Region }).Select(o => o.FirstOrDefault()).ToList(); //returns distinct regions
=======
                return db.TBL_City.ToList();
>>>>>>> orly
            }

            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all dish type
        // הפוקנציה מביאה מהמסד את כל סוגי המנות
        public static List<TBL_DishType> Get_all_DishType()
        {
            try
            {
                var db = Get_DB();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_DishType.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all DishCategory
        // הפוקנציה מביאה מהמסד את כל קטגוריות המנות
        public static List<TBL_DishCategory> Get_all_DishCategory()
        {
            try
            {
                var db = Get_DB();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_DishCategory.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all FoodType
        // הפוקנציה מביאה מהמסד את כל סוגי האוכל
        public static List<TBL_FoodType> Get_all_FoodType()
        {
            try
            {
                var db = Get_DB();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_FoodType.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region  Get all KitchenType
        // הפוקנציה מביאה מהמסד את כל סוגי מטבחים
        public static List<TBL_KitchenType> Get_all_KitchenType()
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_KitchenType.ToList();
            }
            catch (Exception e)
            {
                return null;

            }
        }
        #endregion

        #region Get all DifficultyLevel
        // הפוקנציה מביאה מהמסד את כל דרגות הקושי למתכון
        public static List<TBL_RecipeDifficultyLevel> Get_all_DifficultyLevel()
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_RecipeDifficultyLevel.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all Ingridiants
        // הפוקנציה מביאה מהמסד את כל המצרכים למתכון
        public static List<TBL_Ingridiants> Get_all_Ingridiants()
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_Ingridiants.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get all Mesurments
        // הפוקנציה מביאה מהמסד את כל אופני המדידה למתכון
        public static List<TBL_Mesurments> Get_all_Mesurments()
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_Mesurments.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

<<<<<<< HEAD
        //הוספת אובייקטים חדשים
=======
        #region Get All Holidays
        // הפוקנציה מביאה מהמסד את כל אופני המדידה למתכון
        public static List<TBL_Holiday> Get_all_Holidays()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_Holiday.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get All fOOD Lable
        // הפוקנציה מביאה מהמסד את כל אופני המדידה למתכון
        public static List<TBL_FoodLabel> Get_all_FoodLable()
        {
            try
            {
                var db = Get_DB();
                return db.TBL_FoodLabel.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion
>>>>>>> orly

        #region Add New Recipe
        //פונקציה של הוספת מתכון חדש לטבלת המתכונים
        //public static bool AddNewRecipe(TBL_Recipe new_recipe)
        public static int AddNewRecipe(TBL_Recipe new_recipe)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_recipe).State = System.Data.Entity.EntityState.Added; // הוספת רשומת מתכון חדש לטבלת המתכונים
                db.SaveChanges();
                //להחזיר את התז של המתכון שהוסף
                return new_recipe.Id_Recipe;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        #endregion

        #region Add New User
        //פונקציה של הוספת משתמש חדש לטבלת המשתמשים
        public static bool AddNewUser(TBL_User new_user)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_user).State = System.Data.Entity.EntityState.Added; // הוספת משתמש חדש
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region Add New Profile
        //פונקציה של הוספת פרופיל חדש לטבלת הפרופילים
        public static bool AddNewProfile(TBL_Profile new_profile)
        {
            try
            {
                var db = Get_DB();
                db.Entry(new_profile).State = System.Data.Entity.EntityState.Added; // הוספת פרופיל חדש
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region Add New Event
        //פונקציה של הוספת אירוע חדש לטבלת האירועים
        public static bool AddNewEvent(TBL_Event new_event)
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                db.Entry(new_event).State = System.Data.Entity.EntityState.Added; // הוספת אירוע חדש
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region Add New Workshop
        //פונקציה של הוספת סדנא חדשה לטבלת הסדנאות
        public static bool AddNewWorkshop(TBL_Workshop new_workshop)
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                db.Entry(new_workshop).State = System.Data.Entity.EntityState.Added; // הוספת סדנא חדשה
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

<<<<<<< HEAD
        //עדכוני אובייקטים קיימים

        #region Update User Info
        public static bool UpdateUserInfo(TBL_User newUser)
        {
            try
            {
                var db = Get_DB();
                TBL_User u = db.TBL_User.SingleOrDefault(x => x.Id_User == newUser.Id_User);
                if (u != null)
                {
                    u.FirstName = newUser.FirstName;
                    u.LastName = newUser.LastName;
                    u.Gender = newUser.Gender;
                    u.Email = newUser.Email;
                    u.Id_Type = newUser.Id_Type;
                    //u.UserStatus = newUser.UserStatus;
                    //u.NumDrawRecp = newUser.NumDrawRecp;

                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region Update Profile Info
        public static bool UpdateProfileInfo(TBL_Profile newProfile)
=======
        #region Add New Food Lables 2 Recipe
        //פונקציה של הוספת תוויות למתכון
        public static bool AddNewFoodLables2Recipe(List<TBL_LabelsForRecp> new_foodlbl2rcp)
    {
        try
        {
            var db = Get_DB();
            //לעבור על כל הרשימה
            foreach (TBL_LabelsForRecp i in new_foodlbl2rcp)
            {
                db.Entry(i).State = System.Data.Entity.EntityState.Added;
            }
            db.SaveChanges();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

        #endregion

        #region Add Holidays 2 Recipe
        //פונקציה של הוספת חגים למתכון
        public static bool AddHolidays2Recipe(List<TBL_HolidaysForRecp> new_hd2rcp)
>>>>>>> orly
        {
            try
            {
                var db = Get_DB();
<<<<<<< HEAD
                TBL_Profile p = db.TBL_Profile.SingleOrDefault(x => x.Id_Prof == newProfile.Id_Prof);
                if (p != null)
                {
                    p.ProfType = newProfile.ProfType;
                    p.Name_Prof = newProfile.Name_Prof;
                    p.ProfDescription = newProfile.ProfDescription;
                    p.CityName = newProfile.CityName;
                    p.ProfStatus = newProfile.ProfStatus;

                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
=======
                //לעבור על כל הרשימה
                foreach (TBL_HolidaysForRecp i in new_hd2rcp)
                {
                    db.Entry(i).State = System.Data.Entity.EntityState.Added;
                }
                db.SaveChanges();
                return true;
>>>>>>> orly
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

<<<<<<< HEAD
        //הירשמות למערכת-בדיקת מייל
        #region Check Mail Available
        //check if mail exsist. if exsist - return false, else return true.
        public static bool CheckMailAvailable(string email)
=======
        #region Add New Ingridiants 2 Recipe
        //פונקציה של הוספת מצרכים למתכון
        public static bool AddNewIngridiants2Recipe(List<TBL_IngridiantForRecp> new_ing2rcp)
>>>>>>> orly
        {
            try
            {
                var db = Get_DB();
<<<<<<< HEAD
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email);
                if (user == null)
                    return true;
                else
                    return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        #endregion


        //התחברות למערכת
        #region LogIN
        // בודקת את האימייל והסיסמא של המשתשמש בכניסה
        public static TBL_User LogIn(string email, string pass)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email && x.UserPass == pass);//x => x.Email = user_details.Email && x.UserPass == user_details.Pass)
                if (user == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return user;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Check Profile Exsist By User Id
        // בודקת את האימייל והסיסמא של המשתשמש בכניסה
        public static TBL_Profile CheckProfileExsistByUserId(int user_id)
        {
            try
            {
                var db = Get_DB();
                TBL_Profile profile = db.TBL_Profile.SingleOrDefault(x => x.Id_User == user_id);
                if (profile == null)
                    return null;
                else
                    return profile;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion


        //שליחת מייל
=======
                //לעבור על כל הרשימה
                foreach (TBL_IngridiantForRecp i in new_ing2rcp)
                {
                    db.Entry(i).State = System.Data.Entity.EntityState.Added;
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

>>>>>>> orly
        #region Send Mail
        public static bool SendMail(string user_mail)
        {
            try
            {
                //get the user password
                var db = Get_DB();
                string user_password = db.TBL_User.SingleOrDefault(x => x.Email == user_mail).UserPass.ToString();
                if (user_password == null)
                    return false;
                else
                {
                    //SendMail to user with password
                    bool isSent = Mail.SendMail("orlydanielov@gmail.com", user_mail, "Reset Password - Cookit", "Your password is: " + user_password+".");
                    if (isSent)
                        return true;
                    else
                        return false;
                }
            }
            catch(Exception)
            {
                return false;
            }
        }
        #endregion

        //שליפת אובייקטים מסויימים
        #region Get User By Email
        public static int GetUserByEmail(string email)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email);
                if (user == null) // אם אין משתמש אם פרטים כאלה
                    return -1;
                else
                    return user.Id_User;
            }
            catch (Exception)
            {
                return -2;
            }
        }
        #endregion


        #region GetProfileByUserId
        // מביאה את הפרופיל לפי תז של משתמש
        public static TBL_Profile GetProfileByUserId(int userId)
        {
            try
            {
                var db = Get_DB();
                TBL_Profile prof = db.TBL_Profile.SingleOrDefault(x => x.Id_User == userId);
                if (prof == null) // אם אין משתמש אם פרטים כאלה
                    return null;
                else return prof;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion


        #region Get ProfileID Of User 
        public static int GetProfileIDOfUserByID(int ID)
        {
            try
            {
                var db = Get_DB();
                // Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                TBL_Profile user_prof = db.TBL_Profile.SingleOrDefault(a => a.Id_User == ID);
                return user_prof.Id_Prof;
            }
            catch
            {
                return -1;
            }
        }
        #endregion


        //שליפת אירועים וסדנאות

        #region Get All Events
        // הפוקנציה מביאה אירועים מהמסד נתונים
        public static List<TBL_Event> Get_all_Events()
        {
            try
            {
                var db = Get_DB();
              //  Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_Event.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Get All Workshops
        // הפוקנציה מביאה סדנאות מהמסד נתונים
        public static List<TBL_Workshop> Get_all_Workshops()
        {
            try
            {
                var db = Get_DB();
              //  Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_Workshop.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

    }
}
