import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryProducts.css';

function CategoryProducts() {

    const { id } = useParams(); // URL'den kategorinin ID'sini alıyoruz
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('none'); // State for sorting order

    console.log(id);
    const addToBasket = async (productId) => {

        const basketId = localStorage.getItem('basketId');

        try {
            const response = await fetch(`http://localhost:8080/api/basketitems/addItem/${productId}/${basketId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });

            if (!response.ok) {
                throw new Error("Ürün sepete eklenirken hata oluştu");
            }

            const data = await response.json();
            console.log("Sepete eklenen ürün:", data);
        } catch (error) {
            console.error("Sepete ekleme hatası:", error);
        }
    };
    useEffect(() => {
        if (id) {
            fetchProductsByCategory(id);
        }
    }, [id, sortOrder]);

    const fetchProductsByCategory = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${categoryId}`);
            if (!response.ok) throw new Error('Olmadı');
            const data = await response.json();
            setProducts(sortProducts(data, sortOrder));
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const sortProducts = (products, order) => {
        if (order === 'none') {
            return products;
        }
        return [...products].sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div className="sort-controls">
                <label htmlFor="sortOrder">Fiyata göre sırala </label>
                <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value="none">-Filtreleme-</option>
                    <option value="asc">Artan</option>
                    <option value="desc">Azalan</option>
                </select>
            </div>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">{product.price} ₺</p>
                            <p><button onClick={()=>addToBasket(product.id)}>Sepete Ekle</button></p>
                        </div>
                    ))
                ) : (
                    <div>Bu kategoriye ait ürün bulunamadı.</div>
                )}
            </div>
        </div>
    );
}

export default CategoryProducts;
