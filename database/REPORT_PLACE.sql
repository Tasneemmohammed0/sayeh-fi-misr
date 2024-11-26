CREATE TABLE REPORT_PLACE (
  report_id INT NOT NULL,
  place_id INT NOT NULL,
  PRIMARY KEY(report_id,place_id),
  CONSTRAINT fk_report_place_place FOREIGN KEY(place_id) REFERENCES PLACE(place_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE ,
	  CONSTRAINT fk_report_place_report FOREIGN KEY(report_id) REFERENCES REPORT(report_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE 
);
