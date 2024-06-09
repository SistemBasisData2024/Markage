DROP TABLE IF EXISTS TRANSACTIONS;
DROP TABLE IF EXISTS REWARDS;
DROP TABLE IF EXISTS PRODUCTS;
DROP TABLE IF EXISTS MEMBERSHIPS;

CREATE TYPE categories AS ENUM ('Makanan Minuman', 'Kesehatan Kecantikan', 'Rumah Tangga Kebersihan', 'Pakaian')

CREATE TABLE PRODUCTS (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price INTEGER,
    stock INTEGER,
    category categories,
    unlisted BOOLEAN DEFAULT FALSE
);

CREATE TABLE MEMBERSHIPS (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    point INTEGER,
    telephone VARCHAR UNIQUE
);

CREATE TABLE TRANSACTIONS (
    id SERIAL PRIMARY KEY,
    customer VARCHAR,
    product_id INTEGER NOT NULL UNIQUE,
    quantity INTEGER,
    gross_price INTEGER,
    discount INTEGER,
    net_price INTEGER,
    FOREIGN KEY(product_id) REFERENCES PRODUCTS(id)
);

CREATE TABLE REWARDS (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    point INTEGER DEFAULT 0
);

