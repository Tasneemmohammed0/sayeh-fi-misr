CREATE TABLE PHOTO
(
    photo_id SERIAL  PRIMARY KEY,
    photo VARCHAR NOT NULL,
    date TIMESTAMP with time zone NOT NULL,
    caption VARCHAR,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
	CONSTRAINT fk_photo_user FOREIGN KEY (user_id) REFERENCES VISITOR (user_id)
	   ON DELETE CASCADE 
	   ON UPDATE CASCADE,
	CONSTRAINT fk_photo_place FOREIGN KEY (place_id) REFERENCES PLACE (place_id) 
	   ON DELETE CASCADE 
	   ON UPDATE CASCADE

);