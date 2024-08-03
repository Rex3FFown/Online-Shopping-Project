SELECT ma_order_items.price                                                              AS fiyat,
       ma_order_items.count || ' ' || 'Adet'                                             AS adet,
       ma_customers.name || ' ' || ma_customers.surname                                  AS ad_soyad,
       ma_customers.e_mail,
       ma_products.name                                                                  AS ürün,
       SUM(ma_order_items.price * ma_order_items.count) OVER (PARTITION BY ma_orders.id) AS toplam_fiyat
FROM ma_order_items
         INNER JOIN ma_orders ON ma_order_items.order_id = ma_orders.id
         INNER JOIN ma_customers ON ma_orders.customer_id = ma_customers.id
         INNER JOIN ma_products on ma_order_items.product_id = ma_products.id
--WHERE ma_customers.id=5
ORDER BY RANDOM();


SELECT ma_order_items.price || ' ' || 'TL'              AS fiyat,
       ma_order_items.count || ' ' || 'Adet'            AS adet,
       ma_customers.name || ' ' || ma_customers.surname AS ad_soyad,
       ma_customers.e_mail,
       ma_products.name                                 AS ürün,
       SUM(ma_order_items.price * ma_order_items.count) OVER (partition by ma_order_items) || ' ' ||
       'TL'                                             AS toplam_fiyat
--SUM(ma_order_items.price * ma_order_items.count) OVER (PARTITION BY ma_orders.id) AS toplam_fiyat
FROM ma_order_items
         INNER JOIN ma_orders ON ma_order_items.order_id = ma_orders.id
         INNER JOIN ma_customers ON ma_orders.customer_id = ma_customers.id
         INNER JOIN ma_products on ma_order_items.product_id = ma_products.id;

SELECT *
FROM ma_genel_bilgi;


SELECT ma_customers.id, ma_customers.name || ' '||ma_customers.surname AS ad_soyad, SUM(ma_order_items.count) AS yapilan_alisveris
FROM ma_customers
         INNER JOIN ma_order_items on ma_customers.id = ma_order_items.order_id
GROUP BY ma_customers.id, ma_customers.name;

SELECT *
FROM ma_order_items


WITH unique_customers AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY ma_customers.name, ma_customers.surname ORDER BY ma_orders.id) AS rn
    FROM ma_order_items
             INNER JOIN ma_orders ON ma_order_items.order_id = ma_orders.id
             INNER JOIN ma_customers ON ma_orders.customer_id = ma_customers.id
             INNER JOIN ma_products ON ma_order_items.product_id = ma_products.id
)
SELECT price || ' ' || 'TL' AS fiyat,
       count || ' ' || 'Adet' AS adet,
       name || ' ' || surname AS ad_soyad,
       e_mail,
       product_name AS ürün,
       toplam_fiyat || ' ' || 'TL' AS toplam_fiyat
FROM (
         SELECT ma_order_items.price,
                ma_order_items.count,
                ma_customers.name,
                ma_customers.surname,
                ma_customers.e_mail,
                ma_products.name AS product_name,
                SUM(ma_order_items.price * ma_order_items.count) OVER (PARTITION BY ma_orders.id) AS toplam_fiyat,
                ROW_NUMBER() OVER (PARTITION BY ma_customers.name, ma_customers.surname ORDER BY ma_orders.id) AS rn
         FROM ma_order_items
                  INNER JOIN ma_orders ON ma_order_items.order_id = ma_orders.id
                  INNER JOIN ma_customers ON ma_orders.customer_id = ma_customers.id
                  INNER JOIN ma_products ON ma_order_items.product_id = ma_products.id
     ) AS subquery
WHERE rn = 1;


-- Products in Category
SELECT p.* 
FROM ma_products p
JOIN ma_categories c ON p.category_id = c.id
WHERE c.name = 'Kategori Adı';

-- Low Stock Products
SELECT name, stock 
FROM ma_products
WHERE stock < 10;

-- Most Expensive Products
SELECT name, price 
FROM ma_products
ORDER BY price DESC
LIMIT 10;

-- Customer Orders
SELECT o.* 
FROM ma_orders o
JOIN ma_customers c ON o.customer_id = c.id
WHERE c.name = 'Müşteri Adı' AND c.surname = 'Müşteri Soyadı';

-- Order Details
SELECT oi.*, p.name AS product_name
FROM ma_order_items oi
JOIN ma_products p ON oi.product_id = p.id
WHERE oi.order_id = 2;

-- Daily Orders
SELECT CAST(date AS DATE) AS order_date, COUNT(*) AS order_count
FROM ma_orders
GROUP BY CAST(date AS DATE)
ORDER BY order_date DESC;

-- Daily Sales
SELECT CAST(o.date AS DATE) AS order_date, SUM(oi.price * oi.count) AS total_sales
FROM ma_orders o
JOIN ma_order_items oi ON o.id = oi.order_id
WHERE CAST(o.date AS DATE) = '2024-08-01'
GROUP BY CAST(o.date AS DATE);

-- Best Sellers
SELECT p.name, SUM(oi.count) AS total_sold
FROM ma_order_items oi
JOIN ma_products p ON oi.product_id = p.id
GROUP BY p.name
ORDER BY total_sold DESC
LIMIT 10;

-- Average Order Amount
SELECT c.name, c.surname, AVG(oi.price * oi.count) AS avg_order_value
FROM ma_customers c
JOIN ma_orders o ON c.id = o.customer_id
JOIN ma_order_items oi ON o.id = oi.order_id
GROUP BY c.name, c.surname
ORDER BY avg_order_value DESC;
