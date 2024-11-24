CREATE TABLE public."PHOTO"
(
    photo_id serial NOT NULL UNIQUE,
    photo character varying NOT NULL,
    date time with time zone NOT NULL,
    caption character varying,
    user_id serial NOT NULL,
    place_id serial NOT NULL,
    PRIMARY KEY (photo_id)
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public."USER" (user_id) ON DELETE CASCADE ON UPDATE CASCADE
	CONSTRAINT fk_place FOREIGN KEY (place_id) REFERENCES public."PLACE" (place_id) ON DELETE CASCADE ON UPDATE CASCADE

);

ALTER TABLE IF EXISTS public."PHOTO"
    OWNER to postgres;