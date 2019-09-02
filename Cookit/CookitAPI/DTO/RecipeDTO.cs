﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class RecipeDTO
    {
        public int id;
        public int user_id;
        public string name;
        public int recp_dish_type;
        public int recp_dish_category;
        public int recp_food_type;
        public int recp_kitchen_type;
        public int recp_level;
        public DateTime recp_total_time;
        public DateTime recp_work_time;
        public string recp_steps;

    }
}