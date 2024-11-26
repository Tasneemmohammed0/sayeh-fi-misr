CREATE TYPE severity_levels AS ENUM ('Low', 'Medium', 'High');
CREATE TYPE reason_options AS ENUM ('Offensive', 'Spam', 'Inappropriate', 'Other');
CREATE TABLE REPORT
(
    report_id SERIAL NOT NULL PRIMARY KEY,
    date TIMESTAMP  NOT NULL,
    severity severity_levels NOT NULL,
    reason reason_options NOT NULL,
    description VARCHAR NOT NULL,
    user_id INT NOT NULL,
    admin_id INT ,
	CONSTRAINT fk_report_user FOREIGN KEY (user_id) REFERENCES "USER" (user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    CONSTRAINT fk_report_admin FOREIGN KEY (admin_id) REFERENCES "ADMIN" (user_id)
	ON DELETE SET NULL
	ON UPDATE CASCADE   
);