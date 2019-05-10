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
    
    public partial class TBL_User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TBL_User()
        {
            this.TBL_Comments = new HashSet<TBL_Comments>();
            this.TBL_DrawerRecp = new HashSet<TBL_DrawerRecp>();
            this.TBL_FavoriteRecp = new HashSet<TBL_FavoriteRecp>();
            this.TBL_Followers = new HashSet<TBL_Followers>();
            this.TBL_Likes = new HashSet<TBL_Likes>();
            this.TBL_Profile = new HashSet<TBL_Profile>();
            this.TBL_Recipe = new HashSet<TBL_Recipe>();
            this.TBL_RecpLevelByBU = new HashSet<TBL_RecpLevelByBU>();
            this.TBL_WorkshopParticipents = new HashSet<TBL_WorkshopParticipents>();
        }
    
        public int Id_User { get; set; }
        public int Id_Type { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string UserPass { get; set; }
        public bool UserStatus { get; set; }
        public int NumDrawRecp { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_Comments> TBL_Comments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_DrawerRecp> TBL_DrawerRecp { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_FavoriteRecp> TBL_FavoriteRecp { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_Followers> TBL_Followers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_Likes> TBL_Likes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_Profile> TBL_Profile { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_Recipe> TBL_Recipe { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_RecpLevelByBU> TBL_RecpLevelByBU { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TBL_WorkshopParticipents> TBL_WorkshopParticipents { get; set; }
        public virtual TBL_UserType TBL_UserType { get; set; }
    }
}
