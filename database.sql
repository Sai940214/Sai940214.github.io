drop table if exists post;
drop table if exists users;

create table post (
  id serial primary key,
  title varchar(100) not null,
  message text not null,
  saved timestamp default current_timestamp
);

insert into post (title,message) values ('first','first message display');

create table users (
  id serial primary key,
  username varchar(100) unique not null,
  email varchar(100) unique not null,
  password varchar(255) not null
);

insert into users (username,email,password) values ('admin','admin@123','admin123');
