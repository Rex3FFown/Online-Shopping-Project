import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryProducts.css';

function CategoryProducts() {
    console.log('mahmut');
    const { id } = useParams(); // URL'den kategorinin ID'sini alıyoruz
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('none'); // State for sorting order

    console.log(id);

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
            return products; // No sorting applied
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
                    <option value="none"></option>
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
                            <p><button>Sepete Ekle</button></p>
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
