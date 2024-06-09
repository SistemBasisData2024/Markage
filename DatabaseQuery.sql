DROP TABLE IF EXISTS PRODUCT_TRANSACTIONS CASCADE;
DROP TABLE IF EXISTS TRANSACTIONS;
DROP TABLE IF EXISTS PRODUCTS;
DROP TABLE IF EXISTS REWARDS;
DROP TABLE IF EXISTS MEMBERSHIPS;

CREATE TYPE categories AS ENUM ('Makanan Minuman', 'Kesehatan Kecantikan', 'Rumah Tangga Kebersihan', 'Pakaian');

CREATE TABLE PRODUCTS (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price INTEGER,
    stock INTEGER,
    category categories
);

CREATE TABLE MEMBERSHIPS (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    point INTEGER DEFAULT 0,
    telephone VARCHAR UNIQUE
);

CREATE TABLE TRANSACTIONS (
    id SERIAL PRIMARY KEY,
    telephone VARCHAR,
    gross_price INTEGER default 0,
    discount INTEGER default 0,
    net_price INTEGER default 0
);

CREATE TABLE PRODUCT_TRANSACTIONS (
    product_id INTEGER,
    transaction_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(product_id) REFERENCES PRODUCTS(id),
    FOREIGN KEY(transaction_id) REFERENCES TRANSACTIONS(id)
);

CREATE TABLE REWARDS (
    id SERIAL PRIMARY KEY,
    discount INTEGER,
    point INTEGER
);

