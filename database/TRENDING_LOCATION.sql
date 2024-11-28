CREATE TABLE TRENDING_LOCATION(
   trending_id SERIAL PRIMARY KEY,
   trending_date TIMESTAMP,
   place_id INT,
   CONSTRAINT fk_trending_location_place FOREIGN KEY  (place_id) REFERENCES PLACE (place_id)
    ON DELETE CASCADE
   ON UPDATE CASCADE 
);