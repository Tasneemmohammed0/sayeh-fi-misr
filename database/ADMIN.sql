CREATE TABLE public."ADMIN"
(
    PRIMARY KEY (user_id)

)
    INHERITS (public."USER");

ALTER TABLE IF EXISTS public."ADMIN"
    OWNER to postgres;