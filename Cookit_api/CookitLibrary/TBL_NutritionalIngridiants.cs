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
    
    public partial class TBL_NutritionalIngridiants
    {
        public int Id_Ingridiants { get; set; }
        public int Id_Mesurment { get; set; }
        public Nullable<double> NutritionCalories { get; set; }
    
        public virtual TBL_Ingridiants TBL_Ingridiants { get; set; }
        public virtual TBL_Mesurments TBL_Mesurments { get; set; }
    }
}
