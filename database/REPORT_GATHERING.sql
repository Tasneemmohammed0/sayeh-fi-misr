CREATE TABLE REPORT_GATHERING (
  report_id INT NOT NULL,
  gathering_id INT NOT NULL,
  PRIMARY KEY(report_id,gathering_id),
  CONSTRAINT fk_report_gathering_gathering FOREIGN KEY(gathering_id) REFERENCES GATHERING(gathering_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	  CONSTRAINT fk_report_gathering_report FOREIGN KEY(report_id) REFERENCES REPORT(report_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE 
);