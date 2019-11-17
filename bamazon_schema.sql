DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price_$ DECIMAL(10, 2) default 0,
  stock_quantity INT default 0,
  product_sales DECIMAL(10, 2) default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price_$, stock_quantity)
VALUES ("table", "furniture", 79.99, 10), ("chair", "furniture", 54.99, 88), ("bed", "furniture", 199.99, 20), ("dresser", "furniture", 49.99, 6), ("tv", "electronics", 249.99, 5), ("laptop", "electronics", 999.99, 67), ("camera", "electronics", 74.99, 35), ("microwave", "appliances", 44.99, 100), ("refrigirator", "appliances", 449.99, 10), ("shampoo", "beauty", 14.99, 1000),
("lipstick", "beauty", 4.99, 75), ("hair gel", "beauty", 9.99, 30);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10, 2) default 0,
  product_sales DECIMAL(10, 2) default 0,
  total_profit DECIMAL(10, 2) default 0,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("furniture", 10000), ("electronics", 100000), ("appliances", 50000), ("beauty", 2000), ("home", 500);
