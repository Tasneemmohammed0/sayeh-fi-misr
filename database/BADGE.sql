CREATE TABLE BADGE (
  name VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
  icon VARCHAR NOT NULL UNIQUE,
  description VARCHAR(2000),
  type VARCHAR(50) CHECK (type IN ('reviews', 'gatherings', 'visits'))
)
