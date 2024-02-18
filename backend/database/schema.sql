DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS user_roles;

CREATE TABLE users (
  id int auto_increment PRIMARY KEY,
  email varchar(100) not null,
  hashed_password text not null,
  created_date datetime default current_timestamp,
  last_connexion datetime default current_timestamp,
  constraint unique_email unique (email)
);

CREATE TABLE profiles (
  id int auto_increment PRIMARY KEY,
  user_id int unique,
  username varchar(100) not null,
  first_name varchar(100),
  last_name varchar(100),
  address varchar(250),
  city varchar(100),
  phone_number varchar(15),
  constraint unique_username unique (username),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE roles (
    id int auto_increment PRIMARY KEY,
    role_name enum('Member', 'Admin') not null
);

CREATE TABLE user_roles (
    user_id int,
    role_id int,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);