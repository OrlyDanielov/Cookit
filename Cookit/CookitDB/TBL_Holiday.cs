
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
    
public partial class TBL_Holiday
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public TBL_Holiday()
    {
<<<<<<< HEAD

        this.TBL_Recipe = new HashSet<TBL_Recipe>();

=======
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TBL_Holiday()
        {
            this.TBL_HolidaysForRecp = new HashSet<TBL_HolidaysForRecp>();
        }
    
        public int Id_Holiday { get; set; }
        public string Name_Holiday { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_HolidaysForRecp> TBL_HolidaysForRecp { get; set; }
>>>>>>> orly
    }


    public int Id_Holiday { get; set; }

    public string Name_Holiday { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_Recipe> TBL_Recipe { get; set; }

}

}
