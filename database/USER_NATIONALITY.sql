CREATE TABLE public."USER_NATIONALITY"
(
    user_id serial NOT NULL,
    nationality character varying NOT NULL,
    PRIMARY KEY (user_id, nationality),
	CONSTRAINT  fk_user_nationality_user FOREIGN KEY (user_id) REFERENCES public."USER" (user_id) ON DELETE CASCADE ON UPDATE CASCADE

);

ALTER TABLE IF EXISTS public."USER_NATIONALITY"
    OWNER to postgres;