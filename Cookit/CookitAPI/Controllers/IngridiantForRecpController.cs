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

        #region GetIngridiantsByRecpId
        [Route("GetIngridiantsByRecpId/{recp_id}")]
        [HttpGet]
        public HttpResponseMessage GetIngridiantsByRecpId(int recp_id)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_IngridiantForRecp> ing4recp = CookitDB.DB_Code.CookitQueries.GetIngridiantsByRecpId(recp_id);
                if (ing4recp == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this ingridiants recipe does not exist.");
                else
                {
                    Ingridinats2RecipeDTO ing;
                    List<Ingridinats2RecipeDTO> list_ing_2_recp = new List<Ingridinats2RecipeDTO>();
                    for (int i = 0; i < ing4recp.Count; i++)
                    {

                        ing = new Ingridinats2RecipeDTO()
                        {
                            id = ing4recp[i].Id,
                            id_recp= ing4recp[i].Id_Recp,
                            id_ingridiants = ing4recp[i].Id_Ingridiants,
                            id_mesurment = ing4recp[i].Id_Mesurment,
                            amount = ing4recp[i].Amount //float.Parse(ing4recp[i].Amount)
                        };
                        list_ing_2_recp.Add(ing);
                    }

                    return Request.CreateResponse(HttpStatusCode.OK, list_ing_2_recp);
                }

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

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
                for(int i =0; i<newIng2Recp.Count; i++)
                {
                    
                    ing = new TBL_IngridiantForRecp()
                    {
                        Id_Recp = newIng2Recp[i].id_recp,
                        Id_Ingridiants = newIng2Recp[i].id_ingridiants,
                        Id_Mesurment = newIng2Recp[i].id_mesurment,
                        Amount = newIng2Recp[i].amount
                    };
                    list_ing_2_recp.Add(ing);
                }
                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewIngridiants2Recipe(list_ing_2_recp);
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

        #region Update By Id
        [Route("UpdateById")]
        [HttpPut]
        public HttpResponseMessage UpdateById([FromBody]List<Ingridinats2RecipeDTO> updateIng2Recp)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_IngridiantForRecp> list_ing_2_recp = new List<TBL_IngridiantForRecp>();
                TBL_IngridiantForRecp ing;
                for (int i = 0; i < updateIng2Recp.Count; i++)
                {

                    ing = new TBL_IngridiantForRecp()
                    {
                        Id = updateIng2Recp[i].id,
                        Id_Recp = updateIng2Recp[i].id_recp,
                        Id_Ingridiants = updateIng2Recp[i].id_ingridiants,
                        Id_Mesurment = updateIng2Recp[i].id_mesurment,
                        Amount = updateIng2Recp[i].amount
                    };
                    list_ing_2_recp.Add(ing);
                }
                var is_saved = CookitDB.DB_Code.CookitQueries.updateIng2Recp(list_ing_2_recp);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the Ingridiants updated Successfully to the recipe.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't updated the ingridiant.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        /*
        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
        */
         #region Delete Ingridiat 2 Recipe
          [Route("DeleteById")]
          [HttpDelete]
          public HttpResponseMessage DeleteById([FromBody]List<Ingridinats2RecipeDTO> deleteIng2Recp)
          {
              try
              {
                  Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                  List<TBL_IngridiantForRecp> list_ing_2_recp = new List<TBL_IngridiantForRecp>();
                  TBL_IngridiantForRecp ing;
                  for (int i = 0; i < deleteIng2Recp.Count; i++)
                  {

                      ing = new TBL_IngridiantForRecp()
                      {
                          Id = deleteIng2Recp[i].id,
                          Id_Recp = deleteIng2Recp[i].id_recp,
                          Id_Ingridiants = deleteIng2Recp[i].id_ingridiants,
                          Id_Mesurment = deleteIng2Recp[i].id_mesurment,
                          Amount = deleteIng2Recp[i].amount
                      };
                      list_ing_2_recp.Add(ing);
                  }
                  var is_saved = CookitDB.DB_Code.CookitQueries.DeleteById(list_ing_2_recp);
                  if (is_saved == true)
                      return Request.CreateResponse(HttpStatusCode.OK, "the Ingridiants deleted Successfully from the recipe.");
                  else
                      return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't delete the ingridiant.");

              }
              catch (Exception e)
              {
                  return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
              }
          }
          #endregion
    }
}