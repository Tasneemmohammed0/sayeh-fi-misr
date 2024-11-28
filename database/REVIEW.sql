CREATE TABLE REVIEW
(
    review_id SERIAL PRIMARY KEY,
    rating INT,
    date TIMESTAMP with time zone NOT NULL,
    title VARCHAR,
    main_content VARCHAR(400),
    user_id INT NOT NULL,
    place_id INT NOT NULL,
     
	CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES VISITOR (user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	CONSTRAINT fk_review_place FOREIGN KEY (place_id) REFERENCES PLACE (place_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);
