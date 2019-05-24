using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class UserDTO
    {
        public int id;
        public int user_type;
        public string first_name;
        public string last_name;
        public string email;
        public string gender;
        public string pasword;
        public string status;
        public int number_of_draw_recipe;
    }
}