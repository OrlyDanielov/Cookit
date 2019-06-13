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
        public char type;
        public string name;
        public string deskription;
        public CityDTO city;
        public bool status;
    }
}