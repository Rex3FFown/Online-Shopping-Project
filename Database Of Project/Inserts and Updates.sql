INSERT INTO ma_categories (seq, name)
VALUES (1, 'Elektronik'),
       (2, 'Giyim'),
       (3, 'Mobilya'),
       (4, 'Oyuncak'),
       (5, 'Ofis ve Kirtasiye'),
       (6, 'Kitap')
;

INSERT INTO ma_products (seq, name, price, stock, description, imageUrl, category_id)
VALUES
-- Elektronik (category_id = 1)
(1, 'Akıllı Telefon', 10999.99, 50, 'Yeni nesil akıllı telefon.',
 'https://images-cdn.ubuy.co.id/633ffef8dce29a68a86fc4a2-dauerhaft-smart-mobile-phone-512mb-4gb.jpg', 1),
(2, 'Laptop', 40999.99, 30, 'Yüksek performanslı laptop.',
 'https://cdn.cimri.io/image/500x500/lenovo-ideapad-slim-3-15iah8-83er000wtr-i5-12450h-8gb-ram-512gb-ssd-freedos-15-6-inc-laptop-notebook_837158591.jpg',
 1),
(3, 'Bluetooth Kulaklık', 1099.99, 100, 'Kablosuz kulaklık.',
 'https://cdn.cimri.io/image/1200x1200/apple-airpods-pro-bluetooth-kulaklik_449227307.jpg', 1),
(4, 'Tablet', 8499.99, 60, 'Yüksek çözünürlüklü tablet.',
 'https://cdn.akakce.com/apple/ipad-pro-wi-fi-gumus-mhr33tu-a-2-tb-11-z.jpg', 1),
(5, 'Akıllı Saat', 1200.99, 70, 'Çok fonksiyonlu akıllı saat.',
 'https://cdn03.ciceksepeti.com/cicek/kc3222420-1/L/smart-siyah-akilli-saat-kc3222420-1-451229b892384cfe800c828cfdc243e3.jpg',
 1),
(6, 'Dijital Kamera', 11559.99, 40, 'Profesyonel dijital kamera.',
 'https://ae01.alicdn.com/kf/Hcf8f2173700645258a05719ad32c6aa8N.jpg_640x640Q90.jpg_.webp', 1),


-- Giyim (category_id = 2)
(1, 'Tişört', 459.99, 200, 'Pamuklu tişört.',
 'https://res.cloudinary.com/teepublic/image/private/s--IpA8QaGc--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_376/c_crop,g_north_west,h_626,w_470,x_-47,y_-49/g_north_west,u_upload:v1462829013:production:blanks:cau9y2yr6rnvk9qkrf1h,x_-442,y_-374/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1508880876/production/designs/1997138_1.jpg',
 2),
(2, 'Kot Pantolon', 649.99, 150, 'Modern kesim kot pantolon.',
 'https://cdn.sarar.com/sarar-premium-paladium-kot-pantolon-12711-denim-pantolon-sarar-premium-31062-12-B.jpg', 2),
(3, 'Mont', 1059.99, 80, 'Su geçirmez mont.', 'https://m.media-amazon.com/images/I/41iob4izulL._AC_SY780_.jpg', 2),
(4, 'Etek', 899.99, 120, 'Şık ve rahat etek.',
 'https://www.armagangiyim.com.tr/Fotograflar/org/128845-parcali-klos-etek-1896-hardal-renk-secmeli-d4.jpg', 2),
(5, 'Gömlek', 929.99, 180, 'Klasik kesim gömlek.',
 'https://laco.akinoncdn.com/products/2019/12/09/8688/dd26127b-4240-46d0-a1e3-91181cda6ab9_size2000x2000_cropCenter.jpg',
 2),
(6, 'Ayakkabı', 1299.99, 140, 'Rahat yürüyüş ayakkabısı.',
 'https://cdn03.ciceksepeti.com/cicek/kcm31779337-1/L/us-polo-agent-erkek-ayakkabi-100604536-kcm31779337-1-3f8288a094454752b7190725ded3f6c1.jpg',
 2),


-- Mobilya (category_id = 3)
(1, 'Koltuk Takımı', 11000.99, 20, 'Rahat oturma grubu.',
 'https://www.inobilya.com/wp-content/uploads/2024/04/maldiv-koltuk-takimi-inobilya-1-2.jpg', 3),
(2, 'Yemek Masası', 8999.99, 15, 'Ahşap yemek masası.',
 'https://www.medusahome.com.tr/bohem-ahsap-yemek-masasi-sabit-yemek-masalari-156272-24-B.jpg', 3),
(3, 'Çalışma Masası', 1200.99, 40, 'Ergonomik çalışma masası.',
 'https://roomartstore.com.tr/cdn/shop/files/BEYAZ1_01752acd-2a54-455f-9983-b2ca6d46857f.jpg?v=1722233284', 3),
(4, 'Ranza', 8350.99, 10, 'Çocuklar için ranzalı yatak.',
 'https://www.palmera.com.tr/wp-content/uploads/2023/03/mars-ranza-3.jpg', 3),
(5, 'Gardırop', 3499.99, 25, 'Geniş ve kullanışlı gardırop.',
 'https://www.dizaynohome.com/elit-4-kapakli-gardrop-10721-11-B.jpg', 3),
(6, 'Raf Ünitesi', 2900.99, 35, 'Dekoratif raf ünitesi.',
 'https://m.media-amazon.com/images/I/61TW3zQENYL._AC_UF1000,1000_QL80_.jpg', 3),


-- Oyuncak (category_id = 4)
(1, 'Lego Seti', 2099.99, 100, 'Yaratıcı lego seti.',
 'https://file.babymall.com.tr/babymall/product/505x505/467d8d58fe_lego-marvel-hulkbuster-wakanda-savasi-oyuncak-yapim-seti-76247.webp',
 4),
(2, 'Peluş Ayı', 499.99, 150, 'Yumuşak peluş ayı.', 'https://m.media-amazon.com/images/I/41V9RNW-MTL._AC_.jpg', 4),
(3, 'Puzzle', 159.99, 120, '1000 parçalı puzzle.',
 'https://m.media-amazon.com/images/I/91Hqefk0spL._AC_UF1000,1000_QL80_.jpg', 4),
(4, 'Yarış Arabası Seti', 999.99, 80, 'Hızlı yarış arabası seti.',
 'https://cdn03.ciceksepeti.com/cicek/kcm53468923-1/L/hot-wheels-5li-oyuncak-araba-seti-spor-ve-yaris-araba-seti-kcm53468923-1-e6b427b5aad847808f80d4c0074e81fa.jpg',
 4),
(5, 'Oyun Hamuru', 390.99, 200, 'Renkli oyun hamuru seti.',
 'https://ideacdn.net/idea/dn/03/myassets/products/738/20786-8696511153100-my-dido-mini-oyun-hamuru-8x40gr.jpg?revision=1699365136',
 4),
(6, 'Oyuncak Bebek', 949.99, 90, 'Gerçekçi bebek oyuncak.',
 'https://cdn.dsmcdn.com/ty1341/product/media/images/prod/QC/20240601/03/6292944a-eb93-3814-bffd-bce7717778f6/1_org_zoom.jpg',
 4),

-- Ofis ve Kırtasiye (category_id = 5)
(1, 'Defter', 89.99, 500, 'A5 boyutunda defter.',
 'https://www.markakalem.com/productimages/142220/big/8693043174832_1.jpg', 5),
(2, 'Kalem Seti', 179.99, 300, 'Renkli kalem seti.',
 'https://ideacdn.net/idea/jc/93/myassets/products/232/photoroom-20240309-210334.jpg', 5),
(3, 'Ajanda', 290.99, 250, 'Günlük ajanda.',
 'https://a2promosyon.com/image/cache/catalog/depo2/resimler/urunler/2024/ajandalar/tarihli/darica/spiralli/PS-29814-Taba-Spiralli-Haftalik-Ajanda-20x28-cm-600x600.jpg',
 5),
(4, 'Zımba Makinesi', 144.99, 100, 'Dayanıklı zımba makinesi.',
 'https://productimages.hepsiburada.net/s/102/375-375/110000044884949.jpg', 5),
(5, 'Post-it', 40.99, 300, 'Renkli yapışkan not kağıtları.',
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTEE7D8ZgstkXfxAEdvKgdKMvBwWLUjincQ&s', 5),
(6, 'Klasör', 24.99, 150, 'Dosya düzenleyici klasör.',
 'https://cdnsta.avansas.com/mnresize/900/-/urun/63358/avansas-eco-plastik-klasor-dar-a4-mavi-zoom-1.jpg', 5),

-- Kitap (category_id = 6)
(1, 'Roman', 240.99, 200, 'Bestseller roman.', 'https://cdn.timas.com.tr/urun/hayaldi-roman-oldu-9786051442495.jpg', 6),
(2, 'Bilim Kurgu Kitabı', 345.99, 180, 'Popüler bilim kurgu kitabı.',
 'https://img.kitapyurdu.com/v1/getImage/fn:11788428/wi:400/wh:true', 6),
(3, 'Felsefe Kitabı', 298.99, 220, 'Varlık felsefesi üzerine kitap.',
 'https://img.kitapyurdu.com/v1/getImage/fn:4790134/wh:true/miw:200/mih:200', 6),
(4, 'Çocuk Kitabı', 99.99, 120, 'Eğitici çocuk kitabı.',
 'https://eduzsofsfpv.exactdn.com/wp-content/uploads/2024/02/ajan-kopek-cocuk-kitabi.webp?strip=all&lossy=1&quality=92&webp=92&avif=80&resize=391%2C550&ssl=1',
 6),
(5, 'Tarih Kitabı', 309.99, 100, 'Dünya tarihi üzerine kitap.',
 'https://www.dogankitap.com.tr/t/?src=%2Ffiles%2Fkitaplar%2Fimg%2F9786050965599.jpg&w=400&zc=1', 6),
(6, 'Sanat Kitabı', 429.99, 80, 'Sanat eserleri hakkında kitap.',
 'https://m.media-amazon.com/images/I/61pztVcMpgL._AC_UF1000,1000_QL80_.jpg', 6);

INSERT INTO ma_customers(name, surname, adress)
VALUES ('Murat', 'Akay', 'Malatya'),
       ('Edanur', 'Culum', 'Malatya'),
       ('Mahmut', 'Altunkaya', 'Malatya'),
       ('Münevver', 'Özhan', 'Malatya'),
       ('Harun', 'Özaslan', 'Malatya'),
       ('Ayşe', 'Yılmaz', 'Istanbul'),
       ('Mehmet', 'Demir', 'Ankara'),
       ('Fatma', 'Şahin', 'Izmir'),
       ('Ahmet', 'Kaya', 'Bursa'),
       ('Elif', 'Çetin', 'Adana'),
       ('Ali', 'Korkmaz', 'Antalya'),
       ('Zeynep', 'Polat', 'Gaziantep'),
       ('Hüseyin', 'Karaca', 'Konya'),
       ('Emine', 'Yıldız', 'Diyarbakır'),
       ('Hasan', 'Erdoğan', 'Samsun'),
       ('Esra', 'Aydın', 'Kayseri');

INSERT INTO ma_orders (customer_id)
VALUES (1),
       (2),
       (3),
       (4),
       (5);

INSERT INTO ma_order_items (price, count, order_id, product_id)
VALUES (10999.99, 1, 1, 1),
       (459.99, 2, 1, 7),
       (40999.99, 1, 2, 2),
       (649.99, 1, 2, 8),
       (1099.99, 3, 3, 3),
       (2099.99, 1, 3, 19),
       (8499.99, 1, 4, 4),
       (899.99, 1, 4, 10),
       (1200.99, 2, 5, 5),
       (240.99, 1, 5, 31);

UPDATE ma_customers
SET e_mail = 'murat.akay@example.com'
WHERE name = 'Murat'
  AND surname = 'Akay';

UPDATE ma_customers
SET e_mail = 'edanur.culum@example.com'
WHERE name = 'Edanur'
  AND surname = 'Culum';

UPDATE ma_customers
SET e_mail = 'mahmut.altunkaya@example.com'
WHERE name = 'Mahmut'
  AND surname = 'Altunkaya';

UPDATE ma_customers
SET e_mail = 'munevver.ozhan@example.com'
WHERE name = 'Münevver'
  AND surname = 'Özhan';

UPDATE ma_customers
SET e_mail = 'harun.ozaslan@example.com'
WHERE name = 'Harun'
  AND surname = 'Özaslan';

UPDATE ma_customers
SET e_mail = 'ayse.yilmaz@example.com'
WHERE name = 'Ayşe'
  AND surname = 'Yılmaz';

UPDATE ma_customers
SET e_mail = 'mehmet.demir@example.com'
WHERE name = 'Mehmet'
  AND surname = 'Demir';

UPDATE ma_customers
SET e_mail = 'fatma.sahin@example.com'
WHERE name = 'Fatma'
  AND surname = 'Şahin';

UPDATE ma_customers
SET e_mail = 'ahmet.kaya@example.com'
WHERE name = 'Ahmet'
  AND surname = 'Kaya';

UPDATE ma_customers
SET e_mail = 'elif.cetin@example.com'
WHERE name = 'Elif'
  AND surname = 'Çetin';

UPDATE ma_customers
SET e_mail = 'ali.korkmaz@example.com'
WHERE name = 'Ali'
  AND surname = 'Korkmaz';

UPDATE ma_customers
SET e_mail = 'zeynep.polat@example.com'
WHERE name = 'Zeynep'
  AND surname = 'Polat';

UPDATE ma_customers
SET e_mail = 'huseyin.karaca@example.com'
WHERE name = 'Hüseyin'
  AND surname = 'Karaca';

UPDATE ma_customers
SET e_mail = 'emine.yildiz@example.com'
WHERE name = 'Emine'
  AND surname = 'Yıldız';

UPDATE ma_customers
SET e_mail = 'hasan.erdogan@example.com'
WHERE name = 'Hasan'
  AND surname = 'Erdoğan';

UPDATE ma_customers
SET e_mail = 'esra.aydin@example.com'
WHERE name = 'Esra'
  AND surname = 'Aydın';
