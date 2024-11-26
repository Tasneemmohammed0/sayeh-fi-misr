CREATE TABLE USER_GATHERING(
  user_id INT NOT NULL,
  gathering_id INT NOT NULL,
  PRIMARY KEY (user_id, gathering_id),
  CONSTRAINT fk_user_gathering_user FOREIGN KEY(user_id) REFERENCES "USER"(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_user_gathering_gathering FOREIGN KEY(gathering_id) REFERENCES GATHERING(gathering_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE  
)