using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class RecipeDTO
    {
        public int recp_id;
        public int user_id;
        public string recp_name;
        public int recp_dish_type;
        public int recp_dish_category;
        public int recp_food_type;
        public int recp_kitchen_type;
        public int recp_level;
        public TimeSpan recp_total_time;   
        public TimeSpan recp_work_time;
        public string recp_steps;
        public string img_path;
        public string img_name;

    }
}