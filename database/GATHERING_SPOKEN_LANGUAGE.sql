CREATE TABLE GATHERING_SPOKEN_LANGUAGE (
  gathering_id INT NOT NULL,
  spoken_language VARCHAR(255) NOT NULL,
  PRIMARY KEY(gathering_id, spoken_language),
  CONSTRAINT fk_gathering_spoken_language_gathering FOREIGN KEY(gathering_id) REFERENCES GATHERING(gathering_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE     
)