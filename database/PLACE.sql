CREATE TABLE PLACE(
  place_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR UNIQUE,
  city VARCHAR,
  photo VARCHAR,
  type VARCHAR(100),
  description VARCHAR(2000),
  foreign_adult_ticket_price INT,
  foreign_student_ticket_price INT,
  egyptian_adult_ticket_price INT,
  egyptian_student_ticket_price INT,
  opening_hours_holidays TIME,
   opening_hours_working_days TIME
);
