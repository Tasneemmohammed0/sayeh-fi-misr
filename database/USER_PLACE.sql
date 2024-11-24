CREATE TABLE public."USER_PLACE"
(
    user_id serial NOT NULL,
    place_id serial NOT NULL,
    date timestamp with time zone,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public."USER" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_place FOREIGN KEY (place_id) REFERENCES public."PLACE" (place_id) ON DELETE CASCADE ON UPDATE CASCADE,

    PRIMARY KEY (user_id, place_id)
);

ALTER TABLE IF EXISTS public."USER_PLACE"
    OWNER to postgres;