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
    [RoutePrefix("api/FoodLabelsForRecp")]
    public class FoodLabelsForRecpController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        #region GetRecipeFoodLables
        [Route("GetFoodLablesByRecpId/{recp_id}")]
        [HttpGet]
        public HttpResponseMessage GetFoodLablesByRecpId(int recp_id)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_LabelsForRecp> lbl4recp = CookitDB.DB_Code.CookitQueries.GetFoodLablesByRecpId(recp_id);
                if (lbl4recp == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "this food lables recipe does not exist.");
                else
                {
                    FoodLable2RecipeDTO food_lable;
                    List<FoodLable2RecipeDTO> list_lbl_2_recp = new List<FoodLable2RecipeDTO>();
                    for (int i = 0; i < lbl4recp.Count; i++)
                    {

                        food_lable = new FoodLable2RecipeDTO()
                        {
                            id = lbl4recp[i].Id,
                            id_recipe= lbl4recp[i].Id_Recp,
                            id_food_lable = lbl4recp[i].Id_FoodLabel
                        };
                        list_lbl_2_recp.Add(food_lable);
                    }

                    return Request.CreateResponse(HttpStatusCode.OK, list_lbl_2_recp);
                }

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion

        #region  Add NewFood Lable 2 Recipe
        //Add New Food Lable 2 Recipe
        [Route("AddNewFoodLable2Recipe")]
        [HttpPost]
        public HttpResponseMessage FoodLable2Recipe([FromBody]List<FoodLable2RecipeDTO> newFl2Recipe)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_LabelsForRecp> list_lbl_2_recp = new List<TBL_LabelsForRecp>();
                TBL_LabelsForRecp food_lbl2recp;
                for (int i = 0; i < newFl2Recipe.Count; i++)
                {

                    food_lbl2recp = new TBL_LabelsForRecp()
                    {
                       Id_FoodLabel = newFl2Recipe[i].id_food_lable,
                       Id_Recp = newFl2Recipe[i].id_recipe
                    };
                    list_lbl_2_recp.Add(food_lbl2recp);
                }
                var is_saved = CookitDB.DB_Code.CookitQueries.AddNewFoodLables2Recipe(list_lbl_2_recp);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the food lables added Successfully to the recipe.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't add the food lables.");

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

        #region Delete Ingridiat 2 Recipe
        [Route("DeleteById")]
        [HttpDelete]
        public HttpResponseMessage DeleteById([FromBody]List<FoodLable2RecipeDTO> deletelbl2Recp)
        {
            try
            {
                Cookit_DBConnection DB = new Cookit_DBConnection(); //מצביע לבסיס הנתונים של טבלאות
                List<TBL_LabelsForRecp> list_lbl_2_recp = new List<TBL_LabelsForRecp>();
                TBL_LabelsForRecp lbl;
                for (int i = 0; i < deletelbl2Recp.Count; i++)
                {

                    lbl = new TBL_LabelsForRecp()
                    {
                       Id = deletelbl2Recp[i].id,
                       Id_Recp = deletelbl2Recp[i].id_recipe,
                       Id_FoodLabel = deletelbl2Recp[i].id_food_lable
                    };
                    list_lbl_2_recp.Add(lbl);
                }
                var is_saved = CookitDB.DB_Code.CookitQueries.DeleteFoodLabelsForRecipeById(list_lbl_2_recp);
                if (is_saved == true)
                    return Request.CreateResponse(HttpStatusCode.OK, "the food labels deleted Successfully from the recipe.");
                else
                    return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "the server can't delete the food labels.");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
        #endregion
    }
}