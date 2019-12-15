
use Cookit_DB
go
--------------------------------------------
--TABLES

-------------------------------------------
-- ���� ���� �������
CREATE TABLE TBL_UserType 
(
	Id_Type int primary key IDENTITY , -- ���� ��� �����
	Name_Type nvarchar(10) not null -- ��� �����
)
GO
--------------------------------------------
-- ���� �������
CREATE TABLE TBL_User (
	Id_User int primary key IDENTITY, -- ���� �����
	Id_Type int not null, -- ����� ��� �����
	FirstName nvarchar(20) not null, -- �� ����
	LastName nvarchar(30) not null, -- �� �����
	Email varchar(50) not null unique, -- ������
	Gender char(1) not null check (Gender = 'F' or Gender = 'M'), -- ���
	UserPass varchar(12) not null, -- �����
    UserStatus bit not null -- ������ ����� (����\�� ���� )
)
GO
--------------------------------------------
-- ���� ������
Create TABLE TBL_Profile
(
Id_Prof int Primary key IDENTITY, -- ���� ������
Id_User int not null, -- ���� �����
Name_Prof nvarchar(30) not null, -- �� ������
ProfDescription nvarchar(250) , -- ����� ������
Id_City int not null, -- ��� ������
Id_Region int not null, -- ����
ProfStatus bit not null, -- ������ ������ (����\�� ����) 
Image_Path nvarchar(500) not null, -- ���� ������
Image_Name nvarchar(50) not null--�� ������
)
go
--------------------------------------------
-- ���� ����
Create TABLE TBL_City
(
CityName nvarchar(30) unique not null, -- �� ���
Id_City int primary key, -- ��
Id_Region int not null -- �� ����
)
go
--------------------------------------------
-- ���� ������
Create TABLE TBL_Region
(
Id_Region int primary key, -- ��
Region nvarchar(30) not null unique  -- �� ����
)
go
--------------------------------------------
-- ���� ��� ��� 
CREATE TABLE TBL_DishType
(
Id_DishType int primary key IDENTITY, -- ���� ��� ���
Name_DishType nvarchar(20) unique not null -- ��� ���
)
go 
--------------------------------------------
--���� ������� ���
CREATE TABLE TBL_DishCategory
(
Id_DishCategory int primary key IDENTITY, -- ���� ������ ���
Name_DishCategory nvarchar(20) unique not null -- ������ ���
)
go 
--------------------------------------------
--���� ��� ����
CREATE TABLE TBL_FoodType
(
Id_FoodType int primary key IDENTITY, -- ���� ��� ����
Name_FoodType nvarchar(30) unique not null -- ��� ����
)
go
--------------------------------------------
-- ���� ������
CREATE TABLE TBL_FoodLabel
(
Id_FoodLabel int primary key IDENTITY, -- ���� �����
Name_FoodLabel nvarchar(30) unique not null -- �����
)
go
--------------------------------------------
--���� ������
CREATE TABLE TBL_Ingridiants
(
Id_Ingridiants int primary key IDENTITY, -- ���� ����
Name_Ingridiants nvarchar(30) unique not null -- �� ����
)
go
--------------------------------------------
-- ���� ���� �����
CREATE TABLE TBL_Mesurments
(
Id_Mesurment int primary key IDENTITY, --  ���� ���� �����
Name_Mesurment nvarchar(15) unique not null -- ���� �����
)
go
--------------------------------------------
--���� ����
CREATE TABLE TBL_Holiday
(
Id_Holiday int primary key IDENTITY, -- ���� ��
Name_Holiday nvarchar(30) unique not null -- �� ��
)
go
--------------------------------------------
-- ���� ���� ���� 
CREATE TABLE TBL_RecipeDifficultyLevel
(
Id_Level int primary key IDENTITY, -- ���� ��� ���� ������
Name_Level nvarchar(30) unique not null -- ��� ���� 
)
go
--------------------------------------------
--���� ������
create table TBL_KitchenType
(
Id_Kitchen int primary key IDENTITY, -- ���� ����
Kitchen_Name nvarchar(20) not null unique  -- ����� ����
)
go
--------------------------------------------
--���� �������
CREATE TABLE TBL_Recipe
(
Id_Recipe int primary key IDENTITY, --�"� �����
Id_Recipe_User int not null, --�"� ����� ����� ����
Name_Recipe nvarchar(60) not null, -- �� �����
Id_Recipe_DishType int not null, -- �"� ��� ���
Id_Recipe_DishCategory int Not null, -- �"� ������ ���
Id_Recipe_FoodType int not null, -- �"� ��� ����
Id_Recipe_KitchenType int not null, -- �"� ����� ����
RecipeTotalTime time not null, -- ��� ����
RecipeWorkTime time not null,  -- ��� �����
Id_Recipe_Level int not null, -- �"� ��� ����
PreparationSteps ntext not null, -- ���� �����
Image_Path nvarchar(500) not null, -- ���� ������
Image_Name nvarchar(50) not null--�� ������
)
go
--------------------------------------------
-- ���� ������ ������
CREATE TABLE TBL_IngridiantForRecp
(
Id int not null identity(1,1) primary key,
Id_Recp int not null, -- ���� �����
Id_Ingridiants int not null, -- ���� ����
Id_Mesurment int not null, -- ���� ���� �����
Amount float not null -- ���� �����
)
go
--------------------------------------------
-- ���� ���� ������
CREATE TABLE TBL_HolidaysForRecp
(
Id int identity (1,1) primary key , --��
Id_Recp int not null, -- ���� �����
Id_Holiday int not null -- ���� ��
)
go
--------------------------------------------
--------------------------------------------
-- ���� ������ ������
CREATE TABLE TBL_LabelsForRecp
(
Id int identity(1,1) primary key , -- ��
Id_Recp int not null, -- ���� �����
Id_FoodLabel int not null -- ���� �����
)
go
--------------------------------------------
-- ���� ������
CREATE TABLE TBL_Likes
(
Id_Recp int not null, -- ���� �����
Id_User int not null--, -- ���� �����
)
go
--------------------------------------------
-- ���� ������
CREATE TABLE TBL_Comments
(
Id_Comment int primary key identity (1,1) not null, -- ���� ����� ������
Id_Recp int not null, -- ���� �����
Id_User int not null, -- ���� �����
Comment ntext not null, -- ������ ������
CommentDate datetime not null -- ����� ������
)
go
--------------------------------------------
--  ���� ������� ������� ������
CREATE TABLE TBL_FavoriteRecp
(
Id_Recp int not null, -- ���� �����
Id_User int not null--, -- ���� �����
)
go
--------------------------------------------
--���� ������ 
CREATE TABLE TBL_Followers
(
Id_User int not null, -- ���� �����
Id_Prof int not null--, -- ���� ������
) 
go
-------------------------------------------
--�������
-------------------------------------------
---���� �������
ALTER TABLE [dbo].[TBL_User]
ADD
CONSTRAINT [FK_UserType] FOREIGN KEY 
          (Id_Type) REFERENCES [dbo].[TBL_UserType] (Id_Type)
--CONSTRAINT [Uq_Email] unique (Email)

GO
------------------------------------------
--���� ������
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
--  ���� �������
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
-- ���� ������ ������
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
--������ ������
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
--���� ���� ������

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
-- ���� ������
ALTER TABLE  [dbo].[TBL_Likes]
ADD
CONSTRAINT [PK_Likes] PRIMARY KEY (Id_Recp,Id_User),
CONSTRAINT [FK_Recp2] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_User2] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User)
GO
------------------------------------------
-- ���� ������
ALTER TABLE  [dbo].[TBL_Comments]
ADD
CONSTRAINT [FK_Recp3] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_User3] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User)
GO
------------------------------------------
-- ���� ������� �������
ALTER TABLE [dbo].[TBL_FavoriteRecp]
ADD
CONSTRAINT [PK_FavoriteRecp] PRIMARY KEY (Id_Recp,Id_User),
CONSTRAINT [FK_Recp6] FOREIGN KEY 
          (Id_Recp) REFERENCES [dbo].[TBL_Recipe] (Id_Recipe),
CONSTRAINT [FK_User5] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User)
GO
-------------------------------------------- 
--���� ������
ALTER TABLE  [dbo].[TBL_Followers]
ADD
CONSTRAINT [PK_Followers] PRIMARY KEY (Id_Prof,Id_User),
CONSTRAINT [FK_Profile] FOREIGN KEY 
          (Id_Prof) REFERENCES [dbo].[TBL_Profile] (Id_Prof),
CONSTRAINT [FK_User6] FOREIGN KEY 
          (Id_User) REFERENCES [dbo].[TBL_User] (Id_User)
GO
--------------------------------------------
--���� ���� 
ALTER TABLE  [dbo].[TBL_City]
ADD
CONSTRAINT [FK_Id_Region] FOREIGN KEY 
          (Id_Region) REFERENCES [dbo].[TBL_Region] (Id_Region)
GO
--------------------------------------------
