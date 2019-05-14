using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitLibrary; // כדי שיהיה גישה לטבלאות בסיס הנתונים

namespace Cookit.Controllers
{
    public class UserController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        /*
        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }
        */
        /*[Route("api/Clothe")]*/
        [Route("api/User")]
        public void Post([FromBody]TBL_User newUser)
        {
            try
            {
                Cookit_DB DB = new Cookit_DB(); //מצביע לבסיס הנתונים של טבלאות
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