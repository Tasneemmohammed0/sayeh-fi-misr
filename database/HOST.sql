CREATE TABLE public."HOST"
(
    phone_number character varying(15) NOT NULL UNIQUE,
    ssn character varying(20) NOT NULL UNIQUE,
    background character varying NOT NULL,
    start_date date NOT NULL,
    PRIMARY KEY (user_id)
  
)
    INHERITS (public."USER");

ALTER TABLE IF EXISTS public."HOST"
    OWNER to postgres;