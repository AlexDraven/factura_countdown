CREATE DATABASE testing;

USE testing

CREATE TABLE IF NOT EXITS clients(
     id INT AUTO_INCREMENT,
     name VARCHAR(70), 
     lastname VARCHAR(70),
     username VARCHAR (70),
     email VARCHAR (70),
     password VARCHAR (70),
     age INT(2),
     birthday DATE,
     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (id)
);
