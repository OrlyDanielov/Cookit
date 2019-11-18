using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class CommentsDTO
    {
        public int id;
        public int recipe_id;
        public int user_id;
        public string comment;
        public DateTime comment_date;
        //public bool comment_status;
    }
}