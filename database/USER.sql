CREATE TABLE "USER"
(
    user_id SERIAL NOT NULL PRIMARY KEY ,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    username VARCHAR(50) NOT NULL  UNIQUE,
    email VARCHAR NOT NULL  UNIQUE,
    password VARCHAR(50) NOT NULL,
    country VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    profile_pic VARCHAR,
    gender VARCHAR(10),
  
    CONSTRAINT check_password_length CHECK (LENGTH(password) > 8)
);