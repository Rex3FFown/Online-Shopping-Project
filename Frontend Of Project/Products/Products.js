import React, { useState, useEffect } from "react";
import "./Product2.css"; // CSS dosyasını içe aktar

function Products() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const res = await fetch("http://localhost:8080/products", { method: "GET", credentials: 'include' });
            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await res.json();
            console.log("Fetched Products:", result); // Veriyi kontrol et
            
            // Listeyi rastgele sırala
            const shuffledProducts = result.sort(() => Math.random() - 0.5);

            setIsLoaded(true);
            setProductList(shuffledProducts);
        } catch (error) {
            console.error("Fetch error:", error); // Hata mesajını kontrol et
            setIsLoaded(true);
            setError(error);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="product-grid">
                {productList.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="price" >{product.price} ₺</p>
                        <p><button>Sepete Ekle</button></p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Products;
