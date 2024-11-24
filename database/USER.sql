CREATE TABLE public."USER"
(
    user_id serial NOT NULL ,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    username character varying(50) NOT NULL  UNIQUE,
    email character varying NOT NULL  UNIQUE,
    password character varying(50) NOT NULL,
    country character varying NOT NULL,
    city character varying NOT NULL,
    profile_pic character varying,
    gender character varying(10),
    PRIMARY KEY (user_id),
    CONSTRAINT check_password_length CHECK (LENGTH(password) > 8)
);

ALTER TABLE IF EXISTS public."USER"
    OWNER to postgres;