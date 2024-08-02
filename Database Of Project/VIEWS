CREATE or replace VIEW ma_genel_bilgi AS
SELECT ma_order_items.price || ' ' || 'TL'                                                                AS fiyat,
       ma_order_items.count || ' ' || 'Adet'                                                              AS adet,
       ma_customers.name || ' ' || ma_customers.surname                                                   AS ad_soyad,
       ma_customers.e_mail,
       ma_products.name                                                                                   AS ürün,
       SUM(ma_order_items.price * ma_order_items.count) OVER (partition by ma_order_items) || ' ' ||
       'TL'                                                                                               AS toplam_fiyat
--SUM(ma_order_items.price * ma_order_items.count) OVER (PARTITION BY ma_orders.id) AS toplam_fiyat
FROM ma_order_items
         INNER JOIN ma_orders ON ma_order_items.order_id = ma_orders.id
         INNER JOIN ma_customers ON ma_orders.customer_id = ma_customers.id
         INNER JOIN ma_products on ma_order_items.product_id = ma_products.id;

CREATE VIEW ma_musteri_urun_miktari AS
SELECT ma_customers.id,
       ma_customers.name || ' ' || ma_customers.surname AS ad_soyad,
       SUM(ma_order_items.count)                        AS yapilan_alisveris
FROM ma_customers
         INNER JOIN ma_order_items on ma_customers.id = ma_order_items.order_id
GROUP BY ma_customers.id, ma_customers.name;


CREATE VIEW ma_detayli_urun AS
SELECT ma_products.name   AS product_name,
       ma_products.price,
       ma_products.stock,
       ma_categories.name AS categories_name
FROM ma_products
         JOIN ma_categories ON ma_products.category_id = ma_categories.id;
