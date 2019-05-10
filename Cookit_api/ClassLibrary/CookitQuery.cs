using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Web;

namespace ClassLibrary
{
    public class CookitQuery
    {
        //פונקציה של הוספת מתכון חדש לטבלת המתכונים
        public static bool AddNewRecipe(TBL_Recipe new_recipe)
        {
           try
            {
                Cookit_DB_Connection db = new Cookit_DB_Connection();
                db.Entry(new_recipe).State = System.Data.Entity.EntityState.Added; // הוספת רשומת מתכון חדש לטבלת המתכונים
                db.SaveChanges();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }
    }
}
