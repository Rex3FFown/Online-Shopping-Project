import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ProductPage.css";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
console.log(id);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/product/${id}`, {
                    method: "GET",
                    credentials: "include"     
                });
                if (!response.ok) {
                    throw new Error("Ürün bilgisi getirilemedi");
                }
                const data = await response.json();
                setProduct(data);
                setIsLoaded(true);

            } catch (error) {
                console.error("Ürün bilgisi hatası:", error);
                setError(error);
                setIsLoaded(true);
            }
        };
        fetchProduct();
    }, [id]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (!product) {
        return <div>Ürün bulunamadı</div>;
    } else {
        return (
            <div className="product-page">
                <img src={product.imageUrl} alt={product.name} />
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p className='price'>Fiyat: {product.price} ₺</p>
                <button onClick={() => addToBasket(product.id)}>Sepete Ekle</button>
            </div>
        );
    }
};

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

export default ProductPage;
