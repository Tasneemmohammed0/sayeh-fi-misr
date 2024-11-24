CREATE TABLE public."REVIEW"
(
    review_id serial NOT NULL ,
    rating int,
    date time with time zone NOT NULL,
    title character varying,
	main_content character varying,
    user_id serial NOT NULL,
    place_id serial NOT NULL,
    PRIMARY KEY (review_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public."USER" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_place FOREIGN KEY (place_id) REFERENCES public."PLACE" (place_id) ON DELETE CASCADE ON UPDATE CASCADE

);

ALTER TABLE IF EXISTS public."PHOTO"
    OWNER to postgres;