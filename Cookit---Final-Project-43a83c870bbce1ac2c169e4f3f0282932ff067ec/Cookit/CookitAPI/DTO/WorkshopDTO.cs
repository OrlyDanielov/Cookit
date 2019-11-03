using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class WorkshopDTO
    {
        public int id;
        public int profile_id;
        public string name;
        public DateTime date_time;
        public CityDTO city;
        public string description;
        public int max_participants;
        public bool statusCancel;
        public bool status_available;
    }
}