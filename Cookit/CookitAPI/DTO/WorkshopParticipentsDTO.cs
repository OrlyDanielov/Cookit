using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookitAPI.DTO
{
    public class WorkshopParticipentsDTO
    {
        public int workshop_id;
        public int user_id;
        public bool status_register;
        public bool status_waitingList;
    }
}