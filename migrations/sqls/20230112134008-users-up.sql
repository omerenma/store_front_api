DROP TABLE IF EXISTS users;
CREATE TABLE users 
(
    id SERIAL PRIMARY KEY,
     firstname VARCHAR(50) NOT NULL,
      lastname VARCHAR (50)NOT NULL,
       password VARCHAR NOT NULL
       );

