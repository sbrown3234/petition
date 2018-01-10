DROP TABLE IF EXISTS petition;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_profiles;

CREATE TABLE petition (
  id serial primary key,
  signature text NOT NULL,
  user_id integer NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id serial primary key,
  first varchar(255) NOT NULL,
  last varchar(255) NOT NULL,
  username varchar(255) NOT NULL UNIQUE,
  hashed_pass varchar(255)
);

CREATE TABLE user_profiles (
  age integer,
  city varchar(255),
  state varchar(255),
  country varchar(255),
  url varchar(255),
  user_id integer NOT NULL
);

SELECT users.id AS user_id, petition.id AS sig_id, petition.signature AS signature, users.first AS first, users.last AS last
FROM users
LEFT JOIN petition
ON users.id = petition.user_id;
