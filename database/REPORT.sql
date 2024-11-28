CREATE TYPE severity_levels AS ENUM ('Low', 'Medium', 'High');
CREATE TYPE reason_options AS ENUM ('Offensive', 'Spam', 'Inappropriate', 'Other');
CREATE TABLE REPORT
(
    report_id SERIAL  PRIMARY KEY,
    date TIMESTAMP  NOT NULL,
    severity severity_levels NOT NULL,
    reason reason_options NOT NULL,
    description VARCHAR(2000) NOT NULL,
    user_id INT NOT NULL,
   
	CONSTRAINT fk_report_user FOREIGN KEY (user_id) REFERENCES VISITOR (user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
  
);