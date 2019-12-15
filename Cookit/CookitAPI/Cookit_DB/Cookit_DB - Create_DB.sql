  --יצירת DB
CREATE DATABASE Cookit_DB
   ON 
     ( NAME = 'Cookit_DB_Data', 
       FILENAME = 'C:\DB-RUPPIN\Cookit_DB\Cookit_DB_Data.MDF', 
       SIZE = 10, 
       FILEGROWTH = 10% ) 
   LOG ON 
     ( NAME = 'Cookit_DB_Log', 
       FILENAME = 'C:\DB-RUPPIN\Cookit_DB\Cookit_DB_Log.Idf' )
 COLLATE Hebrew_CI_AS
go

Use Cookit_DB
go