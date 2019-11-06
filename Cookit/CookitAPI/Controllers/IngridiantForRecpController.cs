using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CookitDB;
using CookitAPI.DTO;

namespace CookitAPI.Controllers
{
    [RoutePrefix("api/IngridiantForRecp")]
    public class IngridiantForRecpController : ApiController
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

        #region Add New Ingridiat 2 Recipe
        [Route("AddNewIng2Recp")]
        [HttpPost]
        public HttpResponseMessage AddNewIng2Recp([FromBody]List<Ingridinats2RecipeDTO> newIng2Recp)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_IngridiantForRecp> list_ing_2_recp = new List<TBL_IngridiantForRecp>();
                TBL_IngridiantForRecp ing;
                //bool flag = true;
                //foreach(Ingridinats2RecipeDTO x in newIng2Recp)
                for(int i =0; i<newIng2Recp.Count; i++)
                {
                    //ing = new TBL_IngridiantForRecp() {
                    //    Id_Recp = x.id_recp,
                    //    Id_Ingridiants = x.id_ingridiants,
                    //    Id_Mesurment = x.id_mesurment,
                    //    Amount = x.amount
                    //};
                    ing = new TBL_IngridiantForRecp()
                    {
                        Id_Recp = newIng2Recp[i].id_recp,
                        Id_Ingridiants = newIng2Recp[i].id_ingridiants,
                        Id_Mesurment = newIng2Recp[i].id_mesurment,
                        Amount = newIng2Recp[i].amount
                    };
                    list_ing_2_recp.Add(ing);
                    //if (!(CookitDB.DB_Code.CookitQueries.AddNewIngridiants2Recipe(ing)))
                    //    flag = false;
                }
                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewIngridiants2Recipe(list_ing_2_recp);
                //if (flag)
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the Ingridiants added Successfully to the recipe.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the ingridiant.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion
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