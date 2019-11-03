using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class EventDTO
    {
        public int id;
        public int profile_id;
        public string name;
        public DateTime date_time;
        public CityDTO city;
        public string description;
        public bool statusCancel;
    }
}