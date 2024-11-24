CREATE TYPE severity_levels AS ENUM ('Low', 'Medium', 'High');
CREATE TYPE reason_options AS ENUM ('Offensive', 'Spam', 'Inappropriate', 'Other');
CREATE TABLE public."REPORT"
(
    report_id serial NOT NULL,
    date timestamp with time zone NOT NULL,
    severity severity_levels NOT NULL,
    reason reason_options NOT NULL,
    description character varying NOT NULL,
    user_id serial NOT NULL,
    admin_id serial ,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public."USER" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES public."ADMIN" (user_id) ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY (report_id)
);

ALTER TABLE IF EXISTS public."REPORT"
    OWNER to postgres;