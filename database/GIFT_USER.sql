CREATE TABLE GIFT_USER(
    visitor_id INT,
    product_code INT,
    code SERIAL,
    PRIMARY KEY(visitor_id, product_id),
    CONSTRAINT fk_gift_user_visitor_id FOREIGN KEY(visitor_id) REFERENCES VISITOR(visitor_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_gift_user_product_code FOREIGN KEY(product_code) REFERENCES GIFT(product_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
);