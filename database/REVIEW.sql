CREATE TABLE REVIEW
(
    review_id SERIAL NOT NULL PRIMARY KEY ,
    rating INT,
    date TIMESTAMP with time zone NOT NULL,
    title VARCHAR,
	main_content VARCHAR,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
     
	CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES "USER" (user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	CONSTRAINT fk_review_place FOREIGN KEY (place_id) REFERENCES PLACE (place_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);
