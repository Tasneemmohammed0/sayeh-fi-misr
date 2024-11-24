CREATE TABLE PLACE(
  place_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR UNIQUE,
  photo VARCHAR,
  card_photo VARCHAR,
  type VARCHAR(100),
  breif VARCHAR,
  ticket_price INT,
  opening_hours TIME
)

