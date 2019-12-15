
use Cookit_DB
go
--------------------------------------------
--TABLES

-------------------------------------------
-- טבלת סוגי משתמשים
CREATE TABLE TBL_UserType 
(
	Id_Type int primary key IDENTITY , -- מזהה סוג משתמש
	Name_Type nvarchar(10) not null -- סוג משתמש
)
GO
--------------------------------------------
-- טבלת משתמשים
CREATE TABLE TBL_User (
	Id_User int primary key IDENTITY, -- מזהה משתמש
	Id_Type int not null, -- מזההה סוג משתמש
	FirstName nvarchar(20) not null, -- שם פרטי
	LastName nvarchar(30) not null, -- שם משפחה
	Email varchar(50) not null unique, -- אימייל
	Gender char(1) not null check (Gender = 'F' or Gender = 'M'), -- מין
	UserPass varchar(12) not null, -- סיסמה
    UserStatus bit not null -- סטאטוס משתמש (פעיל\לא פעיל )
)
GO
--------------------------------------------
-- טבלת פרופיל
Create TABLE TBL_Profile
(
Id_Prof int Primary key IDENTITY, -- מזהה פרופיל
Id_User int not null, -- מזהה משתמש
Name_Prof nvarchar(30) not null, -- שם פרופיל
ProfDescription nvarchar(250) , -- תיאור פרופיל
Id_City int not null, -- עיר מגורים
Id_Region int not null, -- מחוז
ProfStatus bit not null, -- סטאטוס פרופיל (פעיל\לא פעיל) 
Image_Path nvarchar(500) not null, -- נתיב התמונה
Image_Name nvarchar(50) not null--שם התמונה
)
go
--------------------------------------------
-- טבלת ערים
Create TABLE TBL_City
(
CityName nvarchar(30) unique not null, -- שם עיר
Id_City int primary key, -- תז
Id_Region int not null -- תז מחוז
)
go
--------------------------------------------
-- טבלת מחוזות
Create TABLE TBL_Region
(
Id_Region int primary key, -- תז
Region nvarchar(30) not null unique  -- שם מחוז
)
go
--------------------------------------------
-- טבלת סוג מנה 
CREATE TABLE TBL_DishType
(
Id_DishType int primary key IDENTITY, -- מזהה סוג מנה
Name_DishType nvarchar(20) unique not null -- סוג מנה
)
go 
--------------------------------------------
--טבלת מאפייני מנה
CREATE TABLE TBL_DishCategory
(
Id_DishCategory int primary key IDENTITY, -- מזהה מאפיין מנה
Name_DishCategory nvarchar(20) unique not null -- מאפיין מנה
)
go 
--------------------------------------------
--טבלת סוג אוכל
CREATE TABLE TBL_FoodType
(
Id_FoodType int primary key IDENTITY, -- מזהה סוג אוכל
Name_FoodType nvarchar(30) unique not null -- סוג אוכל
)
go
--------------------------------------------
-- טבלת תוויות
CREATE TABLE TBL_FoodLabel
(
Id_FoodLabel int primary key IDENTITY, -- מזהה תווית
Name_FoodLabel nvarchar(30) unique not null -- תווית
)
go
--------------------------------------------
--טבלת מצרכים
CREATE TABLE TBL_Ingridiants
(
Id_Ingridiants int primary key IDENTITY, -- מזהה מצרך
Name_Ingridiants nvarchar(30) unique not null -- שם מצרך
)
go
--------------------------------------------
-- טבלת אופן מדידה
CREATE TABLE TBL_Mesurments
(
Id_Mesurment int primary key IDENTITY, --  מזהה אופן מדידה
Name_Mesurment nvarchar(15) unique not null -- אופן מדידה
)
go
--------------------------------------------
--טבלת חגים
CREATE TABLE TBL_Holiday
(
Id_Holiday int primary key IDENTITY, -- מזהה חג
Name_Holiday nvarchar(30) unique not null -- שם חג
)
go
--------------------------------------------
-- טבלת רמות קושי 
CREATE TABLE TBL_RecipeDifficultyLevel
(
Id_Level int primary key IDENTITY, -- מזהה רמת קושי לביצוע
Name_Level nvarchar(30) unique not null -- רמת קושי 
)
go
--------------------------------------------
--טבלת מטבחים
create table TBL_KitchenType
(
Id_Kitchen int primary key IDENTITY, -- מזהה מטבח
Kitchen_Name nvarchar(20) not null unique  -- סגנון מטבח
)
go
--------------------------------------------
--טבלת מתכונים
CREATE TABLE TBL_Recipe
(
Id_Recipe int primary key IDENTITY, --ת"ז מתכון
Id_Recipe_User int not null, --ת"ז משתמש שהעלה אותו
Name_Recipe nvarchar(60) not null, -- שם מתכון
Id_Recipe_DishType int not null, -- ת"ז סוג מנה
Id_Recipe_DishCategory int Not null, -- ת"ז מאפיין מנה
Id_Recipe_FoodType int not null, -- ת"ז סוג אוכל
Id_Recipe_KitchenType int not null, -- ת"ז סגנון מטבח
RecipeTotalTime time not null, -- זמן הכנה
RecipeWorkTime time not null,  -- זמן עבודה
Id_Recipe_Level int not null, -- ת"ז רמת קושי
PreparationSteps ntext not null, -- אופן ההכנה
Image_Path nvarchar(500) not null, -- נתיב התמונה
Image_Name nvarchar(50) not null--שם התמונה
)
go
--------------------------------------------
-- טבלת מצרכים למתכון
CREATE TABLE TBL_IngridiantForRecp
(
Id int not null identity(1,1) primary key,
Id_Recp int not null, -- מזהה מתכון
Id_Ingridiants int not null, -- מזהה מצרך
Id_Mesurment int not null, -- מזהה אופן מדידה
Amount float not null -- כמות המצרך
)
go
--------------------------------------------
-- טבלת חגים למתכון
CREATE TABLE TBL_HolidaysForRecp
(
Id int identity (1,1) primary key , --תז
Id_Recp int not null, -- מזהה מתכון
Id_Holiday int not null -- מזהה חג
)
go
--------------------------------------------
--------------------------------------------
-- טבלת תוויות למתכון
CREATE TABLE TBL_LabelsForRecp
(
Id int identity(1,1) primary key , -- תז
Id_Recp int not null, -- מזהה מתכון
Id_FoodLabel int not null -- מזהה תווית
)
go
--------------------------------------------
-- טבלת לייקים
CREATE TABLE TBL_Likes
(
Id_Recp int not null, -- מזהה מתכון
Id_User int not null--, -- מזהה משתמש
)
go
--------------------------------------------
-- טבלת תגובות
CREATE TABLE TBL_Comments
(
Id_Comment int primary key identity (1,1) not null, -- מספר תגובה למתכון
Id_Recp int not null, -- מזהה מתכון
Id_User int not null, -- מזהה משתמש
Comment ntext not null, -- התגובה למתכון
CommentDate datetime not null -- תאריך התגובה
)
go
--------------------------------------------
--  טבלת מתכונים מועדפים למשתמש
CREATE TABLE TBL_FavoriteRecp
(
Id_Recp int not null, -- מזהה מתכון
Id_User int not null--, -- מזהה משתמש
)
go
--------------------------------------------
--טבלת עוקבים 
CREATE TABLE TBL_Followers
(
Id_User int not null, -- מזהה משתמש
Id_Prof int not null--, -- מזהה פרופיל
) 
go
-------------------------------------------
--אילוצים
-------------------------------------------
---טבלת משתמשים
ALTER TABLE [dbo].[TBL_User]
ADD
CONSTRAINT [FK_UserType] FOREIGN KEY 
          (Id_Type) REFERENCES [dbo].[TBL_UserType] (Id_Type)
--CONSTRAINT [Uq_Email] unique (Email)

GO
------------------------------------------
--טבלת פרופיל
ALTER TABLE [dbo].[TBL_Profile]
ADD
CONSTRAINT [FK_User] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User),
CONSTRAINT [FK_City]  FOREIGN KEY 
          (Id_City) REFERENCES [dbo].[TBL_City] (Id_City),
CONSTRAINT [FK_Region] FOREIGN KEY 
          (Id_Region) REFERENCES [dbo].[TBL_Region] (Id_Region)
GO
------------------------------------------
--  טבלת מתכונים
ALTER TABLE [dbo].[TBL_Recipe]
ADD
CONSTRAINT [FK_User1] FOREIGN KEY 
          (Id_Recipe_User) REFERENCES [dbo].[TBL_User] (Id_User),
CONSTRAINT [FK_DishType] FOREIGN KEY 
          ([Id_Recipe_DishType]) REFERENCES [dbo].[TBL_DishType] (Id_DishType),		  
CONSTRAINT [FK_DishCategory] FOREIGN KEY 
          ([Id_Recipe_DishCategory]) REFERENCES [dbo].[TBL_DishCategory] (Id_DishCategory),
CONSTRAINT [FK_FoodType] FOREIGN KEY 
          ([Id_Recipe_FoodType]) REFERENCES [dbo].[TBL_FoodType] (Id_FoodType),
CONSTRAINT [FK_KitchenType] FOREIGN KEY 
          ([Id_Recipe_KitchenType]) REFERENCES [dbo].[TBL_KitchenType] (Id_Kitchen),
CONSTRAINT [FK_Level] FOREIGN KEY 
          ([Id_Recipe_Level]) REFERENCES [dbo].[TBL_RecipeDifficultyLevel] (Id_Level)
go
------------------------------------------
-- טבלת מצרכים למתכון
ALTER TABLE  [dbo].[TBL_IngridiantForRecp]
ADD
CONSTRAINT [FK_Recp] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_Ingridiants1] FOREIGN KEY 
          (Id_Ingridiants) REFERENCES [dbo].[TBL_Ingridiants] (Id_Ingridiants),
CONSTRAINT [FK_Mesurment1] FOREIGN KEY 
          (Id_Mesurment) REFERENCES [dbo].[TBL_Mesurments] (Id_Mesurment),
CONSTRAINT [CON_Unique]UNIQUE NONCLUSTERED
    (
        [Id_Recp], [Id_Ingridiants], [Id_Mesurment]
    )
GO
--------------------------------------------
--תוויות לתמכון
ALTER TABLE [dbo].[TBL_LabelsForRecp]
ADD
CONSTRAINT [FK_Recp7] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_Label] FOREIGN KEY 
          (Id_FoodLabel) REFERENCES [dbo].[TBL_FoodLabel] (Id_FoodLabel),
CONSTRAINT [CON_Unique2]UNIQUE NONCLUSTERED
    (
        [Id_Recp], [Id_FoodLabel]
    )
GO
------------------------------------------
--טבלת חגים למתכון

ALTER TABLE [dbo].[TBL_HolidaysForRecp]
ADD
CONSTRAINT [FK_Recp8] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_Label3] FOREIGN KEY 
          (Id_Holiday) REFERENCES [dbo].[TBL_Holiday] (Id_Holiday),
CONSTRAINT [CON_Unique3]UNIQUE NONCLUSTERED
    (
        [Id_Recp], [Id_Holiday]
    )
GO
------------------------------------------
-- טבלת לייקים
ALTER TABLE  [dbo].[TBL_Likes]
ADD
CONSTRAINT [PK_Likes] PRIMARY KEY (Id_Recp,Id_User),
CONSTRAINT [FK_Recp2] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_User2] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User)
GO
------------------------------------------
-- טבלת תגובות
ALTER TABLE  [dbo].[TBL_Comments]
ADD
CONSTRAINT [FK_Recp3] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_User3] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User)
GO
------------------------------------------
-- טבלת מתכונים מועדפים
ALTER TABLE [dbo].[TBL_FavoriteRecp]
ADD
CONSTRAINT [PK_FavoriteRecp] PRIMARY KEY (Id_Recp,Id_User),
CONSTRAINT [FK_Recp6] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_User5] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User)
GO
-------------------------------------------- 
--טבלת עוקבים
ALTER TABLE  [dbo].[TBL_Followers]
ADD
CONSTRAINT [PK_Followers] PRIMARY KEY (Id_Prof,Id_User),
CONSTRAINT [FK_Profile] FOREIGN KEY 
          (Id_Prof) REFERENCES [dbo].[TBL_Profile] (Id_Prof),
CONSTRAINT [FK_User6] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User)
GO
--------------------------------------------
--טבלת ערים 
ALTER TABLE  [dbo].[TBL_City]
ADD
CONSTRAINT [FK_Id_Region] FOREIGN KEY 
          (Id_Region) REFERENCES [dbo].[TBL_Region] (Id_Region)
GO
--------------------------------------------
