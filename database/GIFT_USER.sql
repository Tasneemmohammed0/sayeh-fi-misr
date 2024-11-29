CREATE TABLE GIFT_USER(
    user_id INT,
    product_code INT,
    code SERIAL,
    PRIMARY KEY(user_id, product_id),
    CONSTRAINT fk_gift_user_visitor_id FOREIGN KEY(user_id) REFERENCES VISITOR(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_gift_user_product_code FOREIGN KEY(product_code) REFERENCES GIFT(product_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
);