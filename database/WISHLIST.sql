CREATE TABLE WISHLIST (
  wishlist_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES "USER" (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
