//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ClassLibrary
{
    using System;
    using System.Collections.Generic;
    
    public partial class TBL_Mesurments
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TBL_Mesurments()
        {
            this.TBL_IngridiantForRecp = new HashSet<TBL_IngridiantForRecp>();
            this.TBL_NutritionalIngridiants = new HashSet<TBL_NutritionalIngridiants>();
        }
    
        public int Id_Mesurment { get; set; }
        public string Name_Mesurment { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_IngridiantForRecp> TBL_IngridiantForRecp { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_NutritionalIngridiants> TBL_NutritionalIngridiants { get; set; }
    }
}
