CREATE TABLE GATHERING (
  gathering_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  duration BIGINT,
  gathering_date TIMESTAMP NOT NULL,
  is_open BOOLEAN NOT NULL,
  description VARCHAR(2000),
  max_capacity INT,
  place_id INT,
  host_id INT,
  CONSTRAINT fk_gathering_place FOREIGN KEY (place_id) REFERENCES  PLACE(place_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT fk_gathering_host FOREIGN KEY (host_id) REFERENCES HOST(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
