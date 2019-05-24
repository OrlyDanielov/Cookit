using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookitDB.DB_Code
{
    public class CookitQueries
    {
        // הפוקנציה מביאה מהמסד את כל סוגי המנות
        public static List<TBL_DishType> Get_all_DishType()
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_DishType.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // הפוקנציה מביאה מהמסד את כל קטגוריות המנות
        public static List<TBL_DishCategory> Get_all_DishCategory()
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_DishCategory.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // הפוקנציה מביאה מהמסד את כל סוגי האוכל
        public static List<TBL_FoodType> Get_all_FoodType()
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_FoodType.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // הפוקנציה מביאה מהמסד את כל סוגי מטבחים
        public static List<TBL_KitchenType> Get_all_KitchenType()
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_KitchenType.ToList();
            }
            catch (Exception e)
            {
                return null;

            }
        }


        // הפוקנציה מביאה מהמסד את כל דרגות הקושי למתכון
        public static List<TBL_RecipeDifficultyLevel> Get_all_DifficultyLevel()
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_RecipeDifficultyLevel.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // הפוקנציה מביאה מהמסד את כל המצרכים למתכון
        public static List<TBL_Ingridiants> Get_all_Ingridiants()
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_Ingridiants.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // הפוקנציה מביאה מהמסד את כל אופני המדידה למתכון
        public static List<TBL_Mesurments> Get_all_Mesurments()
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                return db.TBL_Mesurments.ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        //פונקציה של הוספת מתכון חדש לטבלת המתכונים
        public static bool AddNewRecipe(TBL_Recipe new_recipe)
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                db.Entry(new_recipe).State = System.Data.Entity.EntityState.Added; // הוספת רשומת מתכון חדש לטבלת המתכונים
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
