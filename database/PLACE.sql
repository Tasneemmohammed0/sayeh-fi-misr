CREATE TABLE PLACE(
  place_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR UNIQUE,
  photo VARCHAR,
  card_photo VARCHAR,
  type VARCHAR(100),
  breif VARCHAR,
  foreignt_adult_ticket_price INT,
  foreignt_student_ticket_price INT,
  egyptian_adult_ticket_price INT,
  egyptian_student_ticket_price INT,
  opening_hours TIME
)

