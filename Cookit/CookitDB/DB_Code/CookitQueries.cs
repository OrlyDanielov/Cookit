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

        #region Get User By Email
        public static TBL_User GetUserByEmail(string email)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email);
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Update User Info
        public static bool UpdateUserInfo(TBL_User newUser)
        {
            try
            {
                var db = Get_DB();
                TBL_User u = db.TBL_User.SingleOrDefault(x => x.Id_User == newUser.Id_User);
                if (u != null)
                {
                    //change only private user details
                    u.FirstName = newUser.FirstName;
                    u.LastName = newUser.LastName;
                    u.Gender = newUser.Gender;
                    u.Email = newUser.Email;

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
           
        #region Check Mail Available
        //check if email Available, then return true. else return false.
        public static bool CheckMailAvailable(string email)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email);
                if (user == null)
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region LogIN
        // בודקת את האימייל והסיסמא של המשתשמש בכניסה
        public static TBL_User LogIn(string email, string pass)
        {
            try
            {
                var db = Get_DB();                
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email && x.UserPass == pass);
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
                //Cookit_DBConnection db = new Cookit_DBConnection();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                return db.TBL_City.ToList();
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

        #region Add New Recipe
        //פונקציה של הוספת מתכון חדש לטבלת המתכונים
        public static bool AddNewRecipe(TBL_Recipe new_recipe)
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                db.Entry(new_recipe).State = System.Data.Entity.EntityState.Added; // הוספת רשומת מתכון חדש לטבלת המתכונים
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region Add New User
        //פונקציה של הוספת משתמש חדש לטבלת המשתמשים
        public static bool AddNewUser(TBL_User new_user)
        //public static int AddNewUser(TBL_User new_user)
        {
            try
            {
                var db = Get_DB();
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
                db.Entry(new_user).State = System.Data.Entity.EntityState.Added; // הוספת משתמש חדש
                db.SaveChanges();
                return true;

                //int id = db.TBL_User.SingleOrDefault(x => x.Email == new_user.Email && x.UserPass == new_user.UserPass).Id_User;
                //return id;
            }
            catch (Exception)
            {
                return false;
                //return -1;
            }
        }
        #endregion

        #region Get User Id By Email
        public static int GetUserIdByEmail(string email)
        {
            try
            {
                var db = Get_DB();
                TBL_User user = db.TBL_User.SingleOrDefault(x => x.Email == email);
                return user.Id_User;
            }
            catch (Exception)
            {
                return -1;
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
                //bgroup36_prodConnection db = new bgroup36_prodConnection();
                //Cookit_DBConnection db = new Cookit_DBConnection();
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

    }
}
