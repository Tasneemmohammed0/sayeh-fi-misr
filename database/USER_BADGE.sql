CREATE TABLE public."USER_BADGE"
(
        user_id serial NOT NULL,
        badge_name character varying NOT NULL,
        PRIMARY KEY (badge_name, user_id),
        CONSTRAINT  fk_user_badge_user FOREIGN KEY (user_id) REFERENCES public."USER" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	    CONSTRAINT fk_user_badge_badge FOREIGN KEY (badge_name) REFERENCES public."BADGE" (name) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE IF EXISTS public."USER_BADGE"
    OWNER to postgres;