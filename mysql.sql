create database taskmanagerReactRouter;
use taskmanagerReactRouter;
create table users(
	userId int primary key auto_increment,
    firstname varchar(100),
    age int,
    gender enum("Male","Female"),
    username varchar(100),
    email varchar(100),
    password varchar(100),
    provider varchar(100)
);
select * from users;
-- delete from users where userId = 5; 

create table tasks(
	taskId int primary key auto_increment,
    title varchar(50),
    description varchar(200),
    createdAt date,
    updatedAt date,
    createdBy int,
    foreign key (createdBy) references users(userId)
);
select * from tasks;

INSERT INTO tasks (title,description,createdBy) VALUES 
("bhais","Doodh",6);


-- delete from tasks where taskId = 3; 

