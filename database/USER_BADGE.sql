CREATE TABLE USER_BADGE
(
        user_id INT NOT NULL,
        badge_name VARCHAR NOT NULL,
        PRIMARY KEY (badge_name, user_id),
        CONSTRAINT  fk_user_badge_user FOREIGN KEY (user_id) REFERENCES "USER" (user_id) 
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	    CONSTRAINT fk_user_badge_badge FOREIGN KEY (badge_name) REFERENCES BADGE (name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

