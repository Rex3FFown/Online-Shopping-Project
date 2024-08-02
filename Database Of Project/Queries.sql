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

