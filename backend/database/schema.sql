DROP DATABASE IF EXISTS juracine;
CREATE DATABASE juracine;
USE juracine;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS roles;

CREATE TABLE users (
  user_id int auto_increment PRIMARY KEY,
  email varchar(100) not null,
  hashed_password text not null,
  confirmation_inscription boolean,
  created_date datetime default current_timestamp,
  last_connexion datetime default current_timestamp,
  constraint unique_email unique (email)
);

CREATE TABLE profiles (
  profile_id int auto_increment PRIMARY KEY,
  user_id int unique,
  username varchar(100) not null,
  first_name varchar(100),
  last_name varchar(100),
  address varchar(250),
  city varchar(100),
  phone_number varchar(15),
  constraint unique_username unique (username),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE favorites (
  favorite_id int auto_increment PRIMARY KEY,
  user_id int,
  date_added datetime default current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE roles (
    role_id int auto_increment PRIMARY KEY,
    profile_id int unique,
    role_name enum('Member', 'Moderateur', 'Admin') not null,
    FOREIGN KEY (profile_id) REFERENCES profiles(profile_id) ON DELETE CASCADE ON UPDATE CASCADE
);