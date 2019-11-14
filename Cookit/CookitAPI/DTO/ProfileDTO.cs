using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class ProfileDTO
    {
        public int id;
        public int user_id;
        public string type;
        public string name;
        public string description;
        public int id_city;
        public int id_region;
        public bool status;
    }
}