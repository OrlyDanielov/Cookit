//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CookitDB
{
    using System;
    using System.Collections.Generic;
    
    public partial class TBL_RecpLevelByBU
    {
        public int Id_Recp { get; set; }
        public int Id_User { get; set; }
        public int Id_Level { get; set; }
    
        public virtual TBL_Recipe TBL_Recipe { get; set; }
        public virtual TBL_RecipeDifficultyLevel TBL_RecipeDifficultyLevel { get; set; }
        public virtual TBL_User TBL_User { get; set; }
    }
}
