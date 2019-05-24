using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;

namespace Cookit.Controllers
{
    //[RoutePrefix("api/recipe")]
    public class RecipeController : ApiController
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
         */
        // POST api/<controller>
        [Route("api/Recipe")]
        public bool Post([FromBody]TBL_Recipe newRecipe)
        {
            try
            {
                Cookit_DBConnection db = new Cookit_DBConnection();
                db.TBL_Recipe.Add(newRecipe); // הוספת רשומת מתכון חדש לטבלת המתכונים
                db.SaveChanges();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }
         
       

        //[Route("api/recipe")]
            /*
        public HttpResponseMessage Post([FromBody]TBL_Recipe newRecipe)
        {
            var isSaved = CookitQuery.AddNewRecipe(newRecipe);
            if (isSaved == true)
                return Request.CreateResponse(HttpStatusCode.OK, isSaved);
            else
                return Request.CreateResponse(HttpStatusCode.NotImplemented, "");
        }
        */

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