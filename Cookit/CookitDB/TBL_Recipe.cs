
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
    
public partial class TBL_Recipe
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public TBL_Recipe()
    {

        this.TBL_FavoriteRecp = new HashSet<TBL_FavoriteRecp>();

        this.TBL_HolidaysForRecp = new HashSet<TBL_HolidaysForRecp>();

        this.TBL_IngridiantForRecp = new HashSet<TBL_IngridiantForRecp>();

        this.TBL_LabelsForRecp = new HashSet<TBL_LabelsForRecp>();

        this.TBL_Likes = new HashSet<TBL_Likes>();

        this.TBL_StarsForRecp = new HashSet<TBL_StarsForRecp>();

        this.TBL_Comments = new HashSet<TBL_Comments>();

        this.TBL_RecpLevelByBU = new HashSet<TBL_RecpLevelByBU>();

    }


    public int Id_Recipe { get; set; }

    public int Id_Recipe_User { get; set; }

    public string Name_Recipe { get; set; }

    public int Id_Recipe_DishType { get; set; }

    public int Id_Recipe_DishCategory { get; set; }

    public int Id_Recipe_FoodType { get; set; }

    public int Id_Recipe_KitchenType { get; set; }

    public System.TimeSpan RecipeTotalTime { get; set; }

    public System.TimeSpan RecipeWorkTime { get; set; }

    public int Id_Recipe_Level { get; set; }

    public string PreparationSteps { get; set; }



    public virtual TBL_DishCategory TBL_DishCategory { get; set; }

    public virtual TBL_DishType TBL_DishType { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_FavoriteRecp> TBL_FavoriteRecp { get; set; }

    public virtual TBL_FoodType TBL_FoodType { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_HolidaysForRecp> TBL_HolidaysForRecp { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_IngridiantForRecp> TBL_IngridiantForRecp { get; set; }

    public virtual TBL_KitchenType TBL_KitchenType { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_LabelsForRecp> TBL_LabelsForRecp { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_Likes> TBL_Likes { get; set; }

    public virtual TBL_RecipeDifficultyLevel TBL_RecipeDifficultyLevel { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_StarsForRecp> TBL_StarsForRecp { get; set; }

    public virtual TBL_User TBL_User { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_Comments> TBL_Comments { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TBL_RecpLevelByBU> TBL_RecpLevelByBU { get; set; }

}

}
