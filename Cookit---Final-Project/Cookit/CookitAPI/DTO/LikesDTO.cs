using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class LikesDTO
    {
        public int recipe_id;
        public int user_id;
        public bool status;
        public DateTime date_like;
    }
}