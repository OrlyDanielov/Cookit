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
    
    public partial class TBL_DrawerRecp
    {
        public int Id_DrawerRecp { get; set; }
        public int Id_User { get; set; }
        public string Name_DrawerRecp { get; set; }
    
        public virtual TBL_User TBL_User { get; set; }
    }
}
