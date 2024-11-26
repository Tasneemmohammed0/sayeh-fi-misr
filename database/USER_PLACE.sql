
CREATE TABLE USER_PLACE
(
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    date TIMESTAMP with time zone,
    CONSTRAINT fk_user_place_user FOREIGN KEY (user_id) REFERENCES "USER" (user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	CONSTRAINT fk_user_place_place FOREIGN KEY (place_id) REFERENCES PLACE (place_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,

    PRIMARY KEY (user_id, place_id)
);