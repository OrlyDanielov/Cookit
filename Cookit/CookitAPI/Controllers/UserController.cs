using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;
using Cookit.DTO;

namespace Cookit.Controllers
{
    public class UserController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /*
        // GET api/<controller>/5
        [Route("api/User")]
        public HttpResponseMessage Get([FromBody]dynamic user_email_pass)
        {
            Cookit_DBConnection db = new Cookit_DBConnection();
            var isUserExists = CookitDB.DB_Code.CookitQueries.LogIn(user_email_pass); // מחזיר אמת אם אימייל וסיסמא נכונים. אחרת מחזיר שקר.




            var dishType = CookitDB.DB_Code.CookitQueries.Get_all_Mesurments();
            if (dishType == null) // אם אין נתונים במסד נתונים
                return Request.CreateResponse(HttpStatusCode.NotFound, "there is no Mesurments in DB.");
            else
            {
                //המרה של רשימת של אופני המדידה למבנה נתונים מסוג DTO
                List<MesurmentsDTO> result = new List<MesurmentsDTO>();
                foreach (TBL_Mesurments item in dishType)
                {
                    result.Add(new MesurmentsDTO
                    {
                        id = item.Id_Mesurment,
                        mesurment = item.Name_Mesurment.ToString()
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
        */

        /*
        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }
        */
        [Route("api/Clothe")]
        public void Post([FromBody]TBL_User newUser)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                //DB.Entry(newUser).state = System.Data.
                
            }
            catch
            {

            }
            /*
             * try
            {
                ClothesShopDBConnection db = new ClothesShopDBConnection();
                db.Entry(newClothe).State = System.Data.Entity.EntityState.Added; //  add the new clothe to the db
                db.SaveChanges();
                return true;
            }
            catch (Exception)//(Exception e)
            {
                return false;
            }
             */
        }

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