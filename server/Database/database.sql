-- CREATE TABLE users(
--     id SERIAL UNIQUE PRIMARY KEY,
--     fullName VARCHAR(100),
--     email VARCHAR(255),
--     password VARCHAR(30),
--     isLoggedIn BOOLEAN,
--     agreed BOOLEAN,
--     token VARCHAR
-- );

-- ALTER TABLE users
-- ADD CONSTRAINT unique_email UNIQUE (email);

--  INSERT INTO users (
--         fullname,
--         email,
--         password,
--         isloggedin,
--         agreed,
--         token
--       )
--     VALUES (
--         'SHOOBERT DOOBERT',
--         'SHOOBY@monday.com',
--         'qweqwe',
--         TRUE,
--         TRUE,
--         'token:character varying'
--       );
--     SELECT *
--     FROM users;

-- DROP TABLE USERS;
-- DROP Table books;
-- DROP TABLE user_book;

SELECT * FROM users;
  

