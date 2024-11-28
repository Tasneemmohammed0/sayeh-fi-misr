CREATE TABLE HOST
(
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    ssn VARCHAR(20) NOT NULL UNIQUE,
    background VARCHAR NOT NULL,
    start_date DATE NOT NULL,
    PRIMARY KEY (user_id)
  
)
    INHERITS (VISITOR);