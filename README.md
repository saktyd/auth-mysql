# Authentication with MySQL

CREATE TABLE users (
id INTEGER PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50),
email VARCHAR(50),
salt VARCHAR(50),
password LONGTEXT
);
