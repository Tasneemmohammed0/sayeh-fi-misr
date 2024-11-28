CREATE TABLE VISITOR_NATIONALITY
(
    user_id INT NOT NULL,
    nationality VARCHAR NOT NULL,
    PRIMARY KEY (user_id, nationality),
	CONSTRAINT  fk_user_nationality_user FOREIGN KEY (user_id) REFERENCES "USER" (user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE

);

