//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CookitLibrary
{
    using System;
    using System.Collections.Generic;
    
    public partial class TBL_Followers
    {
        public int Id_User { get; set; }
        public int Id_Prof { get; set; }
        public bool StatusFollower { get; set; }
    
        public virtual TBL_Profile TBL_Profile { get; set; }
        public virtual TBL_User TBL_User { get; set; }
    }
}
