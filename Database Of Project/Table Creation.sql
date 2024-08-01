CREATE TABLE ma_categories
(
    id   SERIAL PRIMARY KEY,
    seq  numeric(2) NOT NULL,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE ma_products
(
    id          SERIAL PRIMARY KEY,
    seq         numeric(5)     NOT NULL,
    name        VARCHAR(100)   NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    stock       INT            NOT NULL,
    description TEXT,
    imageUrl    VARCHAR(500),
    category_id INT            NOT NULL,
    FOREIGN KEY (category_id) REFERENCES ma_categories (id)
);

CREATE TABLE ma_customers
(
    id      SERIAL PRIMARY KEY,
    name    varchar(15) NOT NULL,
    surname varchar(15) NOT NULL,
    adress  varchar(100) NOT NULL
);

CREATE TABLE ma_orders
(
    id          SERIAL PRIMARY KEY,
    date        TIME WITHOUT TIME ZONE DEFAULT CURRENT_TIME,
    customer_id int       NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES ma_customers (id)

CREATE TABLE ma_order_items
(
    id         SERIAL PRIMARY KEY,
    price      decimal(10, 2) NOT NULL,
    count      numeric(2) NOT NULL,
    order_id   int NOT NULL,
    FOREIGN KEY (order_id) REFERENCES ma_orders (id),
    product_id int NOT NULL,
    FOREIGN KEY (product_id) REFERENCES ma_products (id)
);
