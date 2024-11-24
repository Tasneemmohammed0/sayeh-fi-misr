CREATE TABLE PLACE_WISHLIST (
  place_id INT NOT NULL,
  wishlist_id INT NOT NULL,
  PRIMARY KEY (place_id, wishlist_id),
  CONSTRAINT fk_place_wishlist_place FOREIGN KEY(place_id) REFERENCES PLACE(place_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_place_wishlist_wishlist FOREIGN KEY(wishlist_id) REFERENCES WISHLIST(wishlist_id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
)