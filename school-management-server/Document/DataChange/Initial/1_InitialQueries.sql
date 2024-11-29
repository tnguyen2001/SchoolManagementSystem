-- Create the project database
CREATE DATABASE SCHOOL;

-- Create the Roles table
USE SCHOOL;
CREATE TABLE Roles (
    ID int NOT NULL PRIMARY KEY IDENTITY(0,1),
    RoleName varchar(20) NOT NULL
);
INSERT INTO Roles(RoleName) VALUES ('Admin');
INSERT INTO Roles(RoleName) VALUES ('Teacher');
INSERT INTO Roles(RoleName) VALUES ('Student');
INSERT INTO Roles(RoleName) VALUES ('Finance');

-- Create the Users table
USE SCHOOL;
CREATE TABLE Users (
    ID int IDENTITY(1,1) PRIMARY KEY,
    Email varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
	DOB int,
    PhoneNumber varchar(10),
	RoleId int,
	CONSTRAINT RoleId FOREIGN KEY (RoleId)
    REFERENCES Roles(ID)
);

-- Create the Students table
USE SCHOOL;
CREATE TABLE Students (
    ID int NOT NULL PRIMARY KEY,
    Father varchar(255),
    Mother varchar(255),
    HomePhone varchar(10),
	Address varchar(255),
	Province varchar(50),
	UserId int,
	CONSTRAINT UserId FOREIGN KEY (UserId)
    REFERENCES Users(ID)
);

-- Create the Teachers table
USE SCHOOL;
CREATE TABLE Teachers (
    ID int NOT NULL PRIMARY KEY,
    AcademicRank varchar(50),
    AcademicDegree varchar(100),
    HomePhone varchar(10),
	Address varchar(255),
	Province varchar(50),
	UserId int,
	CONSTRAINT TeacherId FOREIGN KEY (UserId)
    REFERENCES Users(ID)
);